import * as React from "react";
import {ComponentProps, ComponentState, TintComponent, isActionKey} from "./Component";
import {Ink} from "./Ink";
import "./FlatButton.css";

/**
 * Buttons communicate the action that will occur when the user
 * touches them. This is a base class that provides 'focus' and
 * 'active' behaviour in response to user inputs.
 *
 * If you develop a new component based on this class, you should
 * adhere to recommendations for TintComponent. Additionally, your
 * component should handle 'this.state.isFocus' to display the
 * focus shade and 'this.state.isActive' to provide the 'ink spill'
 * effect. Please refer to FlatButton, IconButton or RaisedButton
 * code for the working sample code (note the appropriate event
 * handlers being wired).
 */
export abstract class Button<P extends ComponentProps, S extends ComponentState>  extends TintComponent<P, S> {
    constructor(props: ComponentProps) {
        super(props);

        this.onPressBegin = this.onPressBegin.bind(this);
        this.onPressEnd = this.onPressEnd.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onLeave = this.onLeave.bind(this);

        this.state = {
            isActive: false,
            isFocus: false
        } as S;
    }

    protected _activate(e: MouseEvent = null) {
        this.setState({
            isActive: this.state.isActive,
            isFocus: this.state.isFocus,
            inkColor: this.props.theme.elevatedPressed
        } as S);

        const root: HTMLDivElement = this.refs["me"] as HTMLDivElement;
        const ink: Ink = this.refs["ink"] as Ink;

        this.activate(root, ink ,e);
    }

    protected _deactivate() {
        const ink: Ink = this.refs["ink"] as Ink;

        this.deactivate(ink);
    }

    onPressBegin(e: MouseEvent<HTMLDivElement>) {
        if(this.props.isDisabled) {
            return;
        }

        this._activate(e);
    }

    onPressEnd() {
        if(this.props.isDisabled) {
            return;
        }

        this._deactivate();
    }

    onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        if(this.props.isDisabled || !isActionKey(e.keyCode)) {
            return;
        }

        this._activate(null);
    }

    onKeyUp() {
        if(this.props.isDisabled) {
            return;
        }

        this._deactivate();
    }

    onFocus() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: this.state.isActive,
            isFocus: true
        } as S);
    }

    onBlur() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: this.state.isActive,
            isFocus: false
        } as S);
    }

    onHover() {
        this.onFocus();
    }

    onLeave() {
        this.onBlur();
    }
}