import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, inheritDefaultProps, styles} from "./Component";
import {Focus} from "./Focus";
import {Icon} from "./Icon";
import {Ink} from "./Ink";
import {Theme, ThemeStyle, LIGHT_VARIANT_TEXT_FORE, DARK_VARIANT_TEXT_FORE} from "./Theme";
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

/**
 * Raised buttons add dimension to mostly flat layouts. They
 * emphasize functions on busy or wide spaces. This component
 * adheres to Material Design > Buttons > Raised Buttons
 * recommendations.
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
        let cls:string = "mr-floating-action-button";
        if(this.props.isDisabled) {
            cls += " mr-floating-action-button--disabled";
        }
        else {
            if(this.state.isActive) {
                cls += " mr-floating-action-button--active";
            }
            if(this.state.isToggled) {
                cls += " mr-floating-action-button--toggled";
            }
        }

        if(this.props.isMini) {
            cls += " mr-floating-action-button--mini";
        }

        let foreColor:string = this.variant === ThemeStyle.Light ? LIGHT_VARIANT_TEXT_FORE : DARK_VARIANT_TEXT_FORE;
        let backColor:string = this.tint ? Theme.colors[this.tint][500] : this.props.theme.elevatedBack;
        let tabIndex:number = 0;

        if(this.props.isDisabled) {
            foreColor = this.props.theme.disabledElevatedFore;
            backColor = this.props.theme.disabledElevatedBack;
            tabIndex = -1;
        }

        // Do not allow overriding color with un-tinted button of Light theme
        // Note: this is to avoid avoid white text on white button
        if(this.props.theme.style === ThemeStyle.Light && !this.tint) {
            foreColor = null;
        }

        console.log(this.props.children);

        const style = styles(this.props.style, {
            backgroundColor: backColor
        });

        return (
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
        );
    }
}

inheritDefaultProps(FloatingActionButton);