import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, inheritDefaultProps, hex2rgba} from "./Component";
import {Focus} from "./Focus";
import {Ink} from "./Ink";
import {TextView, TextViewStyles} from "./TextView";
import {Theme} from "./Theme";
import "./FlatButton.css";

/**
 * Flat buttons are printed on material. They do not lift, but
 * fill with color on press. This component adheres to Material
 * Design > Buttons > Flat Buttons recommendations.
 */
export class FlatButton extends Button<ComponentProps, ComponentState> {
    static defaultProps = {
    };

    public get focusColor() {
        if(this.tint) {
            return "rgba(" + hex2rgba(Theme.colors[this.tint][500], 0.12).join() + ")";
        }

        return super.calcFocusColor();
    }

    render() {
        let cls:string = "mr-flat-button";
        if(this.props.isDisabled) {
            cls += " mr-flat-button--disabled";
        }

        const color:string = this.props.isDisabled ? this.props.theme.disabledFlatFore : null;
        const tabIndex:number = !this.props.isDisabled ? 0 : -1;
        const tint:string = !this.props.isDisabled ? this.tint : null;

        return (
            <div ref="me"
                 className={cls}
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
                          tint={tint}
                          customColor={color}>
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

inheritDefaultProps(FlatButton);