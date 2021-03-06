import React, {Component} from 'react';
// import  { AutoComplete, Button, Icon } from 'antd';
// const Option = AutoComplete.Option;
import SearchField from "react-search-field";

class SearchBar extends Component {

    render() {
        return (
            <SearchField
                placeholder="Search..."
                onEnter={this.props.onInput}
                onSearchClick={this.props.onInput}
            />
        );
    }
}

export default SearchBar;
