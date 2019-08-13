import React, {Component} from 'react';
import {Provider} from 'react-redux';


import SearchBar from './Components/SearchBar';
import VideoList from './Components/VideoList';
import VideoDetail from './Components/VideoDetail';
import YTSearch from 'youtube-api-search';
import InputQuestion from './Components/InputQuestion'
import PresentedQuestions from './Components/PresentedQuestions'

import store from './store'

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
            selectedVideo: {},
        };
        this.videoRef = React.createRef();
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
            return;
        }
        if (this.state.search) {
            this.videoSearch(value);
        }
    };

    getPlayerTime = () => {
        console.log(this.videoRef)
        return this.videoRef.current.getTimeThatPassed();
    };

    render() {
        const videoIsSelected = !(this.state.videos === undefined || this.state.videos.length === 0);
        return (
            <Provider store={store}>
                <React.Fragment>
                    <div style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "alignItems": "center",
                        "background": "#123456",
                        "paddingLeft": "30px",
                        "paddingRight": "30px",
                        "justifyContent": "space-between",
                    }}>
                        <h1 style={{
                            "color": "#fff",
                            "paddingTop": "20px",
                        }}>Search <Icon type={"search"}/></h1>
                        <SearchBar videos={this.state.videos} video={this.state.selectedVideo}
                                   onInput={this.handleInput}
                                   handleSearch={(video) => {
                                       this.setState({selectedVideo: this.state.videos[video], search: false})
                                   }}
                                   style={{
                                       "width": "35%",
                                       "display": "inline-flex",
                                   }}
                        />
                    </div>
                    <div style={{
                        "display": "flex",
                        "flexDirection": "row",
                        "paddingLeft": "10px",
                        "paddingRight": "10px",
                        "justifyContent": "space-between",
                    }}>
                        <div style={{
                            "flex":2,
                            "padding": "5px",
                            "border": "1px solid #efefef",
                            "height": "70vh"
                        }}>
                            <VideoDetail ytKey={API_KEY} video={this.state.selectedVideo} ref={this.videoRef}/>
                        </div>
                        <div style={{
                            "flex":1
                        }}>
                            <VideoList
                                videos={this.state.videos}
                                onVideoSelect={(userSelected) => {
                                    this.setState({selectedVideo: this.state.videos[userSelected]})
                                }}
                            />
                        </div>
                    </div>
                    <div style={{
                        "display": "inline-flex",
                    }}>
                        {videoIsSelected && <InputQuestion getPlayerTime={this.getPlayerTime}/>}
                    </div>
                    <div style={{
                        "display": "inline-flex",
                    }}>
                        <PresentedQuestions/>
                    </div>
            </React.Fragment>
            </Provider>
        );
    }
}

export default App;
