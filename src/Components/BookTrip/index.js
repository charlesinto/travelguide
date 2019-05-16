import React, { Component } from 'react';
import { Card } from "../Common";
class index extends Component {
    render() {
        return (
            <div>
                <div className="book_order_details">
                    <Card
                        rideDetail={{
                            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010045/hiace-van-dx-gl-package-6c57.jpg',
                            companyName: 'Autostar',
                            carType: 'Executive',
                            carCapacity: '14 seaters',
                            ridePrice: '5000'
                        }}
                    />
                    <Card
                        rideDetail={{
                            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010061/car-604019.jpg',
                            companyName: 'Autostar',
                            carType: 'Executive',
                            carCapacity: '3 seaters',
                            ridePrice: '5000'
                        }}
                    />
                    <Card
                        rideDetail={{
                            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010045/hiace-van-dx-gl-package-6c57.jpg',
                            companyName: 'Autostar',
                            carType: 'Executive',
                            carCapacity: '14 seaters',
                            ridePrice: '5000'
                        }}
                    />
                    <Card
                        rideDetail={{
                            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010061/car-604019.jpg',
                            companyName: 'Autostar',
                            carType: 'Executive',
                            carCapacity: '3 seaters',
                            ridePrice: '5000'
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default index;