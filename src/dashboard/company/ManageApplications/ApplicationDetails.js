import { useEffect, useState } from "react";
import applicationService from "../../../services/application.service";
import Spinner from "react-bootstrap/Spinner";
//convertFromRaw
import { EditorState, convertToRaw,convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";


const ApplicationDetails = ({id}) => {
  const [application, setapplication] = useState();
  const [loading, setLoading] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    requestapplicationData();
    setLoading(true);
  }, [id]);

  async function requestapplicationData() {
    try {
      await applicationService.getApplicationById(id).then(
          (response) => {
              setapplication(response.data);
              setLoading(false);
              setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.letter))));
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
    loading==false ? (
      <div className="tab-pane active">
        <div className="pxp-single-candidate-hero pxp-cover pxp-boxed" style={{backgroundImage :"url(images/candidate-cover-1.jpg)",height: "312px"}}>
            <div className="pxp-hero-opacity"></div>
            <div className="pxp-single-candidate-hero-caption">
                <div className="pxp-single-candidate-hero-content d-block text-center">
                    <div className="pxp-single-candidate-hero-avatar d-inline-block" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + application.user.photo})`}}></div>
                    <div className="pxp-single-candidate-hero-name ms-0 mt-3">
                        <h1>{application.user.first_name} {application.user.last_name}</h1>
                        <div className="pxp-single-candidate-hero-title">{application.user.title}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-3 pxp-single-candidate-content">
          <h2>Cover Letter</h2>
          <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent())) }} />

        </div>
      </div>
    ):(
      //still loading
      <div className="tab-pane active" >
        <div className="d-flex justify-content-center   h-100  align-items-center" style={{minHeight:"360px"}}>
              <Spinner animation="grow" />
            </div>
      </div>
    )
  );
};

export default ApplicationDetails;
