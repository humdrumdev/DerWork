import { useEffect,useState } from "react";

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
        
    const getPhoto =  (async (city) => {
        //get city photo from Pexels api
        const url = `https://api.pexels.com/v1/search?query=${city}&per_page=1&page=1`;
        const response = await fetch(url, {
            headers: {
                //563492ad6f91700001000001f9946f27215c40d2b3b93ba0498c6c48
                Authorization: "563492ad6f91700001000001f9946f27215c40d2b3b93ba0498c6c48"
            }
        });
        const data = await response.json();
        //return data but not as a promise;
        // console.log(data);
        if(data.photos.length > 0)
        return data.photos[0].src.tiny;
        else
        return null;
    });
    
    useEffect(() => {
        const getCities = async () => {
            //get cities from api
            const url = "https://gist.githubusercontent.com/ettouzany/8501191b645efd88a5916752174b88ec/raw/7c2683afb8a0370baf8388fbaf93e68ef4d9c192/Morocco%2520Cities%2520Database";
            const output = await fetch(url);
            const data = (await output.json());
            var promises = (await Promise.all(data.slice(0, 12).map(async (city) => {
                return {
                    name: city.city,
                    jobs: 200,
                    population: +city.population,
                    photo: await getPhoto(city.city),
                }
            }))).sort((a, b) => {
                return b.population - a.population
            });

            console.log(promises);
            setCities(promises);
            setLoading(false);

            // setCities(mapp);
        };
        getCities();
        //photo still not loaded
        // setCities(cities);
    }, []);
    


    return (
        <section className="mt-100">
            <div className="pxp-container">
                <h2 className="pxp-section-h2">Popular Cities</h2>
                <p className="pxp-text-light">Start your next carrer in a beautiful city</p>

                {
                    loading  ?
                    <div className="pxp-loader">
                        <div className="pxp-loader-inner"></div>
                    </div>
                    :
                    <div className="row mt-4 mt-md-5 pxp-animate-in pxp-animate-in-top pxp-in">
                    {/* <div className="col-12 col-md-4 col-lg-3 col-xxl-2 pxp-cities-card-1-container">
                        <a href="jobs-list-1.html" className="pxp-cities-card-1 text-center">
                            <div className="pxp-cities-card-1-top">
                                <div className="pxp-cities-card-1-image pxp-cover" style={{backgroundImage: "url(images/city-1.jpg)"}}></div>
                                <div className="pxp-cities-card-1-name">Paris, France</div>
                            </div>
                            <div className="pxp-cities-card-1-bottom">
                                <div className="pxp-cities-card-1-jobs">366 open positions</div>
                            </div>
                        </a>
                    </div> */}
                    {
                        cities.map((city, index) => {
                            console.log(city);
                            return (
                                <div className="col-12 col-md-4 col-lg-3 col-xxl-2 pxp-cities-card-1-container" key={index}>
                                    <a href="jobs-list-1.html" className="pxp-cities-card-1 text-center">
                                        <div className="pxp-cities-card-1-top">
                                            <div className="pxp-cities-card-1-image pxp-cover" style={{backgroundImage: `url(${city.photo})`}}></div>
                                            <div className="pxp-cities-card-1-name">{city.name}</div>
                                        </div>
                                        <div className="pxp-cities-card-1-bottom">
                                            <div className="pxp-cities-card-1-jobs">{city.jobs} open positions</div>
                                        </div>
                                    </a>
                                </div>

                            )
                        })
                    }
                </div>
                }

                {/* <div className="mt-4 mt-md-5 pxp-animate-in pxp-animate-in-top pxp-in">
                    <a href="jobs-list-1.html" className="btn rounded-pill pxp-section-cta">All Cities<span className="fa fa-angle-right"></span></a>
                </div> */}
            </div>
        </section>
    )
}
export default Cities;