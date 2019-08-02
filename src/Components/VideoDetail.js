import React, {Component} from 'react';
import {Icon} from 'antd';
import axios from 'axios'
import {parse, toSeconds} from 'iso8601-duration';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

import ReactPlayer from 'react-player'


class VideoDetail extends Component {
    state = {
        showMenu: false,
        isPlaying: true,
    };

    constructor(props) {
        super(props);
        this.ytPlayer = React.createRef();
    }

    getTimeThatPassed = () => {
        console.log(this.state.isPlaying)
        this.setState({isPlaying: false});
        return this.ytPlayer.current.getCurrentTime()
    };

    render() {
        const video = this.props.video;
        const {isPlaying} = this.state;
        console.log(isPlaying)
        if (!video.id) {
            return (
                <div style={{
                    "width": "67.5%",
                    "background": "#999999",
                    "color": "#fff",
                    "postion": "relative"
                }}>
                    <h1 style={{"top": "38%", "left": "28%", "position": "absolute"}}><Icon type={"youtube"}/></h1>
                </div>
            )
        }
        const videoId = video.id.videoId;
        const url = `https://www.youtube.com/embed/${ videoId }`;

        // let time = this.ytPlayer.getCurrentTime();
        return (
            <React.Fragment>
                <KeyHandler
                    keyEventName={KEYPRESS}
                    keyValue="Enter"
                    onKeyHandle={this.toggleMenu}
                />
                <div className={"embed-responsive embed-responsive-16by9"} style={this.getVideoStyle()}>
                    <ReactPlayer controls url={url} ref={this.ytPlayer} playing={isPlaying}/>
                    <div>
                        <h2>
                            {this.props.video.snippet.title}
                        </h2>
                        <div>
                            {this.props.video.snippet.description}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    toggleMenu = (event) => {
        event.preventDefault();
        this.setState({showMenu: !this.state.showMenu});
    };

    getVideoStyle = () => {
        return {
            zIndex: (this.state.showMenu) ? -1 : 1,
            position: "relative",
            opacity: (this.state.showMenu) ? 0.3 : 1
        }
    };

    getMeuStyle = () => {
        return {
            zIndex: (this.state.showMenu) ? 1 : -1,
            position: "relative",
        }
    };
}

export default VideoDetail;

