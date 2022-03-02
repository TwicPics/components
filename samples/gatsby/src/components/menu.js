// eslint-disable-next-line no-use-before-define
import * as React from 'react';
import { Link } from 'gatsby';
const Menu = () => (
    <nav>
        <ul className="twic-sample-nav-links">
            <li>
                <Link to="/">Static</Link>
            </li>
            <li>
                <Link to="/ssr">Ssr</Link>
            </li>
        </ul>
    </nav>
);

export default Menu;
