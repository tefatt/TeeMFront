import React, {Component} from 'react';
import SearchBar from './Components/SearchBar';
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';
import YTSearch from 'youtube-api-search';
import CollectionsPage from './Components/InputQuestion'

import './App.css';
import {Icon, notification} from 'antd';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = "AIzaSyBIrrOQZ45NhLJX9UN8klnNrhyrlYX3QAk";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            search: true,
            selectedVideo: {}
        };
    }

    videoSearch(term) {
        if (this.state.search) {
            YTSearch({key: API_KEY, term, part: "contentDetails"}, (data) => {
                try {
                    if (data && data.data && data.data.error.message) {
                        throw ('error')
                    }
                    this.setState({videos: data, selectedVideo: data[0]});
                    console.log(this.state.videos);
                } catch (err) {
                    notification['error']({
                        message: "Daily Limit Exceeded",
                        description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                    })
                }

            });
        }

    }


    handleInput = (value) => {
        if (value === '') {
            this.setState({videos: [], selectedVideo: null});
            return;
        }
        console.log(value);
        if (this.state.search) {
            this.videoSearch(value);
        }
    };

    render() {
        // const videoIsSelected = !(this.state.videos === undefined || this.state.videos.length === 0);
        const videoIsSelected = true;
        return (
            < React.Fragment>
                <div style={{"display": "flex", "flexDirection": "column"}}>
                    <div style={{"display": "flex", "justifyContent": "space-between", "background": "#123456"}}>
                        <h1 style={{
                            "color": "#fff",
                            "alignSelf": "center",
                            "flexBasis": "4",
                            "paddingTop": "20px",
                            "paddingLeft": "30px"
                        }}>YTSearch <Icon type={"search"}/></h1>
                        <SearchBar videos={this.state.videos} video={this.state.selectedVideo}
                                   onInput={this.handleInput}
                                   handleSearch={(video) => {
                                       this.setState({selectedVideo: this.state.videos[video], search: false})
                                   }}/>
                    </div>
                    <div style={{"display": "flex", "height": "60vh"}}>
                        <VideoDetail ytKey={API_KEY} video={this.state.selectedVideo}/>
                        <VideoList
                            videos={this.state.videos}
                            onVideoSelect={(userSelected) => {
                                this.setState({selectedVideo: this.state.videos[userSelected]})
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    "display": "flex",
                    "alignSelf": "center",
                    "paddingTop": "20px",
                    "paddingLeft": "250px"
                }}>
                    {videoIsSelected && <CollectionsPage/>}
                </div>
            </React.Fragment>

        );
    }
}

export default App;
