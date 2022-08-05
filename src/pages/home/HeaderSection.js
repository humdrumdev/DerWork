import { useEffect } from "react";
import SearchBar from "../../Components/SearchBar";
import { useNavigate } from "react-router-dom";
const HeaderSection = () => {
    //after loading component play the video
    useEffect(() => {
        //play the video
        const video = document.getElementById('myVideo');
        // video.play();
    }, []);
    const navigate = useNavigate();
    const handleJobSearch = (e) =>{
        navigate(`/search?search=${e.search}&city=${e.city}&country=${e.country}&countryCode=${e.countryCode}&categorie=${e.categorie}`)
    }
    return (
        <section className="pxp-hero pxp-hero-bg pxp-cover" style={{backgroundImage: "url(images/hero-bg-2.jpg)"}}>
            <video autoPlay muted loop id="myVideo">
            {/* <source src="https://cdn.videvo.net/viçdevo_files/video/free/2022-03/large_watermarked/211130_03_Business_4k_037_preview.mp4" type="video/mp4"/> */}
            <source src="https://cdn.videvo.net/videvo_files/video/free/2022-03/large_watermarked/211130_03_Business_4k_037_preview.mp4" type="video/ogg" />
            Your browser does not support HTML5 video.
            </video>
            <div className="pxp-hero-opacity"></div>
            <div className="pxp-hero-caption">
                <div className="pxp-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-9 col-xxl-8">
                            <h1 className="text-white text-center">Find the right job for you</h1>
                            <div className=" pxp-large mt-4 mt-lg-5">
                            <SearchBar searchCallback={handleJobSearch} />
                            </div>
                            
                            {/* <div className="pxp-hero-form pxp-hero-form-round pxp-large mt-4 mt-lg-5">
                                <form className="row gx-3 align-items-center" action="jobs-list-1.html">
                                    <div className="col-12 col-lg">
                                        <div className="input-group mb-3 mb-lg-0">
                                            <span className="input-group-text"><span className="fa fa-search"></span></span>
                                            <input type="text" className="form-control" placeholder="Job Title or Keyword"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg pxp-has-left-border">
                                        <div className="input-group mb-3 mb-lg-0">
                                            <span className="input-group-text"><span className="fa fa-globe"></span></span>
                                            <input type="text" className="form-control" placeholder="Location"/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg pxp-has-left-border">
                                        <div className="input-group mb-3 mb-lg-0">
                                            <span className="input-group-text"><span className="fa fa-folder-o"></span></span>
                                            <select className="form-select">
                                                <option selected="">All categories</option>
                                                <option>Business Development</option>
                                                <option>Construction</option>
                                                <option>Customer Service</option>
                                                <option>Finance</option>
                                                <option>Healthcare</option>
                                                <option>Human Resources</option>
                                                <option>Marketing &amp; Communication</option>
                                                <option>Project Management</option>
                                                <option>Software Engineering</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-auto">
                                        <button>Find Jobs</button>
                                    </div>
                                </form>
                            </div> */}

                            <div className="pxp-hero-subtitle text-white text-center mt-3 mt-lg-4">Search your career opportunity through <strong>12,800</strong> jobs</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeaderSection;