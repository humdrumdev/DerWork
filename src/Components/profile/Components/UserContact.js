
const UserContact = ({ user }) => {
    return(
        <div className="pxp-single-candidate-side-panel mt-5 mt-lg-0">
            <div>
                <div className="pxp-single-candidate-side-info-label pxp-text-light">Email</div>
                <div className="pxp-single-candidate-side-info-data">{user.email}</div>
            </div>
            <div className="mt-4">
                <div className="pxp-single-candidate-side-info-label pxp-text-light">Location</div>
                <div className="pxp-single-candidate-side-info-data">{user.city}, {user.country}</div>
            </div>
            <div className="mt-4">
                <div className="pxp-single-candidate-side-info-label pxp-text-light">Phone</div>
                <div className="pxp-single-candidate-side-info-data">{user.phone}</div>
            </div>
        </div>
    )
}

export default UserContact;