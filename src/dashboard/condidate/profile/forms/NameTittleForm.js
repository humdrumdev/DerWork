

const NameTittleForm = ({ user, handleUserChange }) => {

    return (
        <div>
            <div className="row mt-4 mt-lg-5">
                <div className="col-xxl-12">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.first_name}
                                    type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.last_name}
                                    type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.title}

                                    type="text" className="form-control" placeholder="E.g. Web Designer" />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">City</label>
                                <input
                                    id="city"
                                    name="city"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.city}

                                    type="text" className="form-control" placeholder="E.g. Web Designer" />
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input
                                    id="country"
                                    name="country"
                                    onChange={(e) => handleUserChange(e)}
                                    value={user.country}

                                    type="text" className="form-control" placeholder="E.g. Web Designer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NameTittleForm;