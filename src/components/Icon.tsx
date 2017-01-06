import * as React from "react";
import {ComponentProps, ComponentState, TintComponent, inheritDefaultProps, styles} from "./Component";
import {
    Theme, ThemeStyle, DARK_VARIANT_ICON, LIGHT_VARIANT_ICON, DARK_VARIANT_ICON_INACTIVE,
    LIGHT_VARIANT_ICON_INACTIVE
} from "./Theme";
import "./Icon.css";

export interface IconProps {
    /**
     * Override the color of the icon with the given value.
     */
    customColor?: string,
    /**
     * Size of the icon. Specified in pixels.
     */
    size?: number
}

/**
 * A round picture to represent an entity: person, city etc.
 */
export class Icon extends TintComponent<IconProps & ComponentProps, ComponentState> {
    static defaultProps = {
        size: 24
    };

    render() {
        let color:string = this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_ICON : DARK_VARIANT_ICON;
        if(this.props.isDisabled) {
            color = this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_ICON_INACTIVE : DARK_VARIANT_ICON_INACTIVE;
        }
        else if(this.props.customColor) {
            color = this.props.customColor;
        }
        else if(this.tint) {
            color = Theme.colors[this.tint][500];
        }

        const cls:string = "mr-icon " + this.props.className;
        const style = styles(this.props.style, {
            color: color,
            width: this.props.size + "px",
            height: this.props.size + "px"
        });

        return (
            <div className={cls} style={style}>
                <i className="material-icons">
                    {this.props.children}
                </i>
            </div>
        );
    }
}

inheritDefaultProps(Icon);