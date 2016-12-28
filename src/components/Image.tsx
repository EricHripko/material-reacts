import * as React from "react";
import {ComponentProps, inheritDefaultProps} from "./Component";
import {Theme} from "./Theme";
import "./Image.css";

export interface ImageProps
{
    /**
     * Image to be displayed once loaded.
     */
    source?: string,
    /**
     * Width of the component.
     */
    width: Number,
    /**
     * Height of the component.
     */
    height: Number
}

export interface ImageState
{
    /**
     * Image currently displayed.
     */
    source?: string
}

const IMAGE_DEFAULT_BACKGROUND:string = Theme.colors["grey"][400];

/**
 * A round picture to represent an entity: person, city etc.
 */
export class Image extends React.Component<ImageProps & ComponentProps, ImageState> {
    static defaultProps = {
    };

    private _loader: HTMLImageElement;

    constructor(props: ImageProps) {
        super(props);

        this.onContentLoaded = this.onContentLoaded.bind(this);
        this._loader = document.createElement("img");
        this._loader.addEventListener("load", this.onContentLoaded);

        this.state = {};
    }

    /**
     * Load the content in the background.
     * @param source Url of the image to be loaded.
     */
    loadContent(source: string) {
        this._loader.src = source;
    }

    /**
     * Event handler for when loading has finished,
     * displays the content in the UI.
     */
    onContentLoaded() {
        this.setState({
            source: this._loader.src
        });
    }

    render() {
        if(this.props.source !== this.state.source)
        {
            this.loadContent(this.props.source);
        }

        const tint: string = this.props.tint;
        const containerStyle = {
            backgroundColor: tint ? Theme.colors[tint][400] : IMAGE_DEFAULT_BACKGROUND,
            width: this.props.width,
            height: this.props.height
        };

        const source: string = this.state.source;
        const contentStyle = {
            backgroundImage: source ? "url(" + source + ")" : "none"
        };
        let contentClass: string = "mr-image mr-image__content";
        if(source)
        {
            contentClass += " mr-image__content--show";
        }

        return (
            <div className="mr-image" style={containerStyle}>
                <div className={contentClass} style={contentStyle}></div>
            </div>
        );
    }
}

inheritDefaultProps(Image);