

const InformationForm = ({user,handleUserChange}) => {
    
    return (
        <div>
            <div className="row mt-4 mt-lg-5">
            <div className="col-xxl-12">
                    <div className="row">
                        <div className="col-sm-4">
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
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input
                                id="last_name"
                                name="last_name"
                                onChange={(e) => handleUserChange(e)}
                                value={user.last_name}
                                type="text" className="form-control"  />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                id="username"
                                name="username"
                                onChange={(e) => handleUserChange(e)}
                                value={user.username}
                                type="text" className="form-control"  />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-title" className="form-label">Title</label>
                                <input 
                                id="title"
                                name="title"
                                onChange={(e) => handleUserChange(e)}
                                value={user.title}

                                type="text"  className="form-control" placeholder="E.g. Web Designer"/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-location" className="form-label">Country</label>
                                <input 
                                id="country"
                                name="country"
                                onChange={(e) => handleUserChange(e)}
                                value={user.country}
                                type="tel"  className="form-control" placeholder="E.g. San Francisco, CA"/>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-location" className="form-label">City</label>
                                <input 
                                id="city"
                                name="city"
                                onChange={(e) => handleUserChange(e)}
                                value={user.city}
                                type="tel"  className="form-control" placeholder="E.g. San Francisco, CA"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-email" className="form-label">Email</label>
                                <input
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => handleUserChange(e)}
                                type="email"  className="form-control" placeholder="candidate@email.com"/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-phone" className="form-label">Phone</label>
                                <input 
                                id="phone"
                                name="phone"
                                onChange={(e) => handleUserChange(e)}
                                value={user.phone}
                                type="tel"  className="form-control" placeholder="(+12) 345 6789"/>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>

            <div className="mb-3">
                <label htmlFor="pxp-candidate-about" className="form-label">About you</label>
                <textarea 
                id="description"
                name="description"
                onChange={(e) => handleUserChange(e)}
                value={user.description}
                className="form-control" placeholder="Type your info here..."></textarea>
            </div>
        </div>
    )
}

export default InformationForm;