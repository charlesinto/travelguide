import { FETCH_RIDES } from "../Actions/types";

const INITIAL_STATE = {
    rides: [
        {
            id: 4,
            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010045/hiace-van-dx-gl-package-6c57.jpg',
            companyName: 'Autostar',
            carType: 'Executive',
            carCapacity: '14 seaters',
            ridePrice: '5000'
        },
        {
            id: 3,
            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010061/car-604019.jpg',
            companyName: 'Autostar',
            carType: 'Executive',
            carCapacity: '3 seaters',
            ridePrice: '5000'
        },
        {
            id: 2,
            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010045/hiace-van-dx-gl-package-6c57.jpg',
            companyName: 'Autostar',
            carType: 'Executive',
            carCapacity: '14 seaters',
            ridePrice: '5000'
        },
        {
            id: 1,
            carUrl: 'https://res.cloudinary.com/dnevwxinm/image/upload/v1558010061/car-604019.jpg',
            companyName: 'Autostar',
            carType: 'Executive',
            carCapacity: '3 seaters',
            ridePrice: '5000'
        }
    ]
}

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_RIDES:
            return { ...state }
        default:
            return state;
    }
}