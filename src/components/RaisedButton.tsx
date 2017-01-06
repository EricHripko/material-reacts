import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, inheritDefaultProps} from "./Component";
import {Focus} from "./Focus";
import {Ink} from "./Ink";
import {TextView, TextViewStyles} from "./TextView";
import {Theme, ThemeStyle, DARK_VARIANT_TEXT_PRIMARY, LIGHT_VARIANT_TEXT_PRIMARY} from "./Theme";
import "./RaisedButton.css";

/**
 * Raised buttons add dimension to mostly flat layouts. They
 * emphasize functions on busy or wide spaces. This component
 * adheres to Material Design > Buttons > Raised Buttons
 * recommendations.
 */
export class RaisedButton extends Button<ComponentProps, ComponentState> {
    static defaultProps = {
    };

    render() {
        let cls:string = "mr-raised-button";
        if(this.props.isDisabled) {
            cls += " mr-raised-button--disabled";
        }
        else if(this.state.isActive) {
            cls += " mr-raised-button--active";
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
                <TextView textStyle={TextViewStyles.Button}
                          customColor={foreColor}>
                    {this.props.children}
                </TextView>
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

inheritDefaultProps(RaisedButton);