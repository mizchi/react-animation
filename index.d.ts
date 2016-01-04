import { Component } from "react";
export default class Animation extends Component<{
    duration: number;
    easing?: (n: number) => number;
    frameResolution?: number;
    loop?: boolean;
    autoPlay?: boolean;
}, {
    step: number;
    playing?: boolean;
    loopCount?: number;
}> {
    static defaultProps: {
        easing(n: number): number;
        frameResolution: number;
        loop: boolean;
        autoPlay: boolean;
    };
    constructor(props: any);
    play(step?: number): void;
    stop(): void;
    componentDidMount(): void;
    render(): any;
}
