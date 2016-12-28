import * as React from "react";
import {ComponentProps, inheritDefaultProps} from "./Component";
import {Theme} from "./Theme";
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

/**
 * Pre-defined colors available for the text view.
 */
export enum TextViewColors
{
    /**
     * Primary color.
     * Used for main information on the screen.
     */
    Primary,
    /**
     * Secondary color.
     * Used for additional information on the screen.
     */
    Secondary,
    /**
     * Disabled color.
     * Used for inactive controls and text.
     */
    Disabled
}

export interface TextViewProps
{
    /**
     * Appearance style for the text view.
     */
    textStyle?: TextViewStyles,
    /**
     * Default color for the text view.
     */
    textColor?: TextViewColors,
    /**
     * Override the color in the text view with the given value.
     */
    customColor?: string
}

/**
 * Text view adhering to Material Design > Typography recommendations.
 */
export class TextView extends React.Component<TextViewProps & ComponentProps, {}> {
    static defaultProps = {
        textStyle: "body1",
    };

    render() {
        const cls = "mr-text-view mr-text-view--" + TextViewStyles[this.props.textStyle].toLowerCase();

        let textColor:string;
        if(this.props.customColor) {
            textColor = this.props.customColor;
        }
        else {
            // 'tint' overrides any coloring via textColor
            if (!this.props.tint) {
                // no 'tint' and 'textColor' means that we apply MD's recommended colors
                if (!textColor) {
                    switch (this.props.textStyle) {
                        default:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Display4:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewStyles.Display3:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewStyles.Display2:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewStyles.Display1:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewStyles.Headline:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Title:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Subheading:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Body2:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Body1:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewStyles.Caption:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewStyles.Button:
                            textColor = this.props.theme.text;
                            break;
                    }
                }
                else {
                    switch (this.props.textColor) {
                        default:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewColors.Primary:
                            textColor = this.props.theme.text;
                            break;
                        case TextViewColors.Secondary:
                            textColor = this.props.theme.textSecondary;
                            break;
                        case TextViewColors.Disabled:
                            textColor = this.props.theme.textHint;
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