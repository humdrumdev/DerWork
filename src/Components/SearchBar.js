import { useState, useEffect } from "react";
import categorieService from "../services/categories.service";
import useGeo from "../hooks/useGeo";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Spinner } from "react-bootstrap";
import LocationInput from "./LocationInput";
// const CATEGORIES = ["Business Development", "Construction", "Customer Service", "Education", "Engineering", "Finance", "Healthcare", "Human Resources", "Information Technology", "Legal", "Manufacturing", "Marketing", "Operations", "Retail", "Sales", "Support", "Technical Support", "Other"];
const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [categorie, setcategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [countryCode, setCountryCode] = useState("");
  const { _city, _country, _countryCode } = useGeo();



  useEffect(() => {
    categorieService.getCategories().then(res => {
      setCategories(res.data);
    });
    setCity(_city);
    setCountry(_country);
    setCountryCode(_countryCode);
    console.log(props);
    if(props.search)
       setSearch(props.search);
    if(props.city)
        setCity(props.city);
    if(props.country)
        setCountry(props.country);
    if(props.countryCode)
        setCountryCode(props.countryCode);
    if(props.categorie)
        setcategorie(props.categorie);
  }, [_city]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(search, city, countryCode, categorie);
    props.searchCallback({ search, city, country, countryCode, categorie });
  };





  return (
    <div className="pxp-hero-form pxp-hero-form-round pxp-large pxp-has-border mt-3 mt-lg-4">
      <form onSubmit={handleSearchSubmit} className="row gx-3 align-items-center" >
        <div className="col-12 col-lg">
          <div className="input-group mb-lg-s0">
            <span className="input-group-text">
              <span className="fa fa-search"></span>
            </span>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Job Title or Keyword"
            />
          </div>
        </div>
        <div className="col-12 col-lg pxp-has-left-border">
          <LocationInput callback_city={(city) => setCity(city)} callback_country={(country) => setCountry(country)}
            callback_countryCode={(countryCode) => setCountryCode(countryCode)} city={city} country={country} countryCode={countryCode} />

        </div>
        <div className="col-12 col-lg pxp-has-left-border">
          <div className="input-group mb-3 mb-lg-0">
            <span className="input-group-text">
              <span className="fa fa-folder-o"></span>
            </span>
            <select
              className="form-select"
              onBlur={(e) => setcategorie(e.target.value)}
              onChange={(e) => setcategorie(e.target.value)}
              value={categorie}
            >
              <option value="" key="">
                All categories
              </option>
              {categories ? categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                );
              }) : null}
            </select>
          </div>
        </div>
        <div className="col-12 col-lg-auto">
          <button type="submit">Find Jobs</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
