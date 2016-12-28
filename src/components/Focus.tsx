import * as React from "react";
import "./Focus.css";

export interface FocusProperties
{
    /**
     * Whether the focus shade is showing now.
     */
    isActive: boolean,
    /**
     * Color of the focus shade.
     */
    color: string
}

/**
 * A component that powers 'focus shade' effect.
 */
export class Focus extends React.Component<FocusProperties, {}> {
    render() {
        let cls:string = "mr-focus";
        if(this.props.isActive)
            cls += " mr-focus--active";

        const style = {
            background: this.props.color
        };

        return (
            <div className={cls} style={style}>
            </div>
        );
    }
}