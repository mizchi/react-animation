"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_1 = require("react");
var raf = require("raf");
var now = require("performance-now");
var Animation = (function (_super) {
    __extends(Animation, _super);
    function Animation(props) {
        _super.call(this, props);
        this.state = {
            step: 0, playing: true
        };
        if (this.props.loop) {
            this.state.loopCount = 0;
        }
    }
    Animation.prototype.play = function (step) {
        var _this = this;
        if (step === void 0) { step = this.state.step; }
        var last = now();
        var updateCount = 0;
        var loop = function () {
            if (!_this.state.playing) {
                return;
            }
            updateCount += 1;
            if ((updateCount % _this.props.frameResolution) > 0) {
                raf(loop);
                return;
            }
            var current = now();
            var delta = current - last;
            last = current;
            var nextStep = _this.state.step + delta / _this.props.duration;
            if (nextStep >= 1 && _this.props.loop) {
                _this.setState({
                    step: Math.min(nextStep - 1, 1),
                    loopCount: _this.state.loopCount + 1
                });
                raf(loop);
            }
            else if (nextStep >= 1) {
                _this.setState({
                    step: 1
                });
            }
            else {
                _this.setState({
                    step: nextStep
                });
                raf(loop);
            }
        };
        this.setState({ step: step });
        raf(loop);
    };
    Animation.prototype.stop = function () {
        this.setState({ step: this.state.step, playing: false });
    };
    Animation.prototype.componentDidMount = function () {
        if (this.props.autoPlay) {
            this.play();
        }
    };
    Animation.prototype.render = function () {
        return this.props.children(this.props.easing(this.state.step));
    };
    Animation.defaultProps = {
        easing: function (n) { return n; },
        frameResolution: 1,
        loop: false,
        autoPlay: true
    };
    return Animation;
}(react_1.Component));
module.exports = Animation;
