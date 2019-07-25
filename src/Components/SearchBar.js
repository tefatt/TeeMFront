import React, { Component } from 'react';
// import  { AutoComplete, Button, Icon } from 'antd';
// const Option = AutoComplete.Option;
import SearchField from "react-search-field";

class SearchBar extends Component {

    state = {
      videos: []
    };

    componentDidUpdate( prevProps ) {
      if( this.props.video && prevProps.video !== this.props.video ) {
          this.setState({ videos: this.props.videos })
      }
    }

    onClick = (value, index ) => {
        console.log(value);
        let val = parseInt(index.key, 10);
        this.props.handleSearch( val );
    };

    render() {
        return(
            <div style={{ "textAlign": "center", "background": "#123456", "padding": "35px" }}>
                {/*<AutoComplete*/}
                    {/*size={"large"}*/}
                    {/*style={{ width: 400 }}*/}
                    {/*onSearch={ this.props.onChange }*/}
                    {/*placeholder="Search Video"*/}
                {/*>*/}
                <SearchField
                    placeholder="Search..."
                    onEnter={this.props.onInput}
                    onSearchClick={this.props.onInput}
                    classNames="test-class"
                />
                    {/*{ this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }*/}
                {/*</AutoComplete>*/}
                {/*<Button style={{ "marginLeft":"5px" }} size={"large"} onClick={this.onClick}><Icon type={"search"}/></Button>*/}
            </div>
        );
    }
}

export default SearchBar;
