// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import Link from 'next/link';
const MenuBar = () => (
    <nav>
        <ul className="twic-sample-nav-links">
            <li>
                <Link href="/">Sample (RSC)</Link>
            </li>
            <li>
                <Link href="/use-client">Client side</Link>
            </li>
        </ul>
    </nav>
);

export default MenuBar;
