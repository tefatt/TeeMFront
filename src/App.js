import React, {Component} from 'react';
import {Provider} from 'react-redux';

import MainContainer from './container/MainContainer'

import store from './store'

import './App.css';
import dotenv from 'dotenv';

dotenv.config();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <MainContainer/>
                </React.Fragment>
            </Provider>
        );
    }
}

export default App;
