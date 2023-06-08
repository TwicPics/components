import React, { type ReactNode } from "react";
import { getDataAttributeName } from "../_/config";

interface ViewAttributes {
    children: ReactNode,
}

const TwicView: React.FC< ViewAttributes > = props => {
    const { children, ...restProps } = props;
    return (
        <div
            {
                ... {
                    [ getDataAttributeName( `view` ) ]: ``,
                    ...restProps,
                }
            }
        >
            { children }
        </div>
    );
};
export default TwicView;
