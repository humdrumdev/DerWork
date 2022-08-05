import Modal from 'react-bootstrap/Modal'
import EducationForm from './forms/EducationForm'
import educationService from '../../../services/education.service'
import { useState } from "react";

const Education = ({es}) => {
    const [educations, setEducations] = useState(es);
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [showEdecation, setShowEdecation] = useState(false);

    const handleCloseEdecation = () => {setShowEdecation(false), setSelectedEducation(null)};
    const handleShowEdecation = () => setShowEdecation(true);
    
    const AddToEducations = (education) => {
        educationService.addEducation(education).then(
            (result) => {
                setEducations([...educations, result.data]);
                handleCloseEdecation();
            }
        )
    }

    const deleteFromUserEducations = (education) => {
        //tell the eduaction service to delete the education
        educationService.deleteEducation(education.id).then(
            () => {
                //remove the education from the list
                setEducations(educations.filter(e => e.id !== education.id));
            }
        )
    }


    const updateEducations = (education) => {
        //tell the eduaction service to update the education
        educationService.updateEducation(education).then(
            () => {
                //update the education in the state
                const updatedEducations = educations.map(e => {
                    if (e.id === education.id) {
                        return education;
                    }
                    return e;
                });
                setEducations(updatedEducations);
                handleCloseEdecation();
            }
        )
    }

        //edir education handler
        const editEducation = (education) => {
            setSelectedEducation(education);
            handleShowEdecation();
        }

    //get educations from EducationForm
    const getEducation = (education) => {
        if(!education.id)
            AddToEducations(education);
        else
            updateEducations(education);
    }
    
    return (
        <div className="mt-4 mt-lg-5">
            <h2>Education &amp; Training</h2><button type="button" className="btn rounded-pill pxp-subsection-cta" onClick={handleShowEdecation}>Add Education</button>
            <div className="table-responsive">
                <table className="table align-middle">
                    <tbody>
                        {
                        educations?   
                        educations.map((education,inbox) => {
                                return (
                                        <tr key={inbox}>
                                        <td style={{width: "30%"}}><div className="pxp-candidate-dashboard-experience-title">{education.title}</div></td>
                                        <td style={{width: "25%"}}><div className="pxp-candidate-dashboard-experience-school">{education.institution}</div></td>
                                        <td style={{width: "25%"}}><div className="pxp-candidate-dashboard-experience-time">{education.startEndDate}</div></td>
                                        <td>
                                            <div className="pxp-dashboard-table-options">
                                                <ul className="list-unstyled">
                                                    <li><button type="button" onClick={() => editEducation(education)} 
                                                    title="Edit"><span className="fa fa-pencil"></span></button></li>
                                                    <li><button type="button" onClick={() => deleteFromUserEducations(education)}
                                                    title="Delete"><span className="fa fa-trash-o"></span></button></li>
                                                </ul>
                                            </div>
                                        </td>
                                        </tr>
                                )
                            })
                        :
                        null
                        }
                </tbody></table>
            </div>
            <Modal centered={true} show={showEdecation} onHide={handleCloseEdecation} className="modal fade pxp-user-modal " id="pxp-signin-modal" >
                <div className="p-3">
                    <EducationForm 
                        {...selectedEducation}
                        getEducation={getEducation}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Education;