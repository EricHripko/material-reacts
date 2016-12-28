import * as React from "react";
import {Button} from "./Button";
import {ComponentProps, ComponentState, hex2rgba, inheritDefaultProps} from "./Component";
import {Focus} from "./Focus";
import {Icon} from "./Icon";
import {Ink} from "./Ink";
import {Theme} from "./Theme";
import "./IconButton.css";

/**
 * Icon button.
 * @todo Documentation.
 */
export class IconButton extends Button<ComponentProps, ComponentState> {
    static defaultProps = {
    };

    public get focusColor() {
        if(this.tint) {
            return "rgba(" + hex2rgba(Theme.colors[this.tint][500], 0.12).join() + ")";
        }

        return super.calcFocusColor();
    }

    render() {
        let cls:string = "mr-icon-button";
        if(this.props.isDisabled) {
            cls += " mr-icon-button--disabled";
        }

        const tabIndex:number = !this.props.isDisabled ? 0 : -1;

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
                <Icon tint={this.tint}>{this.props.children}</Icon>
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

inheritDefaultProps(IconButton);