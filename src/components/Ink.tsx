import * as React from "react";
import "./Ink.css";

export interface InkProps
{
    /**
     * How big the spill should be (in pixels).
     */
    size: Number,
    /**
     * Top offset of the spill origin.
     */
    originTop: Number,
    /**
     * Left offset of the spill origin.
     */
    originLeft: Number,
    /**
     * Color of the ink.
     */
    color: string,
    /**
     * Whether the parent component is currently active.
     */
    isActive: boolean
}

export interface InkState
{
    /**
     * Whether the ink is spilling now.
     */
    isSpilling: boolean,
    /**
     * Whether the ink is drying now.
     */
    isDrying: boolean
}

const INK_ANIM_DURATION = 450;

/**
 * A component that powers 'spilling ink' effect.
 */
export class Ink extends React.Component<InkProps, InkState> {

    /**
     * Handle for animation timeout.
     * @type {number}
     * @private
     */
    private _animHandle: number = NaN;

    private get isAnimating(): boolean {
        return !isNaN(this._animHandle);
    }

    constructor(props: InkProps) {
        super(props);

        this.onAnimationEnd = this.onAnimationEnd.bind(this);
        this.state = {
            isSpilling: false,
            isDrying: false
        };
    }

    spill() {
        this.setState({
            isSpilling: true,
            isDrying: false
        });

        // Stop previous animation
        if(this.isAnimating) {
            clearTimeout(this._animHandle);
        }

        // Start a new animation
        this._animHandle = setTimeout(this.onAnimationEnd, INK_ANIM_DURATION);
    }

    dry(force: boolean = false) {
        if(this.isAnimating || (!force && this.props.isActive)) {
            return;
        }
        
        this.setState({
            isSpilling: false,
            isDrying: true
        });
    }

    onAnimationEnd() {
        this._animHandle = NaN;
        this.dry();
    }

    render() {
        let cls:string = "mr-ink";
        if(this.state.isSpilling)
            cls += " mr-ink--spilling";
        if(this.state.isDrying)
            cls += " mr-ink--drying";

        const style = {
            width: this.props.size,
            height: this.props.size,
            top: this.props.originTop,
            left: this.props.originLeft,
            backgroundColor: this.props.color
        };

        return (
            <div className={cls}
                 style={style}>
                {this.props.children}
            </div>
        );
    }
}