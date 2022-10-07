import React, { type ReactNode } from "react";
import { computeViewAttributes } from "../_/compute";

type Props = {
    children: ReactNode
}
class TwicView extends React.Component< Props > {
    render() {
        const { children, ...props } = this.props;
        return (
            <div
                {
                    ...{
                        ...computeViewAttributes(),
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
