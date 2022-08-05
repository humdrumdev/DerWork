
import experienceService from "../../../../services/experience.service";
import { useState, useEffect } from "react";


const ExperienceForm = ({id,jobTitle,company,startDate,endDate,description,current,getExperience}) => {
    const [experience, setExperience] = useState({
        id:id,
        jobTitle: jobTitle,
        company: company,
        startDate: startDate,
        endDate: endDate,
        description: description,
        current:current
    });


    const handleUserChange = (e) => {
        if(e.target.name === 'current')
            setExperience({ ...experience, [e.target.name]: e.target.checked })
        else
            setExperience({ ...experience, [e.target.name]: e.target.value })
    }

    const handlenewEdecation = (e) => {
        e.preventDefault();
        getExperience(experience);
    }
    return (
        <div>
            <form onSubmit={handlenewEdecation}>
  <div className="row mt-3 mt-lg-4">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-title" className="form-label">job Title</label>
                                        <input 
                                        id="jobTitle"
                                        name="jobTitle"
                                        onChange={(e) => handleUserChange(e)}
                                        value={experience.jobTitle}
                                        type="text" id="pxp-candidate-edu-title" className="form-control" placeholder="E.g. Architecure"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-school" className="form-label">Company</label>
                                        <input 
                                        id="company"
                                        name="company"
                                        onChange={(e) => handleUserChange(e)}
                                        value={experience.company}
                                        type="text" id="pxp-candidate-edu-school" className="form-control" placeholder="School name"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-time" className="form-label">Start Date</label>
                                        <input 
                                        id="startDate"
                                        name="startDate"
                                        onChange={(e) => handleUserChange(e)}
                                        value={experience.startDate}
                                        type="text" id="pxp-candidate-edu-time" className="form-control" placeholder="E.g. 2005 - 2013"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-time" className="form-label">End Date</label>
                                        <input 
                                        id="endDate"
                                        name="endDate"
                                        onChange={(e) => handleUserChange(e)}
                                        value={experience.endDate}
                                        type="text" id="pxp-candidate-edu-time" className="form-control" placeholder="E.g. 2005 - 2013"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-edu-about" className="form-label">Description</label>
                                <textarea
                                id="description"
                                name="description"
                                onChange={(e) => handleUserChange(e)}
                                value={experience.description}
                                
                                className="form-control pxp-smaller" id="pxp-candidate-edu-about" placeholder="Type a short description here..."></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pxp-candidate-edu-about" className="form-label">Current</label>
                                <input
                                id="current"
                                name="current"
                                onChange={(e) => handleUserChange(e)}
                                value={experience.current}
                                checked={experience.current}
                                type="checkbox" className="form-check-input"/>
                            </div>
                            <button type="submit" 
                            className="btn rounded-pill pxp-subsection-cta">Add Experience</button>


            </form>

                          
        </div>
    )

}

export default ExperienceForm;