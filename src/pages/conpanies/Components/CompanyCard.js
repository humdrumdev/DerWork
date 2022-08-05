import { Link } from "react-router-dom";
// job_count: "0"
// users_companyname: "Edoc"
// users_description: null
// users_id: 1
// users_industry: "test"
// users_photo:
const CompanyCard = ({ company }) => {
    return (
        <Link to={`/${company.users_id}`}
            className="col-md-6 col-xl-4 col-xxl-3 pxp-companies-card-1-container">
            <div className="pxp-companies-card-1 pxp-has-border">
                <div className="pxp-companies-card-1-top">
                    <span className="pxp-companies-card-1-company-logo" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + company.users_photo})` }}></span>
                    <span className="pxp-companies-card-1-company-name">{company.users_companyname}</span>
                    <div className="pxp-companies-card-1-company-description pxp-text-light">{company.users_description}</div>
                </div>
                <div className="pxp-companies-card-1-bottom">
                    <span className="pxp-companies-card-1-company-jobs">{company.job_count} jobs</span>
                </div>
            </div>
        </Link>
    );
}
export default CompanyCard;