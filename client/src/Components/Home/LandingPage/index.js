import React, { Component } from 'react';
import TrackImage from "../../../Resources/images/track.jpg";
import BookForm from "../LandingImageForm/BookForm";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <div className="thmb-page">
                    <div
                        style={{
                            background: `url(${TrackImage})`,
                            backgroundSize: 'cover',
                            width: '100%',
                            height: '100%',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}

                    />
                </div>

                <section className="main" id="main-one">
                    <h2 className="title">Book Your Next Trip</h2>
                    <div className="form-manin">
                        <div className="book-form-main">
                            <BookForm />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LandingPage;