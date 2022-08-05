
import skillService from '../../../services/skill.service'
import { useState } from "react";

const Skill = ({ ss }) => {
    console.log(ss)
    const [skills, setSkills] = useState(ss);
    //input state for the form
    const [skill, setSkill] = useState("");



    const AddToSkills = () => {
        const __skill = { skill: skill, lastUse: new Date(), experience: 100 }
        skillService.addSkill(__skill).then(
            (result) => {
                let askill = result.data;
                askill.skill = { id: askill.skillId, label: skill };
                setSkills([...skills, result.data]);
            }
        )
    }

    const deleteFromUserSkills = (skill) => {
        //tell the eduaction service to delete the skill
        skillService.deleteSkill(skill.id).then(
            () => {
                //remove the skill from the list
                setSkills(skills.filter(e => e.id !== skill.id));
            }
        )
    }
    return (
        <div className="mt-4 mt-lg-5">
            <h2>Skills</h2>
            <div className="pxp-candidate-dashboard-skills mb-3">
                <ul className="list-unstyled">
                    {
                        skills ?
                            skills.map((skill, inbox) => {
                                return (
                                    <li key={inbox}>{skill.skill.label} <span className="fa fa-trash-o" onClick={() => deleteFromUserSkills(skill)}></span></li>
                                )
                            }

                            ) : null
                    }
                </ul>
            </div>
            <div className="input-group mb-3">
                <input
                    onChange={(e) => setSkill(e.target.value)}
                    value={skill}
                    type="text" className="form-control" placeholder="Skill" />

                <button type="button" className="btn" onClick={() => AddToSkills()}>Add</button>
            </div>
        </div>
    )
}

export default Skill;