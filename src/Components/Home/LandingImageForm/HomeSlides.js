import React, { Component } from 'react';
import Carousel from "./Carousel";
import BookForm from "./BookForm";

class HomeSlides extends Component {
    render() {
        return (
            <div>
                <Carousel />
                <BookForm />
            </div>
        );
    }
}

export default HomeSlides;