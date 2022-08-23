// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import Link from 'next/link';
const MenuBar = () => (
    <nav>
        <ul className="twic-sample-nav-links">
            <li>
                <Link href="/">Static</Link>
            </li>
            <li>
                <Link href="/ssr">Ssr</Link>
            </li>
        </ul>
    </nav>
);

export default MenuBar;
