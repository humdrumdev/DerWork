import { useParams } from "react-router-dom";
import Chat from "./Chat";
import ChatSelections from "./ChatSelections";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const Inbox = () => {
    //get id
    const [ActiveChat, setActiveChat] = useState(null);

    //calback func
    const handleActiveChat = (e) => {
        setActiveChat(e);
    }
    const clearChat = () => {
        setActiveChat(null);
    }


    return (
        <div className="">
            <h1>Inbox</h1>
            <p className="pxp-text-light">Keep in touch with your candidates.</p>

            <div className="row mt-4 mt-lg-5">
                <div className="col-xxl-4">
                    <ChatSelections callback={handleActiveChat} />
                </div>
                <div className="col-xxl-8">
                    {
                    
                    ActiveChat && window.innerWidth > 992 ? 
                    <Chat chat={ActiveChat} callback={clearChat} /> 
                    : 
                    ActiveChat ?
                    <Modal fullscreen={true} show={ActiveChat} onHide={() => setActiveChat(null)}>
                            <Modal.Header closebutton>
                            </Modal.Header>
                            <Modal.Body>
                                <Chat chat={ActiveChat} callback={clearChat} />
                            </Modal.Body>
                            <Modal.Footer>
                              <button onClick={() => setActiveChat(null)} 
                              className="btn rounded-pill pxp-nav-btn">
                                Close
                              </button>
                            </Modal.Footer>

                          </Modal>
                    :null
                    }
                </div>
            </div>
        </div>
    );
}
export default Inbox;