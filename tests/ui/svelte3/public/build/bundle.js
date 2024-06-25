
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    // Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
    // at the end of hydration without touching the remaining nodes.
    let is_hydrating = false;
    function start_hydrating() {
        is_hydrating = true;
    }
    function end_hydrating() {
        is_hydrating = false;
    }
    function upper_bound(low, high, key, value) {
        // Return first index of value larger than input value in the range [low, high)
        while (low < high) {
            const mid = low + ((high - low) >> 1);
            if (key(mid) <= value) {
                low = mid + 1;
            }
            else {
                high = mid;
            }
        }
        return low;
    }
    function init_hydrate(target) {
        if (target.hydrate_init)
            return;
        target.hydrate_init = true;
        // We know that all children have claim_order values since the unclaimed have been detached if target is not <head>
        let children = target.childNodes;
        // If target is <head>, there may be children without claim_order
        if (target.nodeName === 'HEAD') {
            const myChildren = [];
            for (let i = 0; i < children.length; i++) {
                const node = children[i];
                if (node.claim_order !== undefined) {
                    myChildren.push(node);
                }
            }
            children = myChildren;
        }
        /*
        * Reorder claimed children optimally.
        * We can reorder claimed children optimally by finding the longest subsequence of
        * nodes that are already claimed in order and only moving the rest. The longest
        * subsequence of nodes that are claimed in order can be found by
        * computing the longest increasing subsequence of .claim_order values.
        *
        * This algorithm is optimal in generating the least amount of reorder operations
        * possible.
        *
        * Proof:
        * We know that, given a set of reordering operations, the nodes that do not move
        * always form an increasing subsequence, since they do not move among each other
        * meaning that they must be already ordered among each other. Thus, the maximal
        * set of nodes that do not move form a longest increasing subsequence.
        */
        // Compute longest increasing subsequence
        // m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
        const m = new Int32Array(children.length + 1);
        // Predecessor indices + 1
        const p = new Int32Array(children.length);
        m[0] = -1;
        let longest = 0;
        for (let i = 0; i < children.length; i++) {
            const current = children[i].claim_order;
            // Find the largest subsequence length such that it ends in a value less than our current value
            // upper_bound returns first greater value, so we subtract one
            // with fast path for when we are on the current longest subsequence
            const seqLen = ((longest > 0 && children[m[longest]].claim_order <= current) ? longest + 1 : upper_bound(1, longest, idx => children[m[idx]].claim_order, current)) - 1;
            p[i] = m[seqLen] + 1;
            const newLen = seqLen + 1;
            // We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
            m[newLen] = i;
            longest = Math.max(newLen, longest);
        }
        // The longest increasing subsequence of nodes (initially reversed)
        const lis = [];
        // The rest of the nodes, nodes that will be moved
        const toMove = [];
        let last = children.length - 1;
        for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
            lis.push(children[cur - 1]);
            for (; last >= cur; last--) {
                toMove.push(children[last]);
            }
            last--;
        }
        for (; last >= 0; last--) {
            toMove.push(children[last]);
        }
        lis.reverse();
        // We sort the nodes being moved to guarantee that their insertion order matches the claim order
        toMove.sort((a, b) => a.claim_order - b.claim_order);
        // Finally, we move the nodes
        for (let i = 0, j = 0; i < toMove.length; i++) {
            while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
                j++;
            }
            const anchor = j < lis.length ? lis[j] : null;
            target.insertBefore(toMove[i], anchor);
        }
    }
    function append_hydration(target, node) {
        if (is_hydrating) {
            init_hydrate(target);
            if ((target.actual_end_child === undefined) || ((target.actual_end_child !== null) && (target.actual_end_child.parentNode !== target))) {
                target.actual_end_child = target.firstChild;
            }
            // Skip nodes of undefined ordering
            while ((target.actual_end_child !== null) && (target.actual_end_child.claim_order === undefined)) {
                target.actual_end_child = target.actual_end_child.nextSibling;
            }
            if (node !== target.actual_end_child) {
                // We only insert if the ordering of this node should be modified or the parent node is not target
                if (node.claim_order !== undefined || node.parentNode !== target) {
                    target.insertBefore(node, target.actual_end_child);
                }
            }
            else {
                target.actual_end_child = node.nextSibling;
            }
        }
        else if (node.parentNode !== target || node.nextSibling !== null) {
            target.appendChild(node);
        }
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function insert_hydration(target, node, anchor) {
        if (is_hydrating && !anchor) {
            append_hydration(target, node);
        }
        else if (node.parentNode !== target || node.nextSibling != anchor) {
            target.insertBefore(node, anchor || null);
        }
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    /**
     * List of attributes that should always be set through the attr method,
     * because updating them through the property setter doesn't work reliably.
     * In the example of `width`/`height`, the problem is that the setter only
     * accepts numeric values, but the attribute can also be set to a string like `50%`.
     * If this list becomes too big, rethink this approach.
     */
    const always_set_through_set_attribute = ['width', 'height'];
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_custom_element_data_map(node, data_map) {
        Object.keys(data_map).forEach((key) => {
            set_custom_element_data(node, key, data_map[key]);
        });
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function set_dynamic_element_data(tag) {
        return (/-/.test(tag)) ? set_custom_element_data_map : set_attributes;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function init_claim_info(nodes) {
        if (nodes.claim_info === undefined) {
            nodes.claim_info = { last_index: 0, total_claimed: 0 };
        }
    }
    function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
        // Try to find nodes in an order such that we lengthen the longest increasing subsequence
        init_claim_info(nodes);
        const resultNode = (() => {
            // We first try to find an element after the previous one
            for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
                const node = nodes[i];
                if (predicate(node)) {
                    const replacement = processNode(node);
                    if (replacement === undefined) {
                        nodes.splice(i, 1);
                    }
                    else {
                        nodes[i] = replacement;
                    }
                    if (!dontUpdateLastIndex) {
                        nodes.claim_info.last_index = i;
                    }
                    return node;
                }
            }
            // Otherwise, we try to find one before
            // We iterate in reverse so that we don't go too far back
            for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
                const node = nodes[i];
                if (predicate(node)) {
                    const replacement = processNode(node);
                    if (replacement === undefined) {
                        nodes.splice(i, 1);
                    }
                    else {
                        nodes[i] = replacement;
                    }
                    if (!dontUpdateLastIndex) {
                        nodes.claim_info.last_index = i;
                    }
                    else if (replacement === undefined) {
                        // Since we spliced before the last_index, we decrease it
                        nodes.claim_info.last_index--;
                    }
                    return node;
                }
            }
            // If we can't find any matching node, we create a new one
            return createNode();
        })();
        resultNode.claim_order = nodes.claim_info.total_claimed;
        nodes.claim_info.total_claimed += 1;
        return resultNode;
    }
    function claim_element_base(nodes, name, attributes, create_element) {
        return claim_node(nodes, (node) => node.nodeName === name, (node) => {
            const remove = [];
            for (let j = 0; j < node.attributes.length; j++) {
                const attribute = node.attributes[j];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            remove.forEach(v => node.removeAttribute(v));
            return undefined;
        }, () => create_element(name));
    }
    function claim_element(nodes, name, attributes) {
        return claim_element_base(nodes, name, attributes, element);
    }
    function claim_text(nodes, data) {
        return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
            const dataStr = '' + data;
            if (node.data.startsWith(dataStr)) {
                if (node.data.length !== dataStr.length) {
                    return node.splitText(dataStr.length);
                }
            }
            else {
                node.data = dataStr;
            }
        }, () => text(data), true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
        );
    }
    function claim_space(nodes) {
        return claim_text(nodes, ' ');
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function claim_component(block, parent_nodes) {
        block && block.l(parent_nodes);
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                start_hydrating();
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            end_hydrating();
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.1' }, detail), { bubbles: true }));
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const H=t=>{if(!t)return;const{attributes:i,element:n,elementName:e,value:o}=t,r=n||document.createElement(e||"div");if(i&&r instanceof HTMLElement)for(const[t,n]of Object.entries(i))r.setAttribute(t,String(n));if(o)if("string"==typeof o)r.innerHTML=o;else for(const t of Array.isArray(o)?o:[o]){const i=H(t);i&&r.appendChild(i);}return r},B=/px$/,W=t=>Number(t.replace(B,"")),U="undefined"!=typeof document,q=()=>{},Y=(t,{filter:i,defaultValue:n}={})=>e=>{let o;return e&&`${e}`.replace(t,((t,i)=>o=i)),(i?i(o):o)||n},Z=t=>{throw new Error((t=>`twicpics-components ${t}`)(t))},G=(t,{border:i="\\s",regExpFlags:n}={})=>new RegExp(`^(?:${i})*(${Array.isArray(t)?t.join("|"):t})(?:${i})*$`,n),J={breakpoints:{xs:320,sm:640,md:768,lg:1024,xl:1280,"2xl":1536},class:"twic",domain:void 0,env:"production",handleShadowDom:q,maxDPR:void 0,path:"",step:void 0},X=U&&window,K=U?X["~ TPCC"]||(X["~ TPCC"]=J):J,Q=()=>`.twic-w>.${K.class}-background-done+div,.twic-w>.${K.class}-done+div,.twic-w>.${K.class}-poster-done+div{opacity:0 !important}.twic-w>.${K.class}-done,.twic-w>.${K.class}-poster-done{transform:none !important}`,_=t=>`data-${K.class}-${t}`,tt=/^(?:(auth|placeholder|rel)|(image|media|video)|[^:]*):(\/*)((v[0-9]+(?=[/?]))?[^?]*(\?.*)?)$/,it=(t,i="")=>{const n=t&&tt.exec(t);return {isAbsolute:t.slice(0,i.length+1)===`${i}/`,isSpecial:n&&void 0!==n[1]}},nt=({domain:t,context:i,inspect:n,output:e,quality:o,src:r,transform:s})=>{const{isAbsolute:a}=it(r,t),c=a?`media:${r.slice(`${t}/`.length)}`:r,l=tt.exec(c),d=l&&l[2],u=e?`/output=${e}`:"",m=d?l[4]:c,$=o?`/quality=${o}`:"",p=n?"/inspect":"",f=(({height:t,mode:i,width:n},e)=>{if(e&&(n||t)){const o=t||"-",r=n||"-";return e.replace(/(\/*\*)/g,`/${i}=${r}x${o}`).replace(/WxH/g,`${r}x${o}`)}return e})(i,s);return `${t}/${l&&(l[1]||l[5])?`v1${f}${u}${$}${p}/${d?`${l[2]}:${m}`:m}`:`${m}${l&&l[6]?"&":"?"}twic=v1${f}${u}${p}${$}`}`},et=(t,i)=>"cover"===t&&void 0!==i?"":"/*",ot=["center"];for(const t of ["","bottom","top"])for(const i of ["","left","right"])(i||t)&&ot.push(t?i?`${t}-${i}`:t:i);const rt=/\?|^\/*$/;G(ot);const st=/(^https?:\/\/[^/]+)\/*$/;G(["high","low","auto"]);const ct=G("\\s*(\\d+)\\s*[x]\\s*(\\d+)\\s*"),lt=G(["contain","cover"]),dt=G(["maincolor","meancolor","none","preview"]),ut=/^\/*(.+?)\/*$/,mt=G("(\\d+(?:\\.\\d+)?)(?:\\s*[\\/:]\\s*(\\d+(?:\\.\\d+)?))?|(none)"),$t=G(["debug","offline","production"]),pt=G("(\\d+\\.?\\d*)|(css)",{regExpFlags:"i"}),ft=t=>!isNaN(t)&&t>0,ht=/^((image|media|video):)?\/*/,gt=Y(G("(?:.|\n)+?")),yt=G(".+?",{border:"[\\s\\/]"}),vt={true:!0,false:!1,"":!0},bt=t=>"boolean"==typeof t?t:void 0!==t&&vt[t.trim()],Dt=t=>{if("number"!=typeof t){const i=gt(t);t=i&&Number(i);}return ft(t)?t:void 0},xt=/\b(?:(left|right)|(bottom|top))\b/g,kt=t=>{const i=gt(t);let n,e;if(i){let t;for(;t=xt.exec(i);)t[1]?n=t[1]:e=t[2];}return {x:n,y:e}},St=t=>gt(t)||"",Et=gt,zt=t=>{const i=gt(t);return st.test(i)?i.replace(st,"$1"):void 0},jt=bt,Pt=Y($t),Mt=t=>{const i=gt(t);return "none"===i?void 0:i},Rt=Y(lt,{defaultValue:"cover"}),Lt=t=>{const i=gt(t);return i?i.replace(ut,"$1/"):""},Vt=gt,Bt=Y(yt,{filter:t=>t&&t.replace(/^\/*(.*[^/])\/*$/,"$1")}),Wt=t=>{if("none"===t)return 0;let i;if(t)if("number"==typeof t)i=1/t;else {const n=mt.exec(t);if(n){const[,,t,e]=n;i=(e?Number(e):1)/Number(t);}else i=1;}return ft(i)?i:void 0},qt=t=>{const i=bt(t);if(void 0===i){const i=gt((t||"").toString());return i&&i.replace(/\s/g,"")}return i?"":void 0},Zt=Dt,Gt=t=>{if("offline"===K.env)return "";const i=gt(t)||"placeholder:red",{isAbsolute:n,isSpecial:e}=it(i,K.domain);return e?i:n?`media:${i.slice(`${K.domain}/`.length)}`:i.replace(ht,`media:${K.path}`)},Xt=t=>t&&t.trim(),Kt={true:"fade",false:"none",fade:"fade",zoom:"zoom",none:"none"},Qt=gt,_t=gt,ti=gt,ii=({x:t,y:i},n,e)=>"contain"===n&&(e||(i?t?`${i} ${t}`:i:t)),ni=({anchor:{x:t,y:i},debug:n,focus:e,mode:o,preTransform:r,refit:s})=>{const a=i?t?`${i}-${t}`:i:t,c="contain"!==o&&void 0===s&&(e||a),l=((t,i,n)=>void 0!==n&&`${"contain"===i?"auto":"WxH"}${n?`(${n})`:""}${t&&"contain"!==i?`@${t}`:""}`)(a,o,s);return `${n?"/debug":""}${r?`/${r}`:""}${c?`/focus=${c}`:""}${l?`/refit=${l}`:""}`},ei=(t,i,n)=>{const e={};return i&&(e.transitionDuration=i),t&&(e.transitionDelay=t),n&&(e.transitionTimingFunction=n),e},oi=(t,i)=>"img"===i?t:void 0,ri={img:"objectPosition",video:"objectPosition"},si={img:"objectFit",video:"objectFit"},ai=(t,i,n)=>{const e=["twic-w"];return t&&e.push(t),n.hasOwnProperty("none")||(n.hasOwnProperty("fade")&&e.push("twic-tf"),n.hasOwnProperty("zoom")&&e.push("twic-tz")),"offline"===K.env&&(e.push("twic-offline"),i||e.push("twic-nosrc")),e.join(" ")},ci=[["anticipation","anticipation"],["class","class"],["maxDPR","max-dpr"],["step","step"]],li=t=>{(t=>{t||Z("install options not provided");const{domain:i,env:n,path:e}=t;i&&st.test(i)||Z(`install domain "${i}" is invalid`),e&&rt.test(e)&&Z(`install path "${e}" is invalid`),n&&!$t.test(n)&&Z(`install env "${n}" is invalid`);})(t);const{domain:i,env:n,path:e}=t;(t=>{const{breakpoints:i={},debug:n,domain:e,class:o,env:r,handleShadowDom:s,maxDPR:a,path:c}=t;K.breakpoints=Object.assign(Object.assign({},K.breakpoints),i),K.class=o||K.class,K.domain=e,K.env=n?"debug":r,K.maxDPR=Math.max(1,a||2),K.path=c,K.handleShadowDom=s&&U?(t=>{const i=new WeakSet;return n=>{for(;n&&!i.has(n);){i.add(n);const{parentNode:e}=n;if(!e&&n instanceof ShadowRoot){if("closed"===n.mode)throw new Error("cannot use TwicPics components in closed ShadowRoot");H({element:n,value:{elementName:"style",value:`.twic-i{overflow:hidden}.twic-w,.twic-w *{border:none;margin:0;overflow:hidden;padding:0}.twic-w{overflow:hidden;position:relative;padding-top:100%;width:100%;padding-top:calc(100% / var(--twic-ratio,1))}.twic-w>*{display:block;height:100%;left:0;position:absolute;top:0;width:100%;transition-property:opacity,transform;will-change:opacity,transform;background-size:cover;background-position:center;background-repeat:no-repeat;object-fit:cover;object-position:center;transition-delay:0s;transition-duration:.4s;transition-timing-function:ease;object-fit:var(--twic-mode,cover);object-position:var(--twic-position,center);transition-delay:var(--twic-transition-delay,0s);transition-duration:var(--twic-transition-duration,400ms);transition-timing-function:var(--twic-transition-timing-function,ease)}.twic-w>div{background-repeat:no-repeat;background-size:cover;background-position:center;background-size:var(--twic-mode,cover);background-position:var(--twic-position,center);font-size:calc(1px / var(--twic-ratio,1))}.twic-w>img:not([src]),.twic-w>img[src=\"\"]{visibility:hidden}.twic-w.twic-tz>img{transform:scale(0)}.twic-w.twic-tf>div{opacity:1}.twic-d{display:block}.twic-offline{background-color:#ccc}.twic-offline.twic-nosrc{background-color:#fd0016}.twic-offline>*{display:none}:root{--twic-zoom:0}.twic-z{position:relative}.twic-m{left:0;position:absolute;top:0;z-index:1}.twic-m>*{display:none;transition:none;width:calc(max(var(--twic-zoom),1) * 100%);height:calc(max(var(--twic-zoom),1) * 100%);transform:translate3d(calc((1 - max(var(--twic-zoom),1)) * var(--twic-xr,0) * 1px),calc((1 - max(var(--twic-zoom),1)) * var(--twic-yr,0) * 1px),0)}.twic-m:hover>*{display:block}.twic-m:hover+div,twicmedia:hover+twicmedia{opacity:0}.twic-p{border:none;margin:0;overflow:hidden;padding:0}.twic-p>img{display:block;object-fit:cover;object-position:center;width:100%;height:100%}${Q()}`}}),(n=n.host)&&n.setAttribute(t,"");}else n=e;}}})(_("component")):q;})(Object.assign(Object.assign({},t),{domain:zt(i),env:Pt(n),path:Lt(e)})),(t=>{if(U){const i=[`${K.domain}/?v1`];ci.forEach((n=>{const[e,o]=n;t.hasOwnProperty(e)&&t[e]&&i.push(`${o}=${t[e]}`);}));const{scriptElementId:n}=t;H({element:document.head,value:[{attributes:{rel:"preconnect",href:K.domain},elementName:"link"},{attributes:Object.assign(Object.assign({async:"",defer:""},n&&{id:n}),{src:i.join("&")}),elementName:"script"}]});const e=H({elementName:"style",value:Q()});document.head.appendChild(e),document.addEventListener("astro:after-swap",(()=>document.head.appendChild(e)));}})(t);},di=(t,i)=>{if(t<0||t>i)return Math.min(Math.max(0,t),i);let n=2*t/i;return n<1?i/2*n**3:(n-=2,i/2*(n**3+2))},ui=t=>{t.preventDefault(),t.stopPropagation();const i=t.currentTarget,{left:n,top:e,right:o,bottom:r}=i.getBoundingClientRect(),{clientX:s,clientY:a}=t instanceof MouseEvent?t:t.touches[0];i.style.setProperty("--twic-xr",di(s-n,o-n).toString()),i.style.setProperty("--twic-yr",di(a-e,r-e).toString());},mi=new WeakMap,$i=U&&"undefined"!=typeof MutationObserver&&new MutationObserver((t=>{for(const{target:i}of t){const t=mi.get(i);t&&t.handleState();}})),pi=U&&"undefined"!=typeof ResizeObserver&&new ResizeObserver((t=>{for(const{target:i}of t){const t=mi.get(i);t&&t.refreshBackground();}})),fi=new RegExp(`(?:\\s*)(?:${K.class}(?:-background)*-)(done|error|loading)`);class hi{constructor(t=void 0){this.handleState=()=>{if(this.stateHandler){let t="new";const{className:i}=this.media,n=fi.exec(i);n&&([,t]=n),this.stateHandler(t);}},this.refreshBackground=((t,i)=>{let n;const e=Object.assign({leading:!0,ms:0,trailing:!0},{ms:100});return (...i)=>{!n&&e.leading&&t(...i),clearTimeout(n),n=setTimeout((()=>{n=void 0,e.trailing&&t(...i);}),e.ms);}})((()=>{if(this.media&&this.placeholderData){const t=this.media.nextElementSibling,i=((t,{anchor:i,focus:n,mode:e,placeholder:o,preTransform:r,src:s,ratio:a,refit:c,transitions:l,videoOptions:d})=>{if(!K.domain||!t||!o||l.hasOwnProperty("zoom"))return "";const u=getComputedStyle(t),m=e||Rt(u.backgroundSize);let $;$=0===a?"contain"===m?1:W(u.height)/Math.max(1,W(u.width)):null!=a?a:W(u.fontSize);let p=1e3,f=1e3;$<1?p*=$:f/=$;const{videoTransform:h}=d||{},g=`${ni({anchor:i,focus:n,mode:e,preTransform:r,refit:c})}${h||""}${et(m,c)||""}`;return nt({context:{height:Math.max(1,Math.round(p)),mode:m,width:Math.max(1,Math.round(f))},domain:K.domain,transform:g,src:s,output:o})})(t,this.placeholderData);i&&i!==this.savedWrapperBackground&&(this.savedWrapperBackground=i,t.style.backgroundImage=`url(${JSON.stringify(i)})`);}})),this.setMedia=t=>{t&&(K.handleShadowDom(t),this.media=t,mi.set(this.media,this),$i&&($i.observe(this.media,{attributes:!0,attributeFilter:["class"]}),this.handleState()),pi&&pi.observe(this.media));},this.setPlaceholderData=t=>{this.placeholderData=t,this.media&&this.refreshBackground();},this.destroy=()=>{this.media&&this.media&&pi&&pi.unobserve(this.media);},this.stateHandler=t;}}const gi=t=>Object.keys(t).length?Object.entries(t).flatMap((([t,i])=>i?[`${t.replace(/([a-z]|(?=[A-Z]))([A-Z])/g,"$1-$2").toLowerCase()}:${i};`]:[])).join(""):void 0;function yi(t){let i,n=[{alt:t[9]},{style:t[6]},t[8]],o={};for(let t=0;t<n.length;t+=1)o=assign(o,n[t]);return {c(){i=element(t[1]),this.h();},l(n){i=claim_element(n,(t[1]||"null").toUpperCase(),{alt:!0,style:!0}),children(i).forEach(detach),this.h();},h(){set_dynamic_element_data(t[1])(i,o);},m(n,e){insert_hydration(n,i,e),t[52](i);},p(t,e){set_dynamic_element_data(t[1])(i,o=get_spread_update(n,[512&e[0]&&{alt:t[9]},64&e[0]&&{style:t[6]},256&e[0]&&t[8]]));},d(n){n&&detach(i),t[52](null);}}}function vi(t){let i;return {c(){i=element("div"),this.h();},l(t){i=claim_element(t,"DIV",{style:!0}),children(i).forEach(detach),this.h();},h(){attr(i,"style",t[7]);},m(t,n){insert_hydration(t,i,n);},p(t,n){128&n[0]&&attr(i,"style",t[7]);},d(t){t&&detach(i);}}}function bi(t){let i,$,p,f=t[1],h=t[1]&&yi(t),g=t[4]&&vi(t);return {c(){i=element("div"),h&&h.c(),$=space(),g&&g.c(),this.h();},l(t){i=claim_element(t,"DIV",{class:!0,style:!0,title:!0});var n=children(i);h&&h.l(n),$=claim_space(n),g&&g.l(n),n.forEach(detach),this.h();},h(){attr(i,"class",p=ai(t[11],t[2],t[3])),attr(i,"style",t[5]),attr(i,"title",t[10]);},m(t,n){insert_hydration(t,i,n),h&&h.m(i,null),append_hydration(i,$),g&&g.m(i,null);},p(t,e){t[1]?f?safe_not_equal(f,t[1])?(h.d(1),h=yi(t),f=t[1],h.c(),h.m(i,$)):h.p(t,e):(h=yi(t),f=t[1],h.c(),h.m(i,$)):f&&(h.d(1),h=null,f=t[1]),t[4]?g?g.p(t,e):(g=vi(t),g.c(),g.m(i,null)):g&&(g.d(1),g=null),2060&e[0]&&p!==(p=ai(t[11],t[2],t[3]))&&attr(i,"class",p),32&e[0]&&attr(i,"style",t[5]),1024&e[0]&&attr(i,"title",t[10]);},i:noop,o:noop,d(t){t&&detach(i),h&&h.d(t),g&&g.d();}}}function wi(t,i,n){let e,o,r,s,a,c,l,d,u,m,$,p,f,g,y,v,b,w,T,D,x,k,O,S,E,z,F,j,{alt:N}=i,{anchor:P}=i,{bot:M}=i,{class:A}=i,{focus:C}=i,{intrinsic:R}=i,{media:H}=i,{mediaTag:B="img"}=i,{mode:W}=i,{eager:q=!1}=i,{placeholder:Y}=i,{position:Z}=i,{preTransform:G}=i,{ratio:J}=i,{refit:X}=i,{src:Q}=i,{step:tt}=i,{state:nt}=i,{title:ot}=i,{transition:rt}=i,{transitionDelay:st}=i,{transitionDuration:at}=i,{transitionTimingFunction:lt}=i,{videoOptions:ut}=i;const mt=new hi((t=>{n(12,nt=t);})),$t=createEventDispatcher();return U&&(onMount((()=>{mt.setMedia(H);})),onDestroy((()=>{mt.destroy();}))),t.$$set=t=>{"alt"in t&&n(13,N=t.alt),"anchor"in t&&n(14,P=t.anchor),"bot"in t&&n(15,M=t.bot),"class"in t&&n(16,A=t.class),"focus"in t&&n(17,C=t.focus),"intrinsic"in t&&n(18,R=t.intrinsic),"media"in t&&n(0,H=t.media),"mediaTag"in t&&n(1,B=t.mediaTag),"mode"in t&&n(19,W=t.mode),"eager"in t&&n(20,q=t.eager),"placeholder"in t&&n(21,Y=t.placeholder),"position"in t&&n(22,Z=t.position),"preTransform"in t&&n(23,G=t.preTransform),"ratio"in t&&n(24,J=t.ratio),"refit"in t&&n(25,X=t.refit),"src"in t&&n(2,Q=t.src),"step"in t&&n(26,tt=t.step),"state"in t&&n(12,nt=t.state),"title"in t&&n(27,ot=t.title),"transition"in t&&n(28,rt=t.transition),"transitionDelay"in t&&n(29,st=t.transitionDelay),"transitionDuration"in t&&n(30,at=t.transitionDuration),"transitionTimingFunction"in t&&n(31,lt=t.transitionTimingFunction),"videoOptions"in t&&n(32,ut=t.videoOptions);},t.$$.update=()=>{var i;4096&t.$$.dirty[0]&&$t("statechange",{state:nt}),8192&t.$$.dirty[0]&&n(50,e=St(N)),16384&t.$$.dirty[0]&&n(40,o=kt(P)),32768&t.$$.dirty[0]&&n(49,r="string"==typeof(i=M)?i.trim():void 0),65536&t.$$.dirty[0]&&n(11,s=Et(A)||""),1048576&t.$$.dirty[0]&&n(48,a=jt(q)),131072&t.$$.dirty[0]&&n(45,c=Mt(C)),262144&t.$$.dirty[0]&&n(47,l=(t=>{if(!t)return;let i;const n=ct.exec(t);if(n){const[,,t,e]=n;i=`${t}x${e}`;}return i})(R)),2&t.$$.dirty[0]&&n(39,d=(t=>{const i=gt(t);return i&&i.toLocaleLowerCase()})(B)),524288&t.$$.dirty[0]&&n(38,u=Rt(W)),2097152&t.$$.dirty[0]&&n(51,m=(t=>{if("offline"!==K.env&&"none"!==t)return dt.test(t)?t:"preview"})(Y)),4194304&t.$$.dirty[0]&&n(37,$=Vt(Z)),8388608&t.$$.dirty[0]&&n(44,p=Bt(G)),16777216&t.$$.dirty[0]&&n(33,f=Wt(J)),33554432&t.$$.dirty[0]&&n(43,g=qt(X)),4&t.$$.dirty[0]&&n(42,y=Gt(Q)),67108864&t.$$.dirty[0]&&n(46,v=Zt(tt)),134217728&t.$$.dirty[0]&&n(10,b=Xt(ot)),268435456&t.$$.dirty[0]&&n(3,w=(t=>{"boolean"!=typeof t&&(t=gt(t)||!0);const i={};return String(t).split(/\s*\+\s*|\s+/).forEach((t=>i[`${Kt[t]||"fade"}`]=!0)),i})(rt)),536870912&t.$$.dirty[0]&&n(36,T=Qt(st)),1073741824&t.$$.dirty[0]&&n(35,D=_t(at)),1&t.$$.dirty[1]&&n(34,x=ti(lt)),2&t.$$.dirty[1]&&n(41,k=ut),1050624&t.$$.dirty[1]&&n(4,O=((t,i)=>it(i,K.domain).isSpecial?void 0:t)(m,y)),524544&t.$$.dirty[1]&&n(9,S=oi(e,d)),524160&t.$$.dirty[1]&&n(8,E=((t,i,n,e,o,r,s,a,c,l,d,u)=>{const m={},{videoTransform:$,posterTransform:p}=u||{},f=ni({anchor:t,debug:"debug"===K.env,focus:e,mode:s,preTransform:a,refit:c});return (f||$)&&(m[_("transform")]=`${f}${$||""}${et(s,c)||""}`),"string"==typeof i&&(m[_("bot")]=i||"/"),n&&(m[_("eager")]=""),o&&(m[_("intrinsic")]=o),l&&("img"===r||"video"===r?m[_("src")]=l:m[_("background")]=`url(${l})`),l&&"video"===r&&(m[_("poster")]=l,m[_("poster-transform")]=`${f}${p||""}/*/output=image`),void 0!==d&&(m[_("step")]=String(d)),m})(o,r,a,c,l,d,u,p,g,y,v,k)),24&t.$$.dirty[0]|32508&t.$$.dirty[1]&&n(7,z=gi(((t,i,n,e,o,r,s,a,c,l,d,u,m,$,p)=>{const f=ei(d,u,m);p({anchor:t,focus:i,mode:n,placeholder:e,preTransform:r,ratio:s,refit:a,src:c,transitions:l,videoOptions:$}),n&&(f.backgroundSize=n);const h=ii(t,n,o);return h&&(f.backgroundPosition=h),f})(o,c,u,O,$,p,f,g,y,w,T,D,x,k,mt.setPlaceholderData))),1016&t.$$.dirty[1]&&n(6,F=gi(((t,i,n,e,o,r,s)=>{const a=ei(o,r,s),c=ii(t,n,e);return c&&(a[ri[i]||"backgroundPosition"]=c),n&&(a[si[i]||"backgroundSize"]=n),a})(o,d,u,$,T,D,x))),4&t.$$.dirty[1]&&n(5,j=gi((t=>0===t?{height:"100%",paddingTop:"0"}:{paddingTop:void 0===t?"":100*t+"%"})(f)));},[H,B,Q,w,O,j,F,z,E,S,b,s,nt,N,P,M,A,C,R,W,q,Y,Z,G,J,X,tt,ot,rt,st,at,lt,ut,f,x,D,T,$,u,d,o,k,y,g,p,c,v,l,a,r,e,m,function(t){binding_callbacks[t?"unshift":"push"]((()=>{H=t,n(0,H);}));}]}class Ti extends SvelteComponent{constructor(t){super(),init(this,t,wi,bi,safe_not_equal,{alt:13,anchor:14,bot:15,class:16,focus:17,intrinsic:18,media:0,mediaTag:1,mode:19,eager:20,placeholder:21,position:22,preTransform:23,ratio:24,refit:25,src:2,step:26,state:12,title:27,transition:28,transitionDelay:29,transitionDuration:30,transitionTimingFunction:31,videoOptions:32},null,[-1,-1]);}}function Si(t){let i,n,m,p,g,b,F=t[1]&&zi(t);const j=[t[5],{mediaTag:"img"}];function N(i){t[29](i);}let P={};for(let t=0;t<j.length;t+=1)P=assign(P,j[t]);return void 0!==t[0]&&(P.state=t[0]),m=new Ti({props:P}),binding_callbacks.push((()=>bind(m,"state",N))),m.$on("statechange",t[30]),{c(){i=element("div"),F&&F.c(),n=space(),create_component(m.$$.fragment),this.h();},l(t){i=claim_element(t,"DIV",{class:!0,style:!0});var e=children(i);F&&F.l(e),n=claim_space(e),claim_component(m.$$.fragment,e),e.forEach(detach),this.h();},h(){attr(i,"class",g=`twic-i ${t[3]} ${t[1]?"twic-z":""}`),attr(i,"style",t[2]);},m(e,o){insert_hydration(e,i,o),F&&F.m(i,null),append_hydration(i,n),mount_component(m,i,null),t[31](i),b=!0;},p(t,e){t[1]?F?(F.p(t,e),2&e[0]&&transition_in(F,1)):(F=zi(t),F.c(),transition_in(F,1),F.m(i,n)):F&&(group_outros(),transition_out(F,1,1,(()=>{F=null;})),check_outros());const o=32&e[0]?get_spread_update(j,[get_spread_object(t[5]),j[1]]):{};!p&&1&e[0]&&(p=!0,o.state=t[0],add_flush_callback((()=>p=!1))),m.$set(o),(!b||10&e[0]&&g!==(g=`twic-i ${t[3]} ${t[1]?"twic-z":""}`))&&attr(i,"class",g),(!b||4&e[0])&&attr(i,"style",t[2]);},i(t){b||(transition_in(F),transition_in(m.$$.fragment,t),b=!0);},o(t){transition_out(F),transition_out(m.$$.fragment,t),b=!1;},d(n){n&&detach(i),F&&F.d(),destroy_component(m),t[31](null);}}}function Ei(t){let i,n,e,r,s=t[1]&&Fi(t);const l=[t[5],{mediaTag:"img"}];function u(i){t[27](i);}let m={};for(let t=0;t<l.length;t+=1)m=assign(m,l[t]);return void 0!==t[0]&&(m.state=t[0]),n=new Ti({props:m}),binding_callbacks.push((()=>bind(n,"state",u))),n.$on("statechange",t[28]),{c(){s&&s.c(),i=space(),create_component(n.$$.fragment);},l(t){s&&s.l(t),i=claim_space(t),claim_component(n.$$.fragment,t);},m(t,e){s&&s.m(t,e),insert_hydration(t,i,e),mount_component(n,t,e),r=!0;},p(t,o){t[1]?s?(s.p(t,o),2&o[0]&&transition_in(s,1)):(s=Fi(t),s.c(),transition_in(s,1),s.m(i.parentNode,i)):s&&(group_outros(),transition_out(s,1,1,(()=>{s=null;})),check_outros());const r=32&o[0]?get_spread_update(l,[get_spread_object(t[5]),l[1]]):{};!e&&1&o[0]&&(e=!0,r.state=t[0],add_flush_callback((()=>e=!1))),n.$set(r);},i(t){r||(transition_in(s),transition_in(n.$$.fragment,t),r=!0);},o(t){transition_out(s),transition_out(n.$$.fragment,t),r=!1;},d(t){s&&s.d(t),t&&detach(i),destroy_component(n,t);}}}function zi(t){let i,n;const e=[t[5],{class:"twic-m"},{mediaTag:"div"},{mode:"cover"}];let o={};for(let t=0;t<e.length;t+=1)o=assign(o,e[t]);return i=new Ti({props:o}),{c(){create_component(i.$$.fragment);},l(t){claim_component(i.$$.fragment,t);},m(t,e){mount_component(i,t,e),n=!0;},p(t,n){const o=32&n[0]?get_spread_update(e,[get_spread_object(t[5]),e[1],e[2],e[3]]):{};i.$set(o);},i(t){n||(transition_in(i.$$.fragment,t),n=!0);},o(t){transition_out(i.$$.fragment,t),n=!1;},d(t){destroy_component(i,t);}}}function Fi(t){let i,n;const e=[t[5],{class:"twic-m"},{mediaTag:"div"},{mode:"cover"}];let o={};for(let t=0;t<e.length;t+=1)o=assign(o,e[t]);return i=new Ti({props:o}),{c(){create_component(i.$$.fragment);},l(t){claim_component(i.$$.fragment,t);},m(t,e){mount_component(i,t,e),n=!0;},p(t,n){const o=32&n[0]?get_spread_update(e,[get_spread_object(t[5]),e[1],e[2],e[3]]):{};i.$set(o);},i(t){n||(transition_in(i.$$.fragment,t),n=!0);},o(t){transition_out(i.$$.fragment,t),n=!1;},d(t){destroy_component(i,t);}}}function ji(t){let n,e,o;const r=[Ei,Si],s=[];return n=s[1]=r[1](t),{c(){n.c(),e=empty();},l(t){n.l(t),e=empty();},m(t,i){s[1].m(t,i),insert_hydration(t,e,i),o=!0;},p(t,i){n.p(t,i);},i(t){o||(transition_in(n),o=!0);},o(t){transition_out(n),o=!1;},d(t){s[1].d(t),t&&detach(e);}}}function Ni(t,i,n){let e,o,r,s,a,{alt:c}=i,{anchor:l}=i,{bot:d}=i,{class:u}=i,{focus:m}=i,{intrinsic:$}=i,{mode:p}=i,{eager:f=!1}=i,{placeholder:g}=i,{position:y}=i,{preTransform:v}=i,{ratio:w}=i,{refit:T}=i,{src:D}=i,{step:x}=i,{state:k}=i,{title:O}=i,{transition:S}=i,{transitionDelay:E}=i,{transitionDuration:z}=i,{transitionTimingFunction:F}=i,{zoom:j}=i;return U&&onMount((()=>{o&&(t=>{const i=t.firstElementChild;i.addEventListener("mousemove",(t=>ui(t))),i.addEventListener("touchmove",(t=>ui(t)));})(a);})),t.$$set=t=>{"alt"in t&&n(6,c=t.alt),"anchor"in t&&n(7,l=t.anchor),"bot"in t&&n(8,d=t.bot),"class"in t&&n(9,u=t.class),"focus"in t&&n(10,m=t.focus),"intrinsic"in t&&n(11,$=t.intrinsic),"mode"in t&&n(12,p=t.mode),"eager"in t&&n(13,f=t.eager),"placeholder"in t&&n(14,g=t.placeholder),"position"in t&&n(15,y=t.position),"preTransform"in t&&n(16,v=t.preTransform),"ratio"in t&&n(17,w=t.ratio),"refit"in t&&n(18,T=t.refit),"src"in t&&n(19,D=t.src),"step"in t&&n(20,x=t.step),"state"in t&&n(0,k=t.state),"title"in t&&n(21,O=t.title),"transition"in t&&n(22,S=t.transition),"transitionDelay"in t&&n(23,E=t.transitionDelay),"transitionDuration"in t&&n(24,z=t.transitionDuration),"transitionTimingFunction"in t&&n(25,F=t.transitionTimingFunction),"zoom"in t&&n(26,j=t.zoom);},t.$$.update=()=>{512&t.$$.dirty[0]&&n(3,e=Et(u)||""),67108864&t.$$.dirty[0]&&n(1,o=(t=>{if("string"==typeof t){const i=pt.exec(t);if(i&&i[3])return !0;t=i&&i[2]?Number(i[2]):void 0;}return ft(t)&&t>1?t:void 0})(j)),67108288&t.$$.dirty[0]&&n(5,r={alt:c,anchor:l,bot:d,focus:m,intrinsic:$,mode:p,eager:f,placeholder:g,position:y,preTransform:v,ratio:w,refit:T,src:D,step:x,title:O,transition:S,transitionDelay:E,transitionDuration:z,transitionTimingFunction:F}),2&t.$$.dirty[0]&&n(2,s=gi((t=>{const i={};return "boolean"!=typeof t&&t&&(i["--twic-zoom"]=`${t}`),i})(o))),t.$$.dirty[0];},[k,o,s,e,a,r,c,l,d,u,m,$,p,f,g,y,v,w,T,D,x,O,S,E,z,F,j,function(t){k=t,n(0,k);},function(i){bubble.call(this,t,i);},function(t){k=t,n(0,k);},function(i){bubble.call(this,t,i);},function(t){binding_callbacks[t?"unshift":"push"]((()=>{a=t,n(4,a),n(3,e),n(1,o),n(2,s),n(9,u),n(26,j);}));}]}const Yi=li,Gi=class extends SvelteComponent{constructor(t){super(),init(this,t,Ni,ji,safe_not_equal,{alt:6,anchor:7,bot:8,class:9,focus:10,intrinsic:11,mode:12,eager:13,placeholder:14,position:15,preTransform:16,ratio:17,refit:18,src:19,step:20,state:0,title:21,transition:22,transitionDelay:23,transitionDuration:24,transitionTimingFunction:25,zoom:26},null,[-1,-1]);}};

    /* src/components/Sample.svelte generated by Svelte v3.59.1 */
    const file = "src/components/Sample.svelte";

    function create_fragment(ctx) {
    	let main;
    	let twicimg;
    	let current;

    	twicimg = new Gi({
    			props: { src: "football.jpg" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(twicimg.$$.fragment);
    			add_location(main, file, 6, 0, 114);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(twicimg, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(twicimg.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(twicimg.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(twicimg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sample', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sample> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ TwicImg: Gi });
    	return [];
    }

    class Sample extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sample",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    Yi( {
        "domain": `https://demo.twic.it`,
        "anticipation": 0.5,
        "step": 100,
        "env": `production`,
    } );

    var main = new Sample( {
        "target": document.body,
    } );

    return main;

})();
//# sourceMappingURL=bundle.js.map
