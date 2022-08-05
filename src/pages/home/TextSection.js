import { Link } from "react-router-dom";

const TextSection = () => {
    return(
        <section className="mt-100">
            <div className="pxp-container">
                <div className="row justify-content-between align-items-center mt-4 mt-md-5">
                    <div className="col-lg-6 col-xxl-5">
                        <div className="pxp-info-fig pxp-animate-in pxp-animate-in-right pxp-in">
                            <div className="pxp-info-fig-image pxp-cover" style={{backgroundImage: "url(https://images.unsplash.com/photo-1498758536662-35b82cd15e29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80)"}}></div>
                            <div className="pxp-info-stats">
                                <div className="pxp-info-stats-item pxp-animate-in pxp-animate-bounce pxp-in animate__animated animate__bounceIn">
                                    <div className="pxp-info-stats-item-number">130<span>job offers</span></div>
                                    <div className="pxp-info-stats-item-description">in Business Development</div>
                                </div>
                                <div className="pxp-info-stats-item pxp-animate-in pxp-animate-bounce pxp-in animate__animated animate__bounceIn">
                                    <div className="pxp-info-stats-item-number">480<span>job offers</span></div>
                                    <div className="pxp-info-stats-item-description">in Marketing &amp; Communication</div>
                                </div>
                                <div className="pxp-info-stats-item pxp-animate-in pxp-animate-bounce pxp-in animate__animated animate__bounceIn">
                                    <div className="pxp-info-stats-item-number">312<span>job offers</span></div>
                                    <div className="pxp-info-stats-item-description">in Human Resources</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-xxl-6">
                        <div className="pxp-info-caption pxp-animate-in pxp-animate-in-top mt-4 mt-sm-5 mt-lg-0 pxp-in">
                            <h2 className="pxp-section-h2">Millions of jobs.<br/>Find the one that suits you.</h2>
                            <p className="pxp-text-light">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</p>
                            <div className="pxp-info-caption-list">
                                <div className="pxp-info-caption-list-item">
                                    {/* <img src="images/check.svg" alt="-"/> */}
                                    <span className="fa fa-check"></span>
                                    <span>Bring to the table win-win survival</span>
                                </div>
                                <div className="pxp-info-caption-list-item">
                                    <span className="fa fa-check"></span>
                                    <span>Capitalize on low hanging fruit to identify</span>
                                </div>
                                <div className="pxp-info-caption-list-item">
                                    <span className="fa fa-check"></span>
                                    <span>But I must explain to you how all this</span>
                                </div>
                            </div>
                            {/* <div className="pxp-info-caption-cta">
                                <a href="jobs-list-1.html" className="btn rounded-pill pxp-section-cta">Get Started Now<span className="fa fa-angle-right"></span></a>
                            </div> */}
                            <div className="pxp-info-caption-cta">
                                <Link to="/search" className="btn rounded-pill pxp-section-cta">Get Started Now<span className="fa fa-angle-right"></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TextSection;
