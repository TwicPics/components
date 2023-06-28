/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */

import "@twicpics/components/style.css";
import "@twicpics/components-sample/Sample.css";
import { TwicInstall } from "@twicpics/components/react";

export default function RootLayout( { children }: {
    children: React.ReactNode
} ) {

    return (
        <html lang="en">
            <TwicInstall
                domain="https://demo.twic.it"
                anticipation="0.50"
                step="100"
                env="production"
            ></TwicInstall>
            <body>
                {children}
            </body>
        </html>
    );
}
