import * as React from "react";
import {ComponentProps, inheritDefaultProps} from "./Component";
import {Theme} from "./Theme";
import "./Avatar.css";

export interface AvatarProps
{
    /**
     * Image to be displayed in the avatar.
     */
    source?: string
}

const AVATAR_DEFAULT_BACKGROUND:string = Theme.colors["grey"][600];

/**
 * A round picture to represent an entity: person, city etc.
 */
export class Avatar extends React.Component<AvatarProps & ComponentProps, {}> {
    static defaultProps = {
    };

    render() {
        const source: string = this.props.source;
        const tint: string = this.props.tint;
        const style = {
            backgroundImage: source ? "url(" + source + ")" : "none",
            backgroundColor: tint ? Theme.colors[tint][400] : AVATAR_DEFAULT_BACKGROUND
        };

        return (
            <div className="mr-avatar" style={style}>{this.props.children}</div>
        );
    }
}

inheritDefaultProps(Avatar);