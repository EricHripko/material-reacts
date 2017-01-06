import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, hex2rgba, inheritDefaultProps, styles} from "./Component";
import {Focus} from "./Focus";
import {Ink} from "./Ink";
import {
    Theme, ThemeStyle, DARK_VARIANT_FOCUS_SHADE, LIGHT_VARIANT_FOCUS_SHADE, DARK_VARIANT_INK_SPILL,
    LIGHT_VARIANT_INK_SPILL, DARK_VARIANT_SWITCH_TRACK, LIGHT_VARIANT_SWITCH_TRACK, DARK_VARIANT_SWITCH_TRACK_INACTIVE,
    LIGHT_VARIANT_SWITCH_TRACK_INACTIVE
} from "./Theme";
import "./Switch.css";

export interface SwitchProps {
    /**
     * Whether the switch is turned on or off.
     */
    isToggled: boolean
}

export interface SwitchState {
    /**
     * Whether the switch is turned on or off.
     */
    isToggled: boolean
}

/**
 * Selection controls allow the user to select options. Switches
 * allow a selection to be turned on or off. Selection controls
 * use an theme’s accent color. This component adheres to Material
 * Design > Selection controls recommendations.
 */
export class Switch extends Button<SwitchProps & ComponentProps, SwitchState & ComponentState> {
    static defaultProps = {
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

    constructor(props: SwitchProps & ComponentProps) {
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
        let cls:string = "mr-switch " + this.props.className;
        if(this.props.isDisabled) {
            cls += " mr-switch--disabled";
        }
        if(this.state.isActive) {
            cls += " mr-switch--active";
        }
        if(this.state.isToggled) {
            cls += " mr-switch--toggled";
        }

        let tabIndex:number = 0;
        if(this.props.isDisabled) {
            tabIndex = -1;
        }

        let trackColor:string;
        let sliderColor:string;
        if(this.variantBase === ThemeStyle.Dark) {
            if(this.props.isDisabled) {
                trackColor = DARK_VARIANT_SWITCH_TRACK_INACTIVE;
                sliderColor = Theme.colors["grey"][800];
            }
            else {
                trackColor = this.state.isToggled ? Theme.colors[this.tint][200] : DARK_VARIANT_SWITCH_TRACK;
                sliderColor = this.state.isToggled ? Theme.colors[this.tint][200] : Theme.colors["grey"][400];
            }
        }
        else {
            if(this.props.isDisabled) {
                trackColor = LIGHT_VARIANT_SWITCH_TRACK_INACTIVE;
                sliderColor = Theme.colors["grey"][400];
            }
            else {
                trackColor = this.state.isToggled ? Theme.colors[this.tint][500] : LIGHT_VARIANT_SWITCH_TRACK;
                sliderColor = this.state.isToggled ? Theme.colors[this.tint][500] : Theme.colors["grey"][50];
            }
        }

        return (
            <div className={cls}
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
                <div className="mr-switch__track"
                     style={{backgroundColor: trackColor}}>
                </div>
                <div ref="me"
                     className="mr-switch__thumb">
                    <div className="mr-switch__slider"
                         style={{backgroundColor: sliderColor}}>
                    </div>
                    <Ink ref="ink"
                         isActive={this.state.isActive}
                         color={this.inkColor}
                         size={this.state.inkSpillSize}
                         originTop={this.state.inkOriginTop}
                         originLeft={this.state.inkOriginLeft}/>
                    <Focus isActive={this.state.isFocus}
                           color={this.focusColor}/>
                </div>
            </div>
        );
    }
}

inheritDefaultProps(Switch);