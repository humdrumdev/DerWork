import Modal from 'react-bootstrap/Modal'
import ExperienceForm from './forms/ExperienceForm'
import experienceService from '../../../services/experience.service'
import { useState } from "react";

const Experience = ({es}) => {
    const [experiences, setExperiences] = useState(es);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [showEdecation, setShowEdecation] = useState(false);

    const handleCloseEdecation = () => setShowEdecation(false);
    const handleShowEdecation = () => setShowEdecation(true);
    
    const AddToExperiences = (experience) => {
        experienceService.addExperience(experience).then(
            (result) => {
                setExperiences([...experiences, result.data]);
                handleCloseEdecation();
            }
        )
    }

    const deleteFromUserExperiences = (experience) => {
        //tell the eduaction service to delete the experience
        experienceService.deleteExperience(experience.id).then(
            () => {
                //remove the experience from the list
                setExperiences(experiences.filter(e => e.id !== experience.id));
            }
        )
    }


    const updateExperiences = (experience) => {
        //tell the eduaction service to update the experience
        experienceService.updateExperience(experience).then(
            () => {
                //update the experience in the state
                const updatedExperiences = experiences.map(e => {
                    if (e.id === experience.id) {
                        return experience;
                    }
                    return e;
                });
                setExperiences(updatedExperiences);
                handleCloseEdecation();
            }
        )
    }

        //edir experience handler
        const editExperience = (experience) => {
            setSelectedExperience(experience);
            handleShowEdecation();
        }

    //get experiences from ExperienceForm
    const getExperience = (experience) => {
        if(!experience.id)
            AddToExperiences(experience);
        else
            updateExperiences(experience);
    }
    return (
        <div className="mt-4 mt-lg-5">
            <h2>Work Experience </h2><button type="button" className="btn rounded-pill pxp-subsection-cta" onClick={handleShowEdecation}>Add Experience</button>
            <div className="table-responsive">
                <table className="table align-middle">
                    <tbody>
                        {
                        experiences?   
                        experiences.map((experience,inbox) => {
                                return (
                                        <tr key={inbox}>
                                        <td style={{width: "30%"}}><div className="pxp-candidate-dashboard-experience-title">{experience.jobTitle}</div></td>
                                        <td style={{width: "25%"}}><div className="pxp-candidate-dashboard-experience-school">{experience.company}</div></td>
                                        <td style={{width: "25%"}}><div className="pxp-candidate-dashboard-experience-time">{experience.startDate + " "+ experience.endDate}</div></td>
                                        <td>
                                            <div className="pxp-dashboard-table-options">
                                                <ul className="list-unstyled">
                                                    <li><button type="button" onClick={() => editExperience(experience)} 
                                                    title="Edit"><span className="fa fa-pencil"></span></button></li>
                                                    <li><button type="button" onClick={() => deleteFromUserExperiences(experience)}
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
                    <ExperienceForm 
                        {...selectedExperience}
                        getExperience={getExperience}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Experience;