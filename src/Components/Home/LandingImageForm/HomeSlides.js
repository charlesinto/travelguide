import React, { Component } from 'react';
import Carousel from "./Carousel";
import BookForm from "./BookForm";

class HomeSlides extends Component {
    render() {
        return (
            <div >
                <div className="desktop-homepage">
                    <Carousel />
                </div>
                <div className="mobile-homepage" style={{ paddingTop: '60px', display: 'none' }}>
                    <BookForm />
                </div>
            </div>
        );
    }
}

export default HomeSlides;