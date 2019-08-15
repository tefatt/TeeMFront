import React, {Component} from 'react';
import {Provider} from 'react-redux';

import VideoSearch from './Components/VideoSearch'
import PresentedQuestions from './Components/PresentedQuestions'

import store from './store'

import './App.css';
import dotenv from 'dotenv';

dotenv.config();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <VideoSearch/>
                    <div style={{
                        "display": "flex",
                        "justifyContent": "center",
                        "paddingLeft": "20px",
                        "paddingRight": "20px"
                    }}>
                        <PresentedQuestions/>
                    </div>
                </React.Fragment>
            </Provider>
        );
    }
}

export default App;
