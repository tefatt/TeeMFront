import React, {Component} from 'react';

import SearchBar from './SearchBar';
import YTSearch from 'youtube-api-search-promise';
import {Icon, notification} from 'antd';


const API_KEY = "AIzaSyBIrrOQZ45NhLJX9UN8klnNrhyrlYX3QAk";


class Search extends Component {

    handleInput = term => {
        if (term === '') return;
        YTSearch({key: API_KEY, term, part: "contentDetails"}).then(data => {
            this.props.getData(data)
        }).catch(error => {
            notification['error']({
                message: "Daily Limit Exceeded",
                description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
            })
        })
    };

    render() {
        return (
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
                    <SearchBar onInput={this.handleInput}
                               style={{
                                   "width": "35%",
                                   "display": "inline-flex",
                               }}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Search