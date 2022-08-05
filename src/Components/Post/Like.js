

import { useState, useEffect } from "react";
import jobService from "../../services/job.service";
import { Spinner } from "react-bootstrap";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
const Like = ({ jobId,liked }) => {
    const [sending, setSending] = useState(false);
    const [likedState, setLikedState] = useState(liked);
    const addToFavourites = async () => {
        setSending(true);
        try {
            await jobService.addToFavourites(jobId).then(
                (response) => {
                    if(response.data === "Job removed from favorites")
                    {
                        setLikedState(false);
                    }
                    else
                    {
                        setLikedState(true);
                    }
                    setSending(false);
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
        <div>
            {/* <button onClick={addToFavourites} className="btn rounded-pill pxp-section-cta">
                Apply Now
            </button> */}
            <button onClick={addToFavourites} className="btn rounded-circle"
                disabled={sending}  style={{
                    height: "44px",
                    width: "44px",
                    backgroundColor: likedState || sending ? "#ff5a5f" : "#f5f5f5"}
            }
            >
                  {
                    sending ? <Spinner animation="grow" variant="light" size="sm" /> :
                    !likedState ? 
                    <span className="fa fa-star-o"></span> 
                    :
                    <span className="fa fa-star" style={{color: "#f5f5f5"}}>
                    </span>
                  }
            </button>
        </div>
    );
}

export default Like;
