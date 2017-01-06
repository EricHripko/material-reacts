import * as React from "react";
import {ComponentProps, ComponentState, TintComponent, inheritDefaultProps, styles} from "./Component";
import {ThemeStyle, DARK_VARIANT_DIVIDER, LIGHT_VARIANT_DIVIDER} from "./Theme";
import "./Divider.css";

export interface DividerProps {
    /**
     * Whether the divider is inset or full-bleed.
     */
    isInset?: boolean
}

/**
 * A divider is a thin, lightweight rule that groups content in lists
 * and page layouts. This component adheres to Material Design >
 * Dividers recommendations.
 */
export class Divider extends TintComponent<DividerProps & ComponentProps, ComponentState> {
    static defaultProps = {
    };

    render() {
        let cls:string = "mr-divider " + this.props.className;
        if(this.props.isInset) {
            cls += "mr-divider--inset";
        }

        const style = styles(this.props.style, {
            backgroundColor: this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_DIVIDER : DARK_VARIANT_DIVIDER
        });

        return (
            <div className={cls}
                 style={style}>
            </div>
        );
    }
}

inheritDefaultProps(Divider);