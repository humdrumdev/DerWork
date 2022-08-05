

import { useEffect, useState } from "react";
import jobService from "../../services/job.service";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import JobDetails from "../../Components/Post/JobDetails";
import { Spinner } from "react-bootstrap";
const CondadateFavourites = (props) => {

      const [jobs, setjobs] = useState([]);
      const [pages, setPages] = useState([]);
      const [activePage, setActivePage] = useState(1);
      const [ids, setIds] = useState([]);
      const [loading, setLoading] = useState(true);
      //modal open and close
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = (id) => setShow(id);
        const [preview, setPreview] = useState(false);
        const handleClosePreview = () => setPreview(false);
        const handleShowPreview = (id) => setPreview(id);
     const [sending, setSending] = useState(0);
      useEffect(() => {
        requestjobsStatisticsData();
        requestJobsData(1);
      }, []);

      async function requestjobsStatisticsData() {
        try {

        }
        catch (error) {
            console.log(error);
        }
      }
    
        async function requestJobsData(page) {
            try {
                await jobService.getFavoriteJobs().then(
                    (response) => {
                        setjobs(response.data);
                    setLoading(false);
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


        //submit checked jobs
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(ids);
            if (ids.length > 0) {
                jobService.changeStatus(ids,status).then(
                    (response) => {
                        console.log(response);
                        setIds([]);
                        requestJobsData(activePage);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }

        }
        
        //handle search
        const handleSearch = () => {
            requestJobsData(1)
        }

        const removeIt=(id)=>
        {
            setSending(id);
            jobService.addToFavourites(id).then(
                (response) => {
                    setSending(0);
                    requestJobsData(activePage);
                },
                (error) => {
                    console.log(error);
                }
            );

        }

    return (
        <div >
                <h1>Favourite Jobs</h1>
                <p className="pxp-text-light">Detailed list of your favourite jobs.</p>

                <div className="mt-4 mt-lg-5">
                    
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th style={{width:"25%"}}>Job</th>
                                    <th style={{width:"20%"}}>Category</th>
                                    <th style={{width:"12%"}}>Type</th>
                                    <th>Date<span className="fa fa-angle-up ms-3"></span></th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            {
                                loading ?
                                <div className="text-center w-100  py-5" style={{display: "table-caption"}}>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <tbody>
                            { jobs.map((job) => {
                        const {
                            id,
                            jobTitle,
                            status,
                            createdAt,
                            jobCity,
                            jobCountryCode,
                            jobType,
                            user
                          //jobDescription,userId
                        } = job;
                        return (
                                <tr key={id}>
                                <td>
                                    <a href="/">
                                        <div className="pxp-company-dashboard-job-title">{jobTitle}</div>
                                        <div className="pxp-company-dashboard-job-location"><span className="fa fa-globe me-1"></span>{jobCity}, {jobCountryCode}</div>
                                    </a>
                                </td>
                                <td><div className="pxp-company-dashboard-job-category">{jobType}</div></td>
                                <td><div className="pxp-company-dashboard-job-type">
                                {jobType}</div></td>
                                <td>
                                    <div className="pxp-company-dashboard-job-status"><span className="badge rounded-pill bg-success">{status}</span></div>
                                    <div className="pxp-company-dashboard-job-date mt-1">{createdAt}</div>
                                </td>
                                <td>
                                    <div className="pxp-dashboard-table-options">
                                        <ul className="list-unstyled">
                                            
                                            <li><button 
                                            onClick={()=>handleShowPreview(id)}
                                            title="Preview"><span className="fa fa-eye"></span></button></li>
                                            <li><button
                                            onClick={()=>removeIt(id)}
                                            title="Delete">
                                                {
                                                    sending===id?
                                                    <Spinner animation="border" variant="success" size="sm"/>
                                                    :
                                                    <span className="fa fa-trash-o"></span>
                                                }
                                                </button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        );
                      })}
                               
                            </tbody>
                            }
                        </table>

                        <div className="row mt-4 mt-lg-5 w-100 justify-content-between align-items-center">
                            <div className="col-auto">
                                <nav className="mt-3 mt-sm-0" aria-label="Jobs list pagination">
                                    <ul className="pagination pxp-pagination">
                                        {
                                            pages.length>1?
                                            pages.map((page,index)=> {
                                                return (
                                                    <li key={index}
                                                    //add class active if the page is active
                                                    className={page === activePage ? "page-item active" : "page-item"}
                                                    onClick={()=>{requestJobsData(page),setActivePage(page)}}>
                                                    <span className="page-link">{page}</span>
                                                    </li>
                                                );
                                            }):null
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Modal dialogClassName="my-modal" centered={true}
                 show={preview} onHide={handleClosePreview} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                        <JobDetails id={preview}/>
                    {/* <Modal.Footer>
                        <button className="btn btn-secondary
                        " onClick={handleClosePreview}>Close</button>
                        <Link to={`${preview}`}><button className="btn btn-primary" onClick={handleClosePreview}>Edit</button></Link>
                    </Modal.Footer> */}
                </Modal>
                
            </div>
            )
            }

export default CondadateFavourites;