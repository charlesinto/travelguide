import React, { Component } from 'react';
import Header from "../HeaderFooter/Header";
class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;