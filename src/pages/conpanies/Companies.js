import { useEffect } from "react";
import userService from "../../services/user.service";
import CompanyCard from "./Components/CompanyCard";
import { Component } from "react";
import { count } from "draft-js/lib/DefaultDraftBlockRenderMap";
class Companies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            count: 0,
            loading: true,
            error: false,
            errorMessage: "",
        };
    }

    componentDidMount() {
        this.getCompanies("", "", "", "", 0, 10);
    }

    getCompanies(search, location, category, filters, page, limit) {
        userService
            .getCompanies({ search, location, category, filters, limit, page })
            .then((data) => {
                this.setState({ companies: data.data, loading: false });
            })
            .catch((error) => {
                this.setState({ error: true, errorMessage: error.message });
            });
    }

    render() {
        const { companies, loading, error } = this.state;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;
        return (

            <div>
                <section className="pxp-page-header-simple" style={{ backgroundColor: "var(--pxpSecondaryColor)" }}>
                    <div className="pxp-container">
                        <h1>Search Companies</h1>
                        <div className="pxp-hero-subtitle pxp-text-light">Work for the best companies in the world</div>
                        <div className="pxp-hero-form pxp-hero-form-round pxp-large mt-3 mt-lg-4">
                            <form className="row gx-3 align-items-center">
                                <div className="col-12 col-lg">
                                    <div className="input-group mb-3 mb-lg-0">
                                        <span className="input-group-text"><span className="fa fa-search"></span></span>
                                        <input type="text" className="form-control" placeholder="Company Name or Keyword" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg pxp-has-left-border">
                                    <div className="input-group mb-3 mb-lg-0">
                                        <span className="input-group-text"><span className="fa fa-globe"></span></span>
                                        <input type="text" className="form-control" placeholder="Location" />
                                    </div>
                                </div>
                                <div className="col-12 col-lg pxp-has-left-border">
                                    <div className="input-group mb-3 mb-lg-0">
                                        <span className="input-group-text"><span className="fa fa-folder-o"></span></span>
                                        <select className="form-select">
                                            <option>All Industries</option>
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
                                    <button>Find Companies</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className="mt-100">
                    <div className="pxp-container">
                        <div className="pxp-companies-list-top">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto">
                                    <h2><span className="pxp-text-light">Showing</span> {this.state.count} <span className="pxp-text-light">companies</span></h2>
                                </div>
                                <div className="col-auto">
                                    <select className="form-select" defaultValue={"0"}>
                                        <option value="0" >Most relevant</option>
                                        <option value="1">Name Asc</option>
                                        <option value="2">Name Desc</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                companies.map((company) => {
                                    return (
                                        <CompanyCard key={company.users_id} company={company} />
                                    )
                                })
                            }
                        </div>


                        <div className="row mt-4 mt-lg-5 justify-content-between align-items-center">
                            <div className="col-auto">
                                <nav className="mt-3 mt-sm-0" aria-label="Companies pagination">
                                    <ul className="pagination pxp-pagination">
                                        <li className="page-item active" aria-current="page">
                                            <span className="page-link">1</span>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-auto">
                                <a href="#" className="btn rounded-pill pxp-section-cta mt-3 mt-sm-0">Show me more<span className="fa fa-angle-right"></span></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default Companies;