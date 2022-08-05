const UserInfo = ({ user }) => {
    return (
        <div className="pxp-single-candidate-content">
            <h2>About {user.first_name}</h2>
            {user.description}

            <div className="mt-4 mt-lg-5">
                <h2>Skills</h2>
                <div className="pxp-single-candidate-skills">
                    <ul className="list-unstyled">
                        {
                            user.userSkills.map((skill,index)=>{
                                return(
                                    <li key={index}>
                                    {skill.skillId}
                                </li>)
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="mt-4 mt-lg-5">
                <h2>Work Experience</h2>
                <div className="pxp-single-candidate-timeline">
                {user.experiences.map((experience,index)=>{
                    return(
                        <div key={index} className="pxp-single-candidate-timeline-item">
                    <div className="pxp-single-candidate-timeline-dot"></div>
                    <div className="pxp-single-candidate-timeline-info ms-3">
                        <div className="pxp-single-candidate-timeline-time"><span className="me-3">{experience.startDate +" - " +experience.endDate}</span></div>
                        <div className="pxp-single-candidate-timeline-position mt-2">{experience.jobTitle}</div>
                        <div className="pxp-single-candidate-timeline-company pxp-text-light">{experience.company}</div>
                        <div className="pxp-single-candidate-timeline-about mt-2 pb-4">In publishing and graphic design, lorem ipsum is a filler text or greeking commonly used to demonstrate the textual elements of a graphic document or visual presentation. Lorem Ipsum is also known as: Greeked text.</div>
                    </div>
                </div>
                    )
                })}
                    
                </div>
            </div>

            <div className="mt-4 mt-lg-5">
                <h2>Education &amp; Training</h2>
                <div className="pxp-single-candidate-timeline">
                    {user.educations.map((education,index)=>{
                        return(
                            <div key={index} className="pxp-single-candidate-timeline-item">
                        <div className="pxp-single-candidate-timeline-dot"></div>
                        <div className="pxp-single-candidate-timeline-info ms-3">
                            <div className="pxp-single-candidate-timeline-time"><span className="me-3">{education.startEndDate}</span></div>
                            <div className="pxp-single-candidate-timeline-position mt-2">{education.title}</div>
                            <div className="pxp-single-candidate-timeline-company pxp-text-light">{education.institution}</div>
                            <div className="pxp-single-candidate-timeline-about mt-2 pb-4">In publishing and graphic design, lorem ipsum is a filler text or greeking commonly used to demonstrate the textual elements of a graphic document or visual presentation. Lorem Ipsum is also known as: Greeked text.</div>
                        </div>
                    </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;