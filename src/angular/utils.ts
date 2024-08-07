import type { ElementRef, Renderer2 } from "@angular/core";

export const attributes = ( data: Record< string, string >, element: HTMLElement, renderer: Renderer2 ) => {
    if ( !element || !renderer ) {
        return;
    }
    Object.entries( data || [] ).forEach( ( [ n, v ] ) => {
        if ( v === undefined ) {
            renderer.removeAttribute( element, n );
        } else {
            renderer.setAttribute(
                element,
                n,
                v
            );
        }
    } );
};

export const styles = ( data: Record< string, unknown >, element: HTMLElement, renderer: Renderer2 ) => {
    if ( !element || !renderer ) {
        return;
    }
    Object.entries( data || [] ).forEach( ( [ n, v ] ) => {
        if ( v === undefined ) {
            renderer.removeStyle( element, n );
        } else {
            renderer.setStyle(
                element,
                n,
                v
            );
        }
    } );
};

export const updateHostElement = (
    style: Record < string, unknown >,
    hostElement: ElementRef,
    renderer: Renderer2
): void => {
    if ( hostElement?.nativeElement ) {
        styles( style, hostElement.nativeElement, renderer );
    }
};
