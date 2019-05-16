import React from 'react';
import Slider from 'react-slick';
import Car1 from "../../../Resources/images/car1.jpg";
import Car2 from "../../../Resources/images/car2.jpg";
import BookForm from "./BookForm";

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500
    }
    return (
        <div className="landing_image_form_conatiner"
            style={{ position: 'relative' }}
        >
            <Slider
                {...settings}
            >
                <div>
                    <div className="carrousel_image"
                        style={{
                            background: `url(${Car1})`,
                            height: `${window.innerHeight}px`
                        }}
                    >
                    </div>
                </div>

                <div>
                    <div
                        className="carrousel_image"
                        style={{
                            background: `url(${Car2})`,
                            height: `${window.innerHeight}px`
                        }}
                    >
                    </div>
                </div>
            </Slider>
            <BookForm />
        </div>
    );
};

export default Carousel;