

const NameIndustryForm = ({ user, handleUserChange }) => {

    return (
        <div>
            <div className="row mt-4 mt-lg-5">
                <div className="col-xxl-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="companyname" className="form-label">Company Name</label>
                                <input
                                    id="companyname"
                                    name="companyname"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.companyname}
                                    type="text" className="form-control" />
                            </div>

                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="industry" className="form-label">Industry</label>
                                <input
                                    id="industry"
                                    name="industry"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.industry}
                                    type="text" className="form-control" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NameIndustryForm;