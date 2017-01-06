import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, hex2rgba, inheritDefaultProps, styles} from "./Component";
import {Focus} from "./Focus";
import {Ink} from "./Ink";
import {
    Theme, ThemeStyle, DARK_VARIANT_FOCUS_SHADE, LIGHT_VARIANT_FOCUS_SHADE, DARK_VARIANT_INK_SPILL,
    LIGHT_VARIANT_INK_SPILL
} from "./Theme";
import "./Toggle.css";
import {Icon} from "./Icon";

export interface ToggleProps {
    /**
     * Whether the toggle is a radio or a checkbox.
     */
    isRadio?: boolean,
    /**
     * Whether the toggle is switched on or off.
     */
    isToggled: boolean
}

export interface ToggleState {
    /**
     * Whether the toggle is switched on or off.
     */
    isToggled: boolean
}

/**
 * Selection controls allow the user to select options. Checkboxes
 * allow the selection of multiple options from a set. Radio buttons
 * allow the selection of a single option from a set. Selection controls
 * use an theme’s accent color. This component adheres to Material
 * Design > Selection controls recommendations.
 */
export class Toggle extends Button<ToggleProps & ComponentProps, ToggleState & ComponentState> {
    static defaultProps = {
        isRadio: false
    };

    /*
     * Note: colors below are overwritten,
     * as this component always has tinting.
     */
    public get tint() {
        return this.calcTintColor() || this.theme.accent;
    }

    public get focusColor() {
        if(this.state.isToggled && !this.props.isDisabled) {
            return "rgba(" + hex2rgba(Theme.colors[this.tint][500], 0.12).join() + ")";
        }

        return this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_FOCUS_SHADE : DARK_VARIANT_FOCUS_SHADE;
    }

    public get inkColor() {
        if(this.state.isToggled) {
            return Theme.colors[this.tint][600];
        }

        return this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_INK_SPILL : DARK_VARIANT_INK_SPILL;
    }

    constructor(props: ToggleProps & ComponentProps) {
        super(props);

        this.state = {
            isActive: false,
            isFocus: false,
            isToggled: props.isToggled
        };
    }

    protected _deactivate() {
        super._deactivate();

        this.setState({
            isActive: false,
            isFocus: this.state.isFocus,
            isToggled: !this.state.isToggled
        })
    }

    /*
     * Note: we override here to allow
     * disabled toggle to react to focus
     */
    onFocus() {
        this.setState({
            isActive: this.state.isActive,
            isFocus: true,
            isToggled: this.state.isToggled
        });
    }

    onBlur() {
        this.setState({
            isActive: this.state.isActive,
            isFocus: false,
            isToggled: this.state.isToggled
        });
    }

    render() {
        let cls:string = "mr-toggle " + this.props.className;
        if(this.props.isRadio) {
            cls += "mr-toggle--radio";
        }
        if(this.props.isDisabled) {
            cls += " mr-toggle--disabled";
        }
        if(this.state.isActive) {
            cls += " mr-toggle--active";
        }
        if(this.state.isToggled) {
            cls += " mr-toggle--toggled";
        }

        let tabIndex:number = 0;
        if(this.props.isDisabled) {
            tabIndex = -1;
        }

        const foreIcon:string = this.props.isRadio ? "radio_button_checked" : "check_box";
        const backIcon:string = this.props.isRadio ? "radio_button_unchecked" : "check_box_outline_blank";

        return (
            <div ref="me"
                 className={cls}
                 style={this.props.style}
                 tabIndex={tabIndex}

                 onMouseDown={this.onPressBegin}
                 onMouseUp={this.onPressEnd}
                 onKeyDown={this.onKeyDown}
                 onKeyUp={this.onKeyUp}
                 onFocus={this.onFocus}
                 onBlur={this.onBlur}
                 onMouseEnter={this.onHover}
                 onMouseLeave={this.onLeave}>
                <Icon className="mr-toggle__background"
                      variant={this.props.variant}
                      isDisabled={this.props.isDisabled}>{backIcon}</Icon>
                <Icon className="mr-toggle__foreground"
                      variant={this.props.variant}
                      tint={this.tint}
                      isDisabled={this.props.isDisabled}>{foreIcon}</Icon>
                <Ink ref="ink"
                     isActive={this.state.isActive}
                     color={this.inkColor}
                     size={this.state.inkSpillSize}
                     originTop={this.state.inkOriginTop}
                     originLeft={this.state.inkOriginLeft}/>
                <Focus isActive={this.state.isFocus}
                       color={this.focusColor}/>
            </div>
        );
    }
}

inheritDefaultProps(Toggle);