import React, {Component} from 'react';
// import  { AutoComplete, Button, Icon } from 'antd';
// const Option = AutoComplete.Option;
import SearchField from "react-search-field";

class SearchBar extends Component {

    state = {
        videos: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.video && prevProps.video !== this.props.video) {
            this.setState({videos: this.props.videos})
        }
    }

    render() {
        return (
            <SearchField
                placeholder="Search..."
                onEnter={this.props.onInput}
                onSearchClick={this.props.onInput}
                classNames="test-class"
            />
        );
    }
}

export default SearchBar;
