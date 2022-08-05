

import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import applicationService from "../../services/application.service";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
const Apply = ({ jobId }) => {
    const [show, setShow] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [letter, setLetter] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const applyToJob = async () => {
        try {
            await applicationService.addApplication(jobId, letter).then(
                (response) => {
                    console.log(response);
                    handleClose();
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
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setLetter(convertToRaw(editorState.getCurrentContent()));

        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };
    return (
        <div>
            <button onClick={handleShow} className="btn rounded-pill pxp-section-cta">
                Apply Now
            </button>
            <Modal fullscreen={true} centered={true} show={show} onHide={handleClose} className="modal fade pxp-user-modal" id="pxp-apply-modal">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">

                        <div className='container'>
                            <div className="mb-3">
                                <h5 className="modal-title text-center my-4" id="signinModal">Cover Letter</h5>
                                <Editor

                                    wrapperClassName="form-control p-0 overflow-hidden richeditorheight"
                                    editorClassName="p-3"
                                    toolbarClassName="toolbar-class"
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                />
                            </div>

                            <div className="pxp-user-modal-fig text-center">
                                {/* <!-- <img src="./DerWork - Home v1_files/signin-fig.png" alt="Sign in"> --> */}
                            </div>

                        </div>
                        <div className='row m-3'>
                            <div className='col-6 d-flex justify-content-end'>
                                <button onClick={handleClose} className=" btn rounded-pill pxp-section-cta-o">
                                    Cancel
                                </button>
                            </div>

                            <div className='col-6 '>
                                <button onClick={applyToJob} className=" btn rounded-pill pxp-section-cta">
                                    Apply To Job
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Apply;
