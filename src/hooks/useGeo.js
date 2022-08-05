//useGeo hook is a hook that is called when the user enter the app and it returns the user's location or it sets the default location to the user's location to session storage
import { useState, useEffect } from 'react';

const useGeo = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function getCurrentCity() {

        const geo = localStorage.getItem('geo');
        if (geo) {
            setUserLocation(JSON.parse(geo));
            setLoading(false);
            return;
        }
        const axios = require("axios");

        const options = {
            method: 'GET',
            url: 'http://ip-api.com/json/',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios(options)
            .then(function (response) {
                setUserLocation(response.data);
                localStorage.setItem('geo', JSON.stringify({ 'city': response.data.city, 'country': response.data.country, 'countryCode': response.data.countryCode }));
                setLoading(false);
            }
            )
    }

    useEffect(() => {
        getCurrentCity();
    }, []);

    return { _city: userLocation ? userLocation.city : '', _country: userLocation ? userLocation.country : '', _countryCode: userLocation ? userLocation.countryCode : '' };
}

export default useGeo;