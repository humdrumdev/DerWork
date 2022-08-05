import jobService from "../../services/job.service";
import { useState } from "react";
const CreateJob = () => {
    // payment details
    const [jobSalaryType, setJobSalaryType] = useState("");
    const [jobSalary, setJobSalary] = useState("");
    const [jobSalaryRangeFrom, setJobSalaryRangeFrom] = useState("");
    const [jobSalaryRangeTo, setJobSalaryRangeTo] = useState("");
    const [jobSalaryCurrency, setJobSalaryCurrency] = useState("");


    //job type
    const [jobType, setJobType] = useState("");
    const [jobTime, setJobTime] = useState("");

    //How many people do you want to hire
    const [numberOfPeople, setNumberOfPeople] = useState("");
    
    //planned start date
    const [startDate, setStartDate] = useState("");

    //job description
    const [jobTitle, setJobTitle] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [jobDescription, setJobDescription] = useState("");

    //Job settings (Country and language, etc)
    const [jobCountry, setJobCountry] = useState("");
    const [jobLanguage, setJobLanguage] = useState("");

    //Apply method
    const [applyMethod, setApplyMethod] = useState("");
    const [applyEmail, setApplyEmail] = useState("");
    const [applyLink, setApplyLink] = useState("");
    const [applyPhone, setApplyPhone] = useState("");
    const [applyAddress, setApplyAddress] = useState("");
    const [applyWebsite, setApplyWebsite] = useState("");

    //job requirements
    const [jobRequirements, setJobRequirements] = useState("");
    const [jobBenefits, setJobBenefits] = useState("");
    const [jobSkills, setJobSkills] = useState("");
    const [jobEducation, setJobEducation] = useState("");
    const [jobExperience, setJobExperience] = useState("");
    const [jobCertificates, setJobCertificates] = useState("");
    const [jobCategories, setJobCategories] = useState("");
    const [jobTags, setJobTags] = useState("");
    
    //How quickly do you need to hire?
    const [PostDuration, setPostDuration] = useState("");

    //submit job 
    const handleJobSubmit = async (e) => {
        e.preventDefault();
        try {
            const job = {
                jobSalaryType,
                jobSalary,
                jobSalaryRangeFrom,
                jobSalaryRangeTo,
                jobSalaryCurrency,
                jobType,
                jobTime,
                numberOfPeople,
                startDate,
                jobTitle,
                jobDescription,
                jobLocation,
                jobCountry,
                jobLanguage,
                applyMethod,
                applyEmail,
                applyLink,
                applyPhone,
                applyAddress,
                applyWebsite,
                jobRequirements,
                jobBenefits,
                jobSkills,
                jobEducation,
                jobExperience,
                jobCertificates,
                jobCategories,
                jobTags,
                PostDuration
            }
            await jobService.addJob(job).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                  console.log(error);
                }
            );
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Create Job Offer</h1>
                <p className="pxp-text-light">Edit your company profile page info.</p>
                <form onSubmit={handleJobSubmit}>
                    <div className="row mt-4 mt-lg-5">
                        <div className="col-xxl-6">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-title" className="form-label">Job title</label>
                                <input 
                                 type="text" id="pxp-company-job-title" className="form-control" placeholder="Add title"
                                 value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                 />
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-3">
                            <label htmlFor="pxp-company-job-location" className="form-label">Location</label>
                            <input 
                            value={jobLocation}
                            onChange={(e) => setJobLocation(e.target.value)}
                            type="text" id="pxp-company-job-location" className="form-control" placeholder="E.g. San Francisco, CA"/>
                        </div>
                        <div className="col-md-6 col-xxl-3">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-category" className="form-label">Category</label>
                                <select id="pxp-company-job-category" className="form-select">
                                    <option>Select a category</option>
                                    <option>Marketing &amp; Communication</option>
                                    <option>Software Engineering</option>
                                    <option>Project Management</option>
                                    <option>Finance</option>
                                    <option>Retail</option>
                                    <option>Sales</option>
                                    <option>Manufacturing</option>
                                    <option>IT</option>
                                    <option>Business Development</option>
                                    <option>Human Resources</option>
                                    <option>Customer Service</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pxp-company-job-description" className="form-label">Job description</label>
                        <textarea 
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="form-control" id="pxp-company-job-description" placeholder="Type the description here..."></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6 col-xxl-3">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-experience" className="form-label">Experience</label>
                                <input type="text" id="pxp-company-job-experience" className="form-control" placeholder="E.g. Minimum 3 years"/>
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-3">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-level" className="form-label">Career level</label>
                                <select id="pxp-company-job-level" className="form-select">
                                    <option>No Experience</option>
                                    <option>Entry-Level</option>
                                    <option>Mid-Level</option>
                                    <option>Senior-Level</option>
                                    <option>Manager / Executive</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-3">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-type" className="form-label">Employment type</label>
                                <select id="pxp-company-job-type" className="form-select">
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Remote</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                    <option>Training</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-xxl-3">
                            <div className="mb-3">
                                <label htmlFor="pxp-company-job-salary" className="form-label">Salary range</label>
                                <select id="pxp-company-job-salary" className="form-select">
                                    <option>Select range</option>
                                    <option>$700 - $1000</option>
                                    <option>$1000 - $1200</option>
                                    <option>$1200 - $1400</option>
                                    <option>$1500 - $1800</option>
                                    <option>$2000 - $3000</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="mt-4 mt-lg-5">
                        <button className="btn rounded-pill pxp-section-cta" type="submit" >Publish Job</button>
                        <button 
                        style={{border: '1px solid var(--pxpTextColor)', color: 'var(--pxpTextColor)', marginLeft: '10px'}}
                        className="btn rounded-pill pxp-section-cta pxp-user-nav-trigger pxp-on-light mx-3 " type="submit" >Preview</button>
                        <button className="btn rounded-pill pxp-section-cta-o ms-3 ">Save Draft</button>
                    </div>
                </form>
        </div>
    );
};

export default CreateJob;