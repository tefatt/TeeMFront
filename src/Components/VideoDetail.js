import React, {Component} from 'react';
import {Icon} from 'antd';
import {parse, toSeconds} from 'iso8601-duration';
import ReactPlayer from 'react-player'

const VideoDetail = ({video, videoRef}) => {
    console.log(videoRef)
    if (!video.id) {
        return (
            <div style={{
                "background": "#999999",
                "color": "#fff",
            }}>
                <h1 style={{"top": "38%", "left": "28%", "position": "absolute"}}><Icon type={"youtube"}/></h1>
            </div>
        )
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${ videoId }`;
    return (
        <React.Fragment>
            <div style={{"position": "relative", "paddingTop": "65%"}}>
                <ReactPlayer controls
                             width='100%'
                             height='100%'
                             url={url}
                             ref={videoRef}
                             // playing={isPlaying}
                             style={{
                                 "position": "absolute",
                                 "top": 0,
                                 "left": 0
                             }}/>
            </div>
            <div>
                <h3>
                    {video.snippet.title}
                </h3>
            </div>
        </React.Fragment>
    )
};

export default VideoDetail;

