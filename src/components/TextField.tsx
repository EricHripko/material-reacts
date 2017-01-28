import * as React from "react";
import {ComponentProps, ComponentState, TintComponent, inheritDefaultProps, styles, ActionType} from "./Component";
import {Icon} from "./Icon";
import {TextView, TextViewStyles} from "./TextView";
import {
    Theme, ThemeStyle, DARK_VARIANT_DIVIDER, LIGHT_VARIANT_DIVIDER, DARK_VARIANT_TEXT_PRIMARY,
    LIGHT_VARIANT_TEXT_PRIMARY, LIGHT_VARIANT_TEXT_SECONDARY, DARK_VARIANT_TEXT_SECONDARY
} from "./Theme";
import "./TextField.css";

const TEXT_FIELD_TINT_INVALID:string = "red";

export interface TextFieldProps {
    /**
     * Hint text is placeholder text that
     * suggests the type of information
     * requested, sometimes in the form
     * of an example.
     */
    hint: string,
    /**
     * Helper text appears below input
     * fields to provide additional context.
     */
    helper?: string,
    /**
     * Default value of the text field.
     */
    defaultValue?: string,
    /**
     * Whether the hint is floating or not.
     */
    isFloating?:boolean,
    /**
     * Icon for the text field.
     */
    icon?:string,
    /**
     * Whether this text field is multiline or not.
     */
    isMultiline?:boolean,
    /**
     * Whether to display the character counter or not.
     */
    showCounter?:boolean,
    /**
     * Type of the input.
     */
    type?:string
    /**
     * Function that performs input validation.
     */
    validationCallback?: Function
}

export interface TextFieldState {
    /**
     * Whether user-entered input is valid or not.
     */
    isInvalid:boolean,
    /**
     * Validation message to be displayed if input is invalid.
     */
    validationMessage?:string,
    /**
     * Number of lines in the text editing control.
     */
    lines:number
}

/**
 * Text fields allow users to input text, select text, and lookup data
 * via auto-completion. This component adheres to Material Design >
 * Text fields recommendations.
 */
export class TextField extends TintComponent<TextFieldProps & ComponentProps, TextFieldState & ComponentState> {
    static defaultProps = {
        type: "text"
    };

    /*
     * Note: colors below are overwritten,
     * as this component always has tinting
     * and has a special behaviour when in
     * invalid state.
     */
    public get tint() {
        if(this.state && this.state.isInvalid) {
            return TEXT_FIELD_TINT_INVALID;
        }

        return this.calcTintColor() || this.theme.accent;
    }

    constructor(props: TextFieldProps & ComponentProps) {
        super(props);

        this.onActivate = this.onActivate.bind(this);
        this.onDeactivate = this.onDeactivate.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onLeave = this.onLeave.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            isActive: false,
            isInvalid: false,
            isFocus: false,
            validationMessage: null,
            /* Text areas start with 2 lines in browsers */
            lines: this.props.isMultiline ? 2 : 1
        };
    }

    onActivate() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: true,
            isInvalid: this.state.isInvalid,
            isFocus: this.state.isFocus,
            lines: this.state.lines
        });
    }

    onDeactivate() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: false,
            isInvalid: this.state.isInvalid,
            isFocus: this.state.isFocus,
            lines: this.state.lines
        });
    }

    onHover() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: this.state.isActive,
            isInvalid: this.state.isInvalid,
            isFocus: true,
            lines: this.state.lines
        });
    }

    onLeave() {
        if(this.props.isDisabled) {
            return;
        }

        this.setState({
            isActive: this.state.isActive,
            isInvalid: this.state.isInvalid,
            isFocus: false,
            lines: this.state.lines
        });
    }

    onChange() {
        let input:HTMLInputElement = this.refs["input"] as HTMLInputElement;

        let lines:number;
        if(this.props.isMultiline) {
            let ruler: HTMLInputElement = this.refs["ruler"] as HTMLInputElement;
            ruler.style.width = window.getComputedStyle(input).width;
            ruler.value = input.value;
            lines = Math.floor(ruler.scrollHeight / 16);
        }
        else {
            lines = 1;
        }

        let message:string;
        let isInvalid:boolean;
        if(this.props.validationCallback) {
            message = this.props.validationCallback(input.value);
            isInvalid = !!message;
        }

        this.setState({
            isActive: this.state.isActive,
            isInvalid: isInvalid,
            isFocus: !!input.value,
            validationMessage: message,
            lines: lines
        });
    }

    render() {
        let input:HTMLInputElement = this.refs["input"] as HTMLInputElement;
        const isWithValue:boolean = !!(input ? input.value : this.props.defaultValue);
        const isCollapsed:boolean = this.state.isActive || isWithValue;
        const footerPresent:boolean = !!this.props.helper;

        let cls:string = "mr-text-field " + this.props.className;
        if(this.props.isDisabled) {
            cls += " mr-text-field--disabled";
        }
        if(isWithValue) {
            cls += " mr-text-field--with-value";
        }
        if(footerPresent) {
            cls += " mr-text-field--with-footer";
        }
        if(this.state.isActive) {
            cls += " mr-text-field--active";
            input.focus();
        }
        if(this.props.isFloating) {
            cls += " mr-text-field--floating";
        }
        if(this.props.icon) {
            cls += " mr-text-field--with-icon";
        }
        if(this.props.showCounter) {
            cls += " mr-text-field--with-counter";
        }
        cls += " mr-text-field--tint-" + this.tint;

        const borderDefaultColor:string = this.variantBase === ThemeStyle.Light
            ? LIGHT_VARIANT_DIVIDER
            : DARK_VARIANT_DIVIDER;
        const borderActiveColor:string = this.tint ? Theme.colors[this.tint][500] : borderDefaultColor;

        let inputColor:string = this.variantBase === ThemeStyle.Light
            ? LIGHT_VARIANT_TEXT_PRIMARY
            : DARK_VARIANT_TEXT_PRIMARY;
        if(this.props.isDisabled) {
            inputColor = this.variantBase === ThemeStyle.Light
                ? LIGHT_VARIANT_TEXT_SECONDARY
                : DARK_VARIANT_TEXT_SECONDARY;
        }

        const hintStyle:TextViewStyles = isCollapsed ? TextViewStyles.Caption : TextViewStyles.Subheading;
        const hintTint:string = this.state.isActive && this.props.isFloating ? this.tint : undefined;
        const hintDisabled:boolean = !this.state.isFocus && !this.state.isActive;

        const iconTint:string = this.state.isActive ? this.tint : undefined;

        const style = styles(this.props.style, {
            height: (this.props.isFloating ? 60 : 40) + (this.state.lines - 1) * 16 + (+footerPresent * 16)
        });

        return (
            <div className={cls}
                 style={style}

                 onClick={this.onActivate}
                 onMouseEnter={this.onHover}
                 onMouseLeave={this.onLeave}>
                <Icon className="mr-text-field__icon"
                      tint={iconTint}
                      variant={this.variantBase}
                      size={20}
                      isDisabled={this.props.isDisabled}>
                    {this.props.icon}
                </Icon>
                <textarea ref="ruler"
                          className="mr-text-field__ruler"
                          readOnly={true}/>
                {this.props.isMultiline
                    ? <textarea ref="input"
                                className="mr-text-field__value"
                                onBlur={this.onDeactivate}
                                onChange={this.onChange}
                                defaultValue={this.props.defaultValue}
                                readOnly={this.props.isDisabled}
                                style={{
                                    color: inputColor,
                                    height: 16 * this.state.lines
                                    }}/>
                    : <input ref="input"
                             className="mr-text-field__value"

                             onBlur={this.onDeactivate}
                             onChange={this.onChange}
                             defaultValue={this.props.defaultValue}
                             readOnly={this.props.isDisabled}
                             type={this.props.type}
                             style={{color: inputColor}}/>
                }
                <TextView className="mr-text-field__hint"
                          action={ActionType.Secondary}
                          textStyle={hintStyle}
                          tint={hintTint}
                          variant={this.variantBase}
                          isDisabled={hintDisabled}>
                    {this.props.hint}
                </TextView>
                <div className='mr-text-field__border-default'
                     style={{borderBottomColor: borderDefaultColor}}/>
                <div className='mr-text-field__border-active'
                     style={{borderBottomColor: borderActiveColor}}/>
                <TextView className="mr-text-field__counter"
                          textStyle={TextViewStyles.Caption}
                          variant={this.variantBase}
                          isDisabled={true}>
                    000/999
                </TextView>
                <TextView className="mr-text-field__helper"
                          textStyle={TextViewStyles.Caption}
                          action={ActionType.Secondary}
                          variant={this.variantBase}
                          isDisabled={hintDisabled}>
                    {this.state.isInvalid ? this.state.validationMessage : this.props.helper}
                </TextView>
            </div>
        );
    }
}

inheritDefaultProps(TextField);