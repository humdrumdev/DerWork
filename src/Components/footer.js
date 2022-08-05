import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Footer = () => {

    return (
        <footer className="pxp-main-footer mt-100">

            <div className="pxp-main-footer-top pt-100 pb-100" style={{ backgroundColor: "var(--pxpMainColorLight)" }}>
                <div className="pxp-container">
                    <div className="row">
                        <div className="col-lg-6 col-xl-5 col-xxl-4 mb-4">
                            <div className="pxp-footer-logo">
                                {/* <a href="index.html" className="pxp-animate"><span style={{ color: "var(--pxpMainColor)" }}>Der</span>Work</a> */}
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="pxp-footer-section mt-3 mt-md-4">
                                <h3>Call us</h3>
                                <div className="pxp-footer-phone">(123) 456-7890</div>
                            </div>
                            <div className="mt-3 mt-md-4 pxp-footer-section">
                                <div className="pxp-footer-text">
                                    90 Fifth Avenue, 3rd Floor<br />
                                    San Francisco, CA 1980<br />
                                    office@derwork.com
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-7 col-xxl-8">
                            <div className="row">
                                <div className="col-md-6 col-xl-4 col-xxl-3 mb-4">
                                    <div className="pxp-footer-section">
                                        <h3>For Candidates</h3>
                                        <ul className="pxp-footer-list">
                                            <li><Link to="/search" >Find Jobs</Link></li>
                                            <li><Link to="/companies" >Find Companies</Link></li>
                                            <li><Link to="/resume" >Create Resume</Link></li>
                                            <li><Link to="/login" >Login</Link></li>
                                            <li><Link to="/register" >Register</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-4 col-xxl-3 mb-4">
                                    <div className="pxp-footer-section">
                                        <h3>For Employers</h3>
                                        <ul className="pxp-footer-list">
                                            <li><Link to="/post-job" >Post a Job</Link></li>
                                            <li><Link to="/companies" >Find Companies</Link></li>
                                            <li><Link to="/login" >Login</Link></li>
                                            <li><Link to="/register" >Register</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-4 col-xxl-3 mb-4">
                                    <div className="pxp-footer-section">
                                        <h3>About Us</h3>
                                        <ul className="pxp-footer-list">
                                            <li><Link to="/about" >About Us</Link></li>
                                            <li><Link to="/contact" >Contact Us</Link></li>
                                            <li><Link to="/privacy" >Privacy Policy</Link></li>
                                            <li><Link to="/terms" >Terms & Conditions</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-4 col-xxl-3 mb-4">
                                    <div className="pxp-footer-section">
                                        <h3>Helpful Resources</h3>
                                        <ul className="pxp-footer-list">
                                            <li><Link to="/faq" >FAQ</Link></li>
                                            <li><Link to="/blog" >Blog</Link></li>
                                            <li><Link to="/careers" >Careers</Link></li>
                                            <li><Link to="/support" >Support</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pxp-main-footer-bottom" style={{ backgroundColor: "var(--pxpSecondaryColor)" }}>
                <div className="pxp-container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-auto">
                            <div className="pxp-footer-copyright pxp-text-light">© 2021 DerWork. All Right Reserved.</div>
                        </div>
                        <div className="col-lg-auto">
                            <div className="pxp-footer-social mt-3 mt-lg-0">
                                <ul className="list-unstyled">
                                    <li><a href="/"><span className="fa fa-facebook"></span></a></li>
                                    <li><a href="/"><span className="fa fa-twitter"></span></a></li>
                                    <li><a href="/"><span className="fa fa-instagram"></span></a></li>
                                    <li><a href="/"><span className="fa fa-linkedin"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer;