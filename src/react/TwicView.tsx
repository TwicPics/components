import React, { Component, type ReactNode } from "react";
import { getDataAttributeName } from "../_/install";

type Props = {
    children: ReactNode
}
class TwicView extends Component< Props > {
    render() {
        const { children, ...props } = this.props;
        return (
            <div
                {
                    ...{
                        [ getDataAttributeName( `view` ) ]: ``,
                        ...props,
                    }
                }
            >
                { children }
            </div>
        );
    }
}
export default TwicView;
