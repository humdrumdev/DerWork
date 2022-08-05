import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

const LocationInput = ({ callback_city, callback_country, callback_countryCode, city, country, countryCode }) => {
    const [_show, set_Show] = useState(false);
    const [show, setShow] = useState(false);

    const handleShow = () => set_Show(true);
    const handleClose = () => set_Show(false);

    const get_flag = (countryCode) => {
        return `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`;
    };
    const [_cities, set_Cities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]);
    const [loading_country, setLoading_country] = useState(false);
    const [_countries, set_Countries] = useState([]);
    const [countries, setCountries] = useState([]);
    const onChangeCity = async (value) => {
        if (_cities.length === 0 && loading == false) {
            setLoading(true);
            await axios.post(`https://countriesnow.space/api/v0.1/countries/cities`, {
                country: country,
            }).then((res) => {
                setLoading(false);
                set_Cities(res.data.data);
                //find elements in array that start with value
                const filtered = res.data.data.filter((item) => {
                    return item.toLowerCase().startsWith(value.toLowerCase());
                }
                );
                setShow(true);
                setCities(filtered);

            });
        } else {
            const filtered = _cities.filter((item) => {
                return item.toLowerCase().startsWith(value.toLowerCase());
            }
            );
            setCities(filtered);
        }

        if (value.length === 0) setCities([]);
        if (cities.find(city => city.toLowerCase() === value.toLowerCase())) {
            setCities([]);
            setShow(false);
        }
        callback_city(value);
        setShow(true);
    };
    const onChangeCountry = async (value) => {
        if (_countries.length === 0 && loading_country == false) {
            setLoading_country(true);
            // name, iso2, iso3, flag
            await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`).then((res) => {
                setLoading_country(false);
                set_Countries(res.data.data);
                //find elements in array that start with value
                const filtered = _countries.filter((item) => {
                    return item.name.toLowerCase().startsWith(value.toLowerCase());
                }
                );
                setCountries(filtered);
                setShow(true);
            });
        }
        const filtered = _countries.filter((item) => {
            return item.name.toLowerCase().startsWith(value.toLowerCase());
        }
        );
        setCountries(filtered);
        if (value.length === 0) setCountries([]);
        if (countries.find(country => country.name.toLowerCase() === value.toLowerCase())) {
            setCountries([]);
            setShow(false);
        }
        callback_country(value);
        setShow(true);
    }

    const changeContry = (country) => {
        callback_country(country.name);
        callback_countryCode(country.iso2);
        handleClose();
        set_Cities([]);
        setCities([]);
        callback_city("loading...");
        setShow(false);
        // https://countriesnow.space/api/v0.1/countries/capital

        axios.post(`https://countriesnow.space/api/v0.1/countries/capital`, {
            country: country.name,
        }).then((res) => {
            callback_city(res.data.data.capital);
        }
        );
        // onChangeCity();
    }


    return (
        <div className="input-group mb-3 mb-lg-0">
            <span className="input-group-text" style={{ borderRadius: "50% 0 0 50%", }}>
                {/* flag */}
                <button type="button"
                    onClick={handleShow}
                    className="btn btn-secondary btn-circle btn-sm d-block p-0"
                    style={{
                        backgroundSize: "cover",
                        borderRadius: "50%",
                        backgroundImage: `url(${get_flag(countryCode)})`, width: '32px', height: '32px', backgroundPosition: 'center'
                    }}>
                    <span className="sr-only">{country}</span>
                </button>

            </span>
            <input
                type="text"
                className="form-control"
                onChange={(e) => onChangeCity(e.target.value)}
                value={city}
                placeholder="Location"
            />
            <span className="auto-complete">
                {show &&
                    (
                        <ul className="list-group">
                            {
                                cities.map((city) => {
                                    return (
                                        <li key="city" className="list-group-item" style={{ cursor: "pointer" }} key={city} onClick={() => onChangeCity(city)}>
                                            <span className="pxp-autocomplete-city">{city}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>)
                }
                {
                    loading &&
                    <ul className="list-group">
                        <li className="list-group-item">
                            <div className="pxp-autocomplete-loading">
                                <span className="fa fa-spinner fa-spin"></span>
                            </div>
                        </li>
                    </ul>
                }
            </span>
            <Modal show={_show} onHide={handleClose} className="modal fade pxp-user-modal" id="pxp-signin-modal" dialogClassName="min-w-50"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span style={{ lineHeight: "3" }}>
                            Change Country
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => onChangeCountry(e.target.value)} value={country} />
                    <ul className="row p-0">
                        {
                            countries.map(({ name, iso2, iso3, flag }) => {
                                return (
                                    <div className="col-4 " key={iso2}>
                                        <button className="btn btn-secondary d-flex my-2 p-2 w-100"
                                            onClick={() => { changeContry({ name, iso2, iso3, flag }) }}
                                            style={{ lineHeight: "2", borderRadius: "100px" }} >
                                            <span className="d-block "
                                                style={{ borderRadius: "50%", backgroundImage: `url(${flag})`, minWidth: '32px', height: '32px', backgroundPosition: 'center', backgroundSize: "cover" }}>
                                            </span>
                                            <span style={{ margin: "0 8px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden " }}>{name}</span>
                                        </button>

                                    </div>
                                )
                            })
                        }
                    </ul>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default LocationInput;