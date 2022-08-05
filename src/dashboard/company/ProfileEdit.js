
import authService from "../../services/auth/auth.service";
import Croppie from "croppie";
import * as React from "react"

const ProfileEdit = () => {

    const [image, setImage] = React.useState("")
    const [croppie, setCroppie] = React.useState(null)

    function handleImage(image) {
        console.log(image)
        setImage(image)
        const el = document.getElementById("image-helper")
        console.log(el)
        if (el) {
            const croppieInstance = new Croppie(el, {
                enableExif: true,
                viewport: {
                    height: 250,
                    width: 250,
                },
                boundary: {
                    height: 280,
                    width: 400,
                }
            });

            croppieInstance.bind({
                url: image,
            });
            setCroppie(croppieInstance)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (croppie !== null) {
            croppie.result({
                type: 'base64',
                size: {
                    width: 480,
                    height: 480
                }
            }).then((blob) => {
                console.log(blob)
            }
            )
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Your image upload functionality here */}

                {image === "" && (
                    //  <ImageUpload image={image} setImage={handleImage} />
                    <span onClick={() => handleImage("https://lh3.googleusercontent.com/a-/AOh14GhDGviSQfClhU35GXHymyJwSFvbig8sOIKKIyW5-w=s96-c")}>click</span>
                )}

                <div id="image-helper"></div>

                <button color="primary" variant="contained" type="submit">
                    Submit
                </button>
            </form>

            <h1>Edit Profile</h1>
            <p className="pxp-text-light">Edit your company profile page info.</p>

            <form>
                <div className="row mt-4 mt-lg-5">
                    <div className="col-xxl-8">
                        <div className="mb-3">
                            <label htmlFor="pxp-company-name" className="form-label">Company name</label>
                            <input type="text" id="pxp-company-name" className="form-control" placeholder="Add company name" />
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="pxp-company-email" className="form-label">Email</label>
                                    <input type="email" id="pxp-company-email" className="form-control" placeholder="company@email.com" />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-3">
                                    <label htmlFor="pxp-company-phone" className="form-label">Phone</label>
                                    <input type="tel" id="pxp-company-phone" className="form-control" placeholder="(+12) 345 6789" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pxp-company-website" className="form-label">Website</label>
                            <input type="url" id="pxp-company-website" className="form-control" placeholder="https://" />
                        </div>
                    </div>
                    <div className="col-xxl-4">
                        <div className="form-label">&nbsp;</div>
                        <div className="pxp-company-cover mb-3">
                            <input type="file" id="pxp-company-cover-choose-file" accept="image/*" />
                            <label htmlFor="pxp-company-cover-choose-file" className="pxp-cover"><span>Upload Cover Image</span></label>
                        </div>
                        <div className="pxp-company-logo mb-3">
                            <input type="file" id="pxp-company-logo-choose-file" accept="image/*" />
                            <label htmlFor="pxp-company-logo-choose-file" className="pxp-cover"><span>Upload<br />Logo</span></label>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="pxp-company-about" className="form-label">About the company</label>
                    <textarea className="form-control" id="pxp-company-about" placeholder="Type your info here..."></textarea>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="pxp-company-industry" className="form-label">Industry</label>
                            <input type="text" id="pxp-company-industry" className="form-control" placeholder="E.g. Software" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="pxp-company-founded" className="form-label">Founded in</label>
                            <input type="text" id="pxp-company-founded" className="form-control" placeholder="E.g. 2001" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="mb-3">
                            <label htmlFor="pxp-company-size" className="form-label">Company size</label>
                            <select id="pxp-company-size" className="form-select">
                                <option value="">&lt; 50 employees</option>
                                <option value="">50 - 100 employees</option>
                                <option value="">100 - 150 employees</option>
                                <option value="">150 - 200 employees</option>
                                <option value="">200 - 250 employees</option>
                                <option value="">250 - 300 employees</option>
                                <option value="">&gt; 300 employees</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-4 mt-lg-5">
                    <h2>Company Location</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-country" className="form-label">Country/State</label>
                                <input type="text" id="pxp-company-country" className="form-control" placeholder="E.g. United States, CA" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-city" className="form-label">City</label>
                                <input type="text" id="pxp-company-city" className="form-control" placeholder="E.g. San Francisco" />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pxp-company-address" className="form-label">Address</label>
                        <input type="text" id="pxp-company-address" className="form-control" placeholder="Type full address here..." />
                    </div>
                </div>

                <div className="mt-4 mt-lg-5">
                    <h2>Social Media</h2>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-facebook" className="form-label">Facebook</label>
                                <input type="url" id="pxp-company-facebook" className="form-control" placeholder="https://" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-twitter" className="form-label">Twitter</label>
                                <input type="url" id="pxp-company-twitter" className="form-control" placeholder="https://" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-instagram" className="form-label">Instagram</label>
                                <input type="url" id="pxp-company-instagram" className="form-control" placeholder="https://" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-linkedin" className="form-label">Linkedin</label>
                                <input type="url" id="pxp-company-linkedin" className="form-control" placeholder="https://" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 mt-lg-5">
                    <button className="btn rounded-pill pxp-section-cta">Save Profile</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;