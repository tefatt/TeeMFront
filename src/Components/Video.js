import React, {Component} from 'react';

import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

const API_KEY = "AIzaSyBIrrOQZ45NhLJX9UN8klnNrhyrlYX3QAk";

class Video extends Component {
    render() {
        console.log(this.props)
        return (<div style={{
                "display": "flex",
                "flexDirection": "row",
                "paddingLeft": "10px",
                "paddingRight": "10px",
                "justifyContent": "space-between",
            }}>
                <div style={{
                    "flex": 2,
                    "padding": "5px",
                    "border": "1px solid #efefef",
                    "height": "60vh"
                }}>
                    <VideoDetail ytKey={API_KEY} video={this.props.selectedVideo} videoRef={this.props.videoRef}/>
                </div>
                <div style={{
                    "flex": 1
                }}>
                    <VideoList
                        videos={this.props.videos}
                        onVideoSelect={(userSelected) => {
                            this.setState({selectedVideo: this.props.videos[userSelected]})
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Video