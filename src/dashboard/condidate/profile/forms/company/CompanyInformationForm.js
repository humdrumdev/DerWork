import { useEffect, useState } from "react";
import globalService from "../../../../../services/global.services";

const CompanyInformationForm = ({ user, handleUserChange }) => {
    // // Company
    // @Column({ nullable: true })
    // companyname: string;

    // @Column({nullable:true})
    // industry:string;

    // @Column({ nullable: true })
    // fax: string;

    // @Column({ nullable: true })
    // fix: string;

    // @Column({ nullable: true })
    // CompanyStructer: string;

    // @Column({ nullable: true })
    // founded: string;

    // @Column({ nullable: true })
    // size: number;

    // @Column({ nullable: true })
    // photo:string;

    // @Column({ nullable: true })
    // cover:string;
    const [prefix, setPrefix] = useState('');

    useEffect (() => {
        setPrefix('+'+globalService.getCountryCodePrefix(user.countryCode));
    }, []);     
        

    // @Column({ nullable: true })
    // googleId:string;

    // @Column({ nullable: true })
    // file:string;

    // @Column({ nullable: true })
    // password: string;

    // @Column({ nullable: true })
    // salt: string;

    // @Column({ nullable: true })
    // email: string;

    // @Column({ nullable: true })
    // time_zone: string;

    // @Column({ nullable: true })
    // country: string;

    // @Column({ nullable: true })
    // countryCode: string;

    // @Column({ nullable: true })
    // city: string;

    // @Column({ nullable: true })
    // adress: string;

    // @Column({ nullable: true })
    // zipcode: string;

    // @Column({ nullable: true })
    // description: string;

    // @Column({ nullable: true })
    // website:string;

    // @Column({ nullable: true })
    // valid: boolean;

    // @Column({ nullable: true })
    // verified: boolean;

    // @Column({ nullable: true })
    // isCompany: boolean;

    // @Column({ nullable: true })
    // LastLogin: Date;

    // @Column({ nullable: true })
    // status:string;

    const checkState = (e) => {
        // get element from the form event
        const element = e.target;
        // get the value of the element
        const value = element.value;
        // get the name of the element
        const name = element.name;
        console.log(element)
        if(!value)
        {
            element.classList.add("is-invalid");
            const error = document.createElement("div");
            error.classList.add("invalid-feedback");
            error.innerHTML = "This field is required";
            element.parentElement.appendChild(error);
        }
        else
        {
            element.classList.remove("is-invalid");
            const error = element.parentElement.querySelector(".invalid-feedback");
            if(error)
            {
                element.parentElement.removeChild(error);
            }

        }
    };

    return (
        <div>
            <div className="row mt-4 mt-lg-5">
                <div className="mb-3">
                    <label htmlFor="companyname" className="form-label">Company Name</label>
                    <input 
                        type="text" id="companyname" name="companyname"
                        onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.companyname}
                        className="form-control" 
                        placeholder="Company Name"/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.email} className="form-control" placeholder="Email" />
                        </div>
                    </div>
                    
                    <div className="col-sm-6">
                        <div className="mb-3">
                            <label htmlFor="fix" className="form-label">Fix</label>
                            <div className="input-group">
                                <input type="text" id="prefix" name="prefix" onChange={e=>{handleUserChange(e);checkState(e)}} value={user.prefix?user.prefix:prefix} className="form-control" style={{width:"20%"}} placeholder="+" />
                                <input type="tel" id="fix" name="fix" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.fix} className="form-control" style={{width:"80%"}}  placeholder="(+12) 345 6789" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input type="url" id=" website" name="website" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.website} className="form-control" placeholder="http://www.example.com" />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">About the company</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={(e) => {checkState(e);handleUserChange(e)}}
                    value={user.description}
                    className="form-control" placeholder="Type your info here..."></textarea>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="industry" className="form-label">Industry</label>
                        <input type="text" id="industry" name="industry" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.industry} className="form-control" placeholder="E.g. Software" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="founded" className="form-label">Founded in</label>
                        <input type="text" id="founded" name="founded" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.founded} className="form-control" placeholder="E.g. 2017" />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Company size</label>
                        <select id="size" name="size" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.size} onBlur={(e) => handleUserChange(e)} className="form-control">
                            <option value="< 50">&lt; 50 employees</option>
                            <option value="50 - 100">50 - 100 employees</option>
                            <option value="100 - 150">100 - 150 employees</option>
                            <option value="150 - 200">150 - 200 employees</option>
                            <option value="200 - 250">200 - 250 employees</option>
                            <option value="250 - 300">250 - 300 employees</option>
                            <option value="> 300">&gt; 300 employees</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-4 mt-lg-5">
                <h2>Company Location</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" id="country" name="country" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.country} className="form-control" placeholder="E.g. USA" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" id="city" name="city" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.city} className="form-control" placeholder="E.g. New York" />
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" id="address" name="address" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.address} className="form-control" placeholder="E.g. 123 Main St" />
                </div>
            </div>

            <div className="mt-4 mt-lg-5">
                <h2>Social Media</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="facebook" className="form-label">Facebook</label>
                            <input type="url" id="facebook" name="facebook" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.facebook} className="form-control" placeholder="https://" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="twitter" className="form-label">Twitter</label>
                            <input type="url" id="twitter" name="twitter" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.twitter} className="form-control" placeholder="https://" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="instagram" className="form-label">Instagram</label>
                            <input type="url" id="instagram" name="instagram" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.instagram} className="form-control" placeholder="https://" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="linkedin" className="form-label">Linkedin</label>
                            <input type="url" id="linkedin" name="linkedin" onChange={(e) => {checkState(e);handleUserChange(e)}} value={user.linkedin} className="form-control" placeholder="https://" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompanyInformationForm;