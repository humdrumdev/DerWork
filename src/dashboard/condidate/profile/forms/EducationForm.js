
import educationService from "../../../../services/education.service";
import { useState, useEffect } from "react";


const EducationForm = ({id,title,institution,startEndDate,description,getEducation}) => {
    const [education, setEducation] = useState({
        id:id,
        title: title,
        institution: institution,
        startEndDate: startEndDate,
        description: description,
    });


    const handleUserChange = (e) => {
        console.log(e.target.name)
        setEducation({ ...education, [e.target.name]: e.target.value })
    }

    const handlenewEdecation = (e) => {
        e.preventDefault();
        getEducation(education);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!id)
            educationService.addEducation(education).then(
                (data) => {
                    console.log(data)
                }
            )
        else
        educationService.updateEducation(education).then(
            (data) => {
                console.log(data)
            }
        )
    }

    return (
        <div>
            <form onSubmit={handlenewEdecation}>
  <div className="row mt-3 mt-lg-4">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-title" className="form-label">Title</label>
                                        <input 
                                        id="title"
                                        name="title"
                                        onChange={(e) => handleUserChange(e)}
                                        value={education.title}
                                        type="text" id="pxp-candidate-edu-title" className="form-control" placeholder="E.g. Architecure"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-school" className="form-label">School</label>
                                        <input 
                                        id="institution"
                                        name="institution"
                                        onChange={(e) => handleUserChange(e)}
                                        value={education.institution}
                                        type="text" id="pxp-candidate-edu-school" className="form-control" placeholder="School name"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pxp-candidate-edu-time" className="form-label">Time period</label>
                                        <input 
                                        id="startEndDate"
                                        name="startEndDate"
                                        onChange={(e) => handleUserChange(e)}
                                        value={education.startEndDate}
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
                                value={education.description}
                                
                                className="form-control pxp-smaller" id="pxp-candidate-edu-about" placeholder="Type a short description here..."></textarea>
                            </div>
                            <button type="submit" 
                            className="btn rounded-pill pxp-subsection-cta">Add Education</button>


            </form>

                          
        </div>
    )

}

export default EducationForm;