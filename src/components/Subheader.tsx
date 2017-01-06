import * as React from "react";
import {ActionType, ComponentProps, ComponentState, TintComponent, inheritDefaultProps} from "./Component";
import {TextView, TextViewStyles} from "./TextView";
import "./Subheader.css";

/**
 * Subheaders are list tiles that delineate sections of a list or grid list.
 * This component adheres to Material Design > Subheaders recommendations.
 */
export class Subheader extends TintComponent<ComponentProps, ComponentState> {
    static defaultProps = {
    };

    render() {
        const cls:string = "mr-subheader " + this.props.className;

        return (
            <div className={cls}
                 style={this.props.style}>
                <TextView tint={this.props.tint}
                          variant={this.variantBase}
                          action={ActionType.Secondary}
                          textStyle={TextViewStyles.Body2}>
                    {this.props.children}
                </TextView>
            </div>
        );
    }
}

inheritDefaultProps(Subheader);