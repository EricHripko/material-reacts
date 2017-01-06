import * as React from "react";
import {ActionType, ComponentProps, ComponentState, TintComponent, inheritDefaultProps} from "./Component";
import {
    Theme, ThemeStyle, DARK_VARIANT_TEXT_PRIMARY, LIGHT_VARIANT_TEXT_PRIMARY,
    DARK_VARIANT_TEXT_SECONDARY, LIGHT_VARIANT_TEXT_SECONDARY, DARK_VARIANT_TEXT_HINT, LIGHT_VARIANT_TEXT_HINT
} from "./Theme";
import "./TextView.css";

/**
 * Styles available for the text view.
 */
export enum TextViewStyles
{
    /**
     * Display 4.
     */
    Display4,
    /**
     * Display 3.
     */
    Display3,
    /**
     * Display 2.
     */
    Display2,
    /**
     * Display 1.
     */
    Display1,
    /**
     * Head line.
     */
    Headline,
    /**
     * Title.
     */
    Title,
    /**
     * Sub-heading.
     */
    Subheading,
    /**
     * Body 2.
     */
    Body2,
    /**
     * Body 1.
     */
    Body1,
    /**
     * Caption.
     */
    Caption,
    /**
     * Button.
     */
    Button
}

export interface TextViewProps
{
    /**
     * Appearance style for the text view.
     */
    textStyle?: TextViewStyles
    /**
     * Override the color in the text view with the given value.
     */
    customColor?: string
}

/**
 * Text view adhering to Material Design > Typography recommendations.
 */
export class TextView extends TintComponent<TextViewProps & ComponentProps, ComponentState> {
    static defaultProps = {
        textStyle: "body1",
    };

    render() {
        const cls = "mr-text-view mr-text-view--" + TextViewStyles[this.props.textStyle].toLowerCase();

        const textPrimary:string = this.variantBase === ThemeStyle.Light
            ? LIGHT_VARIANT_TEXT_PRIMARY
            : DARK_VARIANT_TEXT_PRIMARY;
        const textSecondary:string = this.variantBase === ThemeStyle.Light
            ? LIGHT_VARIANT_TEXT_SECONDARY
            : DARK_VARIANT_TEXT_SECONDARY;
        const textHint:string = this.variantBase === ThemeStyle.Light
            ? LIGHT_VARIANT_TEXT_HINT
            : DARK_VARIANT_TEXT_HINT;

        let textColor:string;
        if(this.props.isDisabled) {
            textColor = textHint;
        }
        if(this.props.customColor) {
            textColor = this.props.customColor;
        }
        else {
            // 'tint' overrides any coloring via textColor
            if (!this.props.tint) {
                // no 'tint' and 'action' means that we apply MD's recommended colors
                if (!this.props.action) {
                    switch (this.props.textStyle) {
                        default:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Display4:
                            textColor = textSecondary;
                            break;
                        case TextViewStyles.Display3:
                            textColor = textSecondary;
                            break;
                        case TextViewStyles.Display2:
                            textColor = textSecondary;
                            break;
                        case TextViewStyles.Display1:
                            textColor = textSecondary;
                            break;
                        case TextViewStyles.Headline:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Title:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Subheading:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Body2:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Body1:
                            textColor = textPrimary;
                            break;
                        case TextViewStyles.Caption:
                            textColor = textSecondary;
                            break;
                        case TextViewStyles.Button:
                            textColor = textPrimary;
                            break;
                    }
                }
                else {
                    switch (this.props.action) {
                        default:
                            textColor = textPrimary;
                            break;
                        case ActionType.Primary:
                            textColor = textPrimary;
                            break;
                        case ActionType.Secondary:
                            textColor = textSecondary;
                            break;
                    }
                }
            }
            else {
                textColor = Theme.colors[this.props.tint][500];
            }
        }

        const style = {
            color: textColor
        };

        return (
            <span className={cls} style={style}>{this.props.children}</span>
        );
    }
}

inheritDefaultProps(TextView);