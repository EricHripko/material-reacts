import * as React from "react";
import {Ink} from "./Ink";
import {
    Theme, ThemeStyle, DARK_VARIANT_FOCUS_SHADE, LIGHT_VARIANT_FOCUS_SHADE, DARK_VARIANT_INK_SPILL,
    LIGHT_VARIANT_INK_SPILL
} from "./Theme";

/**
 * Styles available for the text view.
 */
export enum ActionType {
    /**
     * Component does not have a specific action type.
     */
    None,
    /**
     * Component denotes primary action.
     */
    Primary,
    /**
     * Component denotes secondary action.
     */
    Secondary
}

export interface ComponentProps {
    /**
     * Whether the component has been disabled.
     */
    isDisabled?: boolean,
    /**
     * Material design theme.
     */
    theme?: Theme,
    /**
     * Custom tint for the control.
     */
    tint?: string,
    /**
     * Variant of the control (Light or Dark).
     */
    variant?: ThemeStyle,
    /**
     * Type of the action that this component denotes.
     */
    action?: ActionType,
    /**
     * Class names to be specified for the root element.
     */
    className?: string
    /**
     * Styles to be specified for the root element.
     */
    style?: Object
}

export interface ComponentState {
    /**
     * Whether the component has been activated by user input.
     */
    isActive: boolean,
    /**
     * Whether the component has been focused by user input.
     */
    isFocus: boolean,
    /**
     * Color of the ink spill.
     */
    inkColor?: string,
    /**
     * Size of the ink spill.
     */
    inkSpillSize?: Number
    /**
     * Top offset of the ink origin.
     */
    inkOriginTop?: Number,
    /**
     * Left offset of the ink origin.
     */
    inkOriginLeft?: Number
}

/**
 * Base class that describes a material component with support of
 * tinting and styling. These components can either pick their
 * settings up from 'action' attribute or via 'tint' and 'variant'
 * attributes.
 *
 * If you develop a new component based on this class, you should
 * use 'this.tint' and 'this.variant' to get the effective settings
 * for the component. You should use 'Theme.colors' for the material
 * swatches and 'this.props.theme' to fetch any default/un-styled
 * colors for the component. If your component can be disabled, use
 * 'this.prop.isDisabled' to provide the behaviour.
 */
export class TintComponent<P extends ComponentProps, S extends ComponentState> extends React.Component<P, S> {
    static contextTypes = {
        theme: React.PropTypes.object
    };
    static childContextTypes = {
        theme: React.PropTypes.object
    };

    /**
     * Gets the effective tint of the control.
     */
    public get tint(): string {
        return this.calcTintColor();
    }

    /**
     * Get theme for this control.
     */
    public get theme(): Theme {
        return this.props.theme || this.context.theme || Theme.instance;
    }

    /**
     * Gets the actual variant of the control.
     * This is to be called if 'variant' determines foreground of the control.
     */
    public get variant(): ThemeStyle {
        return this.props.variant || this.theme.toolbar;
    }

    /**
     * Gets the actual variant of the control.
     * This is to be called if 'variant' determines background of the control.
     */
    public get variantBase(): ThemeStyle {
        return this.props.variant || this.theme.style;
    }

    /**
     * Gets the effective ink color of the control.
     */
    public get inkColor() {
        return this.calcInkColor();
    }

    /**
     * Gets the effective focus color of the control.
     */
    public get focusColor(): string {
        return this.calcFocusColor();
    }

    /**
     * Calculate the default tint for this component.
     * @returns {string} Tint to be used.
     */
    public calcTintColor(): string {
        if(this.props.action === undefined) {
            return this.props.tint;
        }

        switch(this.props.action)
        {
            case ActionType.Primary:
                return this.theme.color;
            case ActionType.Secondary:
                return this.theme.accent;
        }
    }

    /**
     * Calculate the default focus color for this component.
     * @returns {string} Color of the focus shade to be used.
     */
    public calcFocusColor(): string {
        return (this.props.variant || this.theme.style) === ThemeStyle.Light
            ? LIGHT_VARIANT_FOCUS_SHADE
            : DARK_VARIANT_FOCUS_SHADE;
    }

    /**
     * Calculate the default ink color for this component.
     * @returns {string} Color of the ink spill to be used.
     */
    public calcInkColor(): string {
        if(this.tint) {
            return Theme.colors[this.tint][600];
        }

        return this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_INK_SPILL : DARK_VARIANT_INK_SPILL;
    }

    public getChildContext():any {
        return {theme: this.theme};
    }

    /**
     * Activate the component.
     * @param root DOM root of the component.
     * @param ink Ink element to create a visual cue.
     * @param e Mouse event causing the activation.
     */
    protected activate(root: Element, ink: Ink, e: MouseEvent) {
        this.setState({
            isActive: this.state.isActive
        } as S);

        const offset: ClientRect = root.getBoundingClientRect();
        const size: number = Math.max(offset.width, offset.height);

        let left: Number, top: Number;
        if(e && e.clientX && e.clientY) {
            left = e.clientX - offset.left - size / 2;
            top = e.clientY - offset.top - size / 2;
        }
        else {
            left = (offset.right - offset.left - size) / 2;
            top = (offset.bottom - offset.top - size) / 2;
        }

        this.setState({
            isActive: true,
            inkSpillSize: size,
            inkOriginTop: top,
            inkOriginLeft: left,
        } as S);

        ink.spill();
    }

    /**
     * Deactivate the component.
     * @param ink Ink element to create a visual cue.
     */
    protected deactivate(ink: Ink) {
        this.setState({
            isActive: false
        } as S);

        ink.dry(true);
    }
}

/**
 * Default properties to be inherited by every material control.
 */
const defaultProps = {
    isDisabled: false,
    className: "",
    style: {}
};

/**
 * Create the default material properties for the target control.
 * @param component Target component.
 */
export function inheritDefaultProps(component) {
    (Object as any).assign(component.defaultProps, defaultProps);
}

/**
 * Identify whether an action key was pressed or not.
 * @param keyCode Key code.
 * @returns {boolean} Whether action key was pressed or not.
 */
export function isActionKey(keyCode: number):boolean {
    return keyCode === 32 || keyCode === 13;
}

export function hex2rgb(color:string):number[] {
    color = color.replace("#", "");
    let value:number = parseInt(color, 16);

    return [value >> 16, value >> 8 & 0xFF, value & 0xFF];
}

export function hex2rgba(color:string, alpha:number):number[] {
    return hex2rgb(color).concat([alpha]);
}

export function styles<A,B>(stylesA: A, stylesB: B): A & B {
    let result: A & B = {} as (A & B);

    for (let key in stylesA) {
        result[key] = stylesA[key];
    }

    for (let key in stylesB) {
        result[key] = stylesB[key];
    }

    return result;
}