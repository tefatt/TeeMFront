import React, {Component} from 'react';
import { Icon } from 'antd';
import axios from 'axios'
import {parse, toSeconds} from 'iso8601-duration';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

import ReactPlayer from 'react-player'


class VideoDetail extends Component {
    state = {
        player: null,
        videoDuration: null,
        currentTime: 0,
        showMenu: false
    };


    componentDidUpdate(prevProps) {
        if (this.props.video && ( prevProps.video !== this.props.video)) {

            const ytUrl = `https://www.googleapis.com/youtube/v3/videos?id=${ this.props.video.id.videoId }&part=contentDetails&key=${ this.props.ytKey }`;
            axios.get(ytUrl).then(res => this.setState({
                videoDuration: toSeconds(parse(res.data.items[0].contentDetails.duration))
            }))
        }
        console.log(this.state.videoDuration)
    }


    inputQuestion(e) {
        console.log(e.key);
        console.log("inputQuestion");
    };

    render() {
        const video = this.props.video;

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

        return (
            <React.Fragment>
                <KeyHandler
                    keyEventName={KEYPRESS}
                    keyValue="Enter"
                    onKeyHandle={this.toggleMenu}
                />
                <div className={"embed-responsive embed-responsive-16by9"} style={this.getVideoStyle()}>
                    <ReactPlayer controls url={url} ref={this.ytPlayer}/>
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

