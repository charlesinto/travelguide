import React, { Component } from 'react';
import Header from "../HeaderFooter/Header";
import ModalController from "../ModalController";
import Footer from "../HeaderFooter/Footer";
class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <ModalController />
                <Footer />
            </div>
        );
    }
}

export default Layout;