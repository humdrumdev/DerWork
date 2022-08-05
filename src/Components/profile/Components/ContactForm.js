import { useState } from "react";
import messageService from "../../../services/messages.service";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
const ContactForm = ({ id,name }) => {
    const [message, setMessage] = useState();
    const [sendding, setSendding] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSendding(true);
        console.log(message);
        const { data } = await messageService.sendMessage(message, id, id);
        setSendding(false);
        navigate("/dashboard/inbox");
    }

    return (
        <div className="pxp-single-candidate-side-panel mt-4 mt-lg-5">
            <h3>Contact {name}</h3>
            <form className="mt-4" onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                    <label htmlFor="contact-candidate-name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="contact-candidate-name" placeholder="Enter your name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="contact-candidate-email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="contact-candidate-email" placeholder="Enter your email address"/>
                </div> */}
                <div className="mb-3">
                    <label htmlFor="contact-candidate-message" className="form-label">Message</label>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="form-control" id="contact-candidate-message" placeholder="Type your message here..."></textarea>
                </div>
                {/* <button className="btn rounded-pill pxp-section-cta" type="submit" >
                    {
                        error == false ?
                        sending ? <Spinner animation="border" size="sm" />
                        : <i className="fa fa-check"></i>
                        : <i className="fa fa-warning"></i>

                    }
                    <span className="ml-3">
                    {
                        id ? 'Update' : 'Publish Job'
                    }
                    </span>
                    </button> */}
                <button className="btn rounded-pill pxp-section-cta d-block" type="submit">
                    {
                        sendding ? <Spinner animation="border" size="sm" />
                        : null
                    }
                    <span className="ml-3">
                    Send Message
                    </span>
                    </button>
            </form>
        </div>
    )
}

export default ContactForm;