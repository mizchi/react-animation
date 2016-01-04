import {Component} from "react";
var raf: any = require("raf");
var now: any = require("performance-now");
class Animation extends Component<{
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
  static defaultProps = {
    easing(n: number) {return n;},
    frameResolution: 1,
    loop: false,
    autoPlay: true
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 0, playing: true
    };
    if (this.props.loop) {
      this.state.loopCount = 0;
    }
  }

  play(step = this.state.step) {
    let last = now();
    let updateCount = 0;

    const loop = () => {
      if (!this.state.playing) {
        return;
      }

      updateCount += 1;

      if ((updateCount % this.props.frameResolution) > 0) {
        raf(loop);
        return;
      }

      let current = now();
      let delta = current - last;
      last = current;
      let nextStep = this.state.step + delta / this.props.duration;
      if (nextStep >= 1 && this.props.loop) {
        this.setState({
          step: Math.min(nextStep - 1, 1),
          loopCount: this.state.loopCount + 1
        });
        raf(loop);
      } else if (nextStep >= 1) {
        this.setState({
          step: 1
        });
      } else {
        this.setState({
          step: nextStep
        });
        raf(loop);
      }
    }
    this.setState({step});
    raf(loop);
  }

  stop() {
    this.setState({step: this.state.step, playing: false});
  }

  componentDidMount(){
    if (this.props.autoPlay) {
      this.play();
    }
  }

  render() {
    return (this.props as any).children(this.props.easing(this.state.step));
  }
}
module.exports = Animation
