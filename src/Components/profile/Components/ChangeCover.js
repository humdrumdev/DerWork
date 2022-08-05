import Modal from 'react-bootstrap/Modal'
import Croppie from "croppie";
import { useState } from "react";


const ChangeCover = ({ handleNewPhoto, loading }) => {
  const [croppie, setCroppie] = useState(null)
  const [data, setData] = useState(null)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  var croppieInstance = croppie;

  function handleImage(image) {
    console.log(image)

    // if (image) setImage(image)

    const el = document.getElementById("image-helper")
    if (el) {

      croppieInstance = new Croppie(el, {
        enableExif: true,
        viewport: {
          height: 260,
          width: 420,
        },
        boundary: {
            height: 280,
            width: 440,
        },
        outerHeight: 460,
        outerWidth: 900,
      });
      if (image)
        croppieInstance.bind({
          url: image,
        });
      setCroppie(croppieInstance)
    }
  }

  const handleFileInput = (e) => {
    // handle validations
    console.log(e.target.files[0])
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setData(reader.result)
      handleShow()
    }
    reader.readAsDataURL(file);
  }

  const handleCrop = () => {
    console.log(croppieInstance)
    croppieInstance.result({
      type: "base64",
      size: {
        width: 250,
        height: 250,
      },
      format: "jpeg",
      quality: 0.9,
    }).then(function (resp) {
      console.log(resp)
      handleNewPhoto(resp)
      handleClose()
    });
  }


  function handleSubmitImage(event) {
    event.preventDefault()
    if (croppie !== null) {
      croppie.result({
        type: 'base64',
        size: {
          width: 840,
          height: 520
        },

      }).then((blob) => {
        // setImage(blob);
        //blob to base64
        const myImage = new Image();
        myImage.src = blob;
        myImage.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = myImage.width;
          canvas.height = myImage.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(myImage, 0, 0);
          const dataURL = canvas.toDataURL('image/png');
          handleNewPhoto(dataURL)
          handleClose()
        }
      }
      )
    }

  }
  return (
    <div>
      <div >
          <label className="" htmlFor="file">
            <span className="btn rounded-pill pxp-nav-btn">
                {
                    loading ?
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    : <i className="fa fa-camera"></i> 
                }
                 <span style={{marginLeft:"12px"}}>
                 Change Cover
                 </span>
                </span>
          </label>
          <input type="file" id="file" accept="image/*" hidden onChange={handleFileInput} />
      </div>
      <Modal centered={true} show={show}
        onEntered={() => handleImage(data)}
        onHide={handleClose} className="modal fade pxp-user-modal" id="pxp-signin-modal">
        {/* <Modal.Header closeButton>
                        </Modal.Header> */}
        <div>
          <form onSubmit={handleSubmitImage} id="form2">
            {/* Your image upload functionality here */}

            {/* {image === "" && (
              //  =<ImageUpload image={image} setImage={handleImage} />
              <span onClick={() => handleImage(user.photo)}>click</span>
            )} */}

            <div id="image-helper"></div>
            <div className='row '>
              <div className='col-6 '>
                <button className='btn rounded-pill pxp-subsection-cta m-3 ' style={{ float: "right" }} color="primary" variant="contained" type="button" onClick={handleClose} >
                  Cancel
                </button>
              </div>
              <div className='col-6 '>
                <button className='btn rounded-pill pxp-section-cta m-3' color="primary" variant="contained" type="submit">
                  Submit
                </button>
              </div>
            </div>
            {/* <label htmlFor="pxp-candidate-cover-choose-file">
              Submit
            </label> */}

          </form>
        </div>
      </Modal >
    </div >
  )

}

export default ChangeCover;