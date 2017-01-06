import * as React from "react";
import {ComponentProps, ComponentState, TintComponent, inheritDefaultProps, styles} from "./Component";
import {
    ThemeStyle, DARK_VARIANT_CARD, LIGHT_VARIANT_CARD, DARK_VARIANT_BACKGROUND,
    LIGHT_VARIANT_BACKGROUND, DARK_VARIANT_DIVIDER, LIGHT_VARIANT_DIVIDER, Theme
} from "./Theme";
import "./Paper.css";

export interface PaperProps {
    /**
     * Whether piece of paper is a card or a tile.
     */
    isCard?: boolean,
    /**
     * Whether piece of paper is at view root or not.
     */
    isRoot?: boolean
}

/**
 * Paper may contain a photo, text, and a link about a single subject.
 * They may display content containing elements of varying size, such
 * as photos with captions of variable length. This component adheres
 * to Material Design > Cards recommendations.
 */
export class Paper extends TintComponent<PaperProps & ComponentProps, ComponentState> {
    static defaultProps = {
    };

    render() {
        let cls:string = "mr-paper " + this.props.className;
        if(this.props.isCard) {
            cls += "mr-paper--card";
        }
        if(this.props.isRoot) {
            cls += "mr-paper--root";
        }

        console.log(this.variantBase);

        let background:string = this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_CARD : DARK_VARIANT_CARD;

        // Background sheet
        if(this.props.isRoot) {
            background = this.variantBase === ThemeStyle.Light ? LIGHT_VARIANT_BACKGROUND : DARK_VARIANT_BACKGROUND;
        }
        // Tint the card if requested
        if(this.tint) {
            background = Theme.colors[this.tint][500];
        }

        const style = styles(this.props.style, {
            backgroundColor: background,
            borderColor: this.variantBase === ThemeStyle.Light ? DARK_VARIANT_DIVIDER : LIGHT_VARIANT_DIVIDER
        });

        return (
            <div className={cls}
                 style={style}>
                {this.props.children}
            </div>
        );
    }
}

inheritDefaultProps(Paper);