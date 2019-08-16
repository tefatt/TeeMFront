import React, {Component} from 'react';

import Search from './Search'
import Video from './Video'
import InputQuestion from './InputQuestion'

class VideoSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: {},
        };
        this.videoRef = React.createRef();

    }

    getVideoData = data => {
        console.log(data);
        this.setState({videos: data, selectedVideo: data[0]})
    };
    getPlayerTime = () => {
        return this.videoRef.current.getCurrentTime();
    };

    render() {
        const videoIsSelected = !(this.state.videos === undefined || this.state.videos.length === 0);
        console.log(this.videoRef)
        return (
            <React.Fragment>
                <Search getData={this.getVideoData}/>
                <Video videos={this.state.videos} selectedVideo={this.state.selectedVideo} videoRef={this.videoRef}/>
                <div style={{
                    "display": "flex",
                    "justifyContent": "center"
                }}>
                    {videoIsSelected && <InputQuestion getPlayerTime={this.getPlayerTime}/>}
                </div>
            </React.Fragment>
        );
    }
}

export default VideoSearch;
