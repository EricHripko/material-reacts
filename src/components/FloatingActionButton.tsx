import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, inheritDefaultProps, styles} from "./Component";
import {Focus} from "./Focus";
import {Icon} from "./Icon";
import {Ink} from "./Ink";
import {Theme, ThemeStyle, DARK_VARIANT_TEXT_PRIMARY, LIGHT_VARIANT_TEXT_PRIMARY} from "./Theme";
import "./FloatingActionButton.css";

export interface FloatingActionButtonProps {
    /**
     * Icon to be shown in the button.
     */
    icon: string,
    /**
     * Icon to be shown when the button is toggled.
     */
    iconToggled?: string,
    /**
     * Whether the button is mini or full-sized.
     */
    isMini?: boolean
}

export interface FloatingActionButtonState {
    /**
     * Whether button is toggled or not.
     */
    isToggled: boolean
}

const CSS_CLASS_NAME:string = "mr-floating-action-button__button";

/**
 * A floating action button represents the primary action in
 * an application. This component adheres to Material Design >
 * Buttons > Floating Action Button recommendations.
 */
export class FloatingActionButton extends Button<FloatingActionButtonProps & ComponentProps,
                                                 FloatingActionButtonState & ComponentState> {
    static defaultProps = {
        isMini: false
    };

    constructor(props: ComponentProps) {
        super(props);

        this.state = {
            isActive: false,
            isFocus: false,
            isToggled: false
        };
    }

    protected _deactivate() {
        super._deactivate();

        if(!this.props.iconToggled) {
            return;
        }

        this.setState({
            isActive: false,
            isFocus: this.state.isFocus,
            isToggled: !this.state.isToggled
        })
    }

    render() {
        let cls:string = CSS_CLASS_NAME;
        if(this.props.isDisabled) {
            cls += " " + CSS_CLASS_NAME + "--disabled";
        }
        else {
            if(this.state.isActive) {
                cls += " " + CSS_CLASS_NAME + "--active";
            }
            if(this.state.isToggled) {
                cls += " " + CSS_CLASS_NAME + "--toggled";
            }
        }

        if(this.props.isMini) {
            cls += " " + CSS_CLASS_NAME + "--mini";
        }

        let foreColor:string = this.variant === ThemeStyle.Light
            ? LIGHT_VARIANT_TEXT_PRIMARY
            : DARK_VARIANT_TEXT_PRIMARY;
        let backColor:string = this.tint ? Theme.colors[this.tint][500] : this.theme.elevatedBack;
        let tabIndex:number = 0;

        if(this.props.isDisabled) {
            foreColor = this.theme.disabledElevatedFore;
            backColor = this.theme.disabledElevatedBack;
            tabIndex = -1;
        }

        // Do not allow overriding color with un-tinted button of Light theme
        // Note: this is to avoid avoid white text on white button
        if(this.theme.style === ThemeStyle.Light && !this.tint) {
            foreColor = null;
        }

        const style = {
            backgroundColor: backColor
        };
        let rootCls:string = "mr-floating-action-button";
        if(this.props.isMini) {
            rootCls += " mr-floating-action-button--mini";
        }
        if(this.state.isToggled) {
            rootCls += " mr-floating-action-button--toggled";
        }

        return (
            <div className={rootCls}
                 style={this.props.style}>
                <div ref="me"
                     className={cls}
                     style={style}
                     tabIndex={tabIndex}

                     onMouseDown={this.onPressBegin}
                     onMouseUp={this.onPressEnd}
                     onKeyDown={this.onKeyDown}
                     onKeyUp={this.onKeyUp}
                     onFocus={this.onFocus}
                     onBlur={this.onBlur}
                     onMouseEnter={this.onHover}
                     onMouseLeave={this.onLeave}>
                    <Icon className="mr-floating-action-button__icon"
                          customColor={foreColor}>{this.props.icon}</Icon>
                    <Icon className="mr-floating-action-button__iconToggled"
                          customColor={foreColor}>{this.props.iconToggled}</Icon>
                    <Ink ref="ink"
                         isActive={this.state.isActive}
                         color={this.inkColor}
                         size={this.state.inkSpillSize}
                         originTop={this.state.inkOriginTop}
                         originLeft={this.state.inkOriginLeft}/>
                    <Focus isActive={this.state.isFocus}
                           color={this.focusColor}/>
                </div>
                {this.props.children}
                <div className="mr-floating-action-button__wash"></div>
            </div>
        );
    }
}

inheritDefaultProps(FloatingActionButton);