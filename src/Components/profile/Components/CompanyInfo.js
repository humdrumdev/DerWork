
const CompanyInfo = ({company}) => {
    return(
        <div className="pxp-single-candidate-content">
            <h2>About {company.companyname}</h2>
                {company.description}
        </div>
    )
}

export default CompanyInfo;