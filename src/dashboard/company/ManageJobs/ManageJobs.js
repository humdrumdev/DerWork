import statisticsService from "../../../services/statistics.service";
import { useEffect, useState } from "react";
import jobService from "../../../services/job.service";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import JobDetails from "../../../Components/Post/JobDetails";
import PageSelect from "../../../Components/PageSelect";
const ManageJobs = (props) => {

    const [jobsStatistics, setjobsStatistics] = useState({
        total_jobs: 0,
        total_applications: 0,
      });
      const [jobs, setjobs] = useState([]);
      const [pages, setPages] = useState([]);
      const [activePage, setActivePage] = useState(1);
      const [ids, setIds] = useState([]);
      const [status, setStatus] = useState("new");
      const [search, setSearch] = useState("");
      const [searchStatus, setSearchStatus] = useState("");
      const [loading, setLoading] = useState(true);
      const [reload, setReload] = useState(false);
      //modal open and close
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = (id) => setShow(id);
        const [preview, setPreview] = useState(false);
        const handleClosePreview = () => setPreview(false);
        const handleShowPreview = (id) => setPreview(id);

      useEffect(() => {
    
        requestjobsStatisticsData();
        requestJobsData(1);
      }, []);

      async function requestjobsStatisticsData() {
        try {
          await statisticsService.getJobsStatistics().then(
              (response) => {
                  console.log(response);
                  setjobsStatistics(response.data);
                  //set a page to each 10 jobs
                  
                const numberOfPages = Math.ceil(response.data.total_jobs/10);
                // const pages = [];
                // for (let index = 1; index <= numberOfPages; index++) {
                //     pages.push(index);
                // }
                // setPages(numberOfPages);

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
    
        // async function requestJobsData(page) {
        //     try {
        //         await jobService.getmyJobs({limit: 10,page,search,status:searchStatus}).then(
        //             (response) => {
        //                 console.log(response);
        //                 setjobs(response.data[0]);
                        
        //             },
        //             (error) => {
        //                 console.log(error);
        //             }
        //         );
        //     }
        //     catch (error) {
        //         console.log(error);
        //     }
        // }
        const requestJobsData =async  (page)=> {
            setActivePage(page);
            setReload(true);
            try {
                await jobService.getmyJobs({limit: 10,page,search,status:searchStatus}).then(
                    (response) => {
                        console.log(response);

                        setjobs(response.data[0]);
                        const numberOfPages = Math.ceil(response.data[1]/10);
                        setPages(numberOfPages);
                        setLoading(false);
                        setReload(false);
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

        //checkboxes for each job handle
        const handleCheckbox = (e, jobId) => {
            const { checked } = e.target;
            if (checked) {
                setIds([...ids, jobId]);
            } else {
                setIds(ids.filter((id) => id !== jobId));
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

        const handleDelete=()=>
        {
            jobService.deleteJobById(show).then(
                (response) => {
                    console.log(response);
                    
                    requestJobsData(activePage);
                    requestjobsStatisticsData();
                    handleClose();
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    return (
        <div >
                <h1>Manage Jobs</h1>
                <p className="pxp-text-light">Detailed list with all your job offers.</p>

                <div className="mt-4 mt-lg-5">
                    <div className="row justify-content-between align-content-center">
                        <div className="col-auto order-2 order-sm-1">
                            <div className="pxp-company-dashboard-jobs-bulk-actions mb-3">
                                <select 
                                onChange={(e) => setStatus(e.target.value)}
                                onBlur={(e) => setStatus(e.target.value)}
                                value={status}
                                className="form-select">
                                    <option value="new">New</option>
                                    <option value="active">Active</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <button className="btn ms-2" onClick={handleSubmit}>Apply</button>
                            </div>
                        </div>
                        <div className="col-auto order-1 order-sm-2">
                            <div className="pxp-company-dashboard-jobs-search mb-3">
                                <div className="pxp-company-dashboard-jobs-search-results me-3">{jobsStatistics.total_jobs} jobs</div>
                                <div className="pxp-company-dashboard-jobs-search-search-form">
                                    <div className="input-group">
                                        <span className="input-group-text"><span className="fa fa-search"></span></span>
                                        <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="text" className="form-control" placeholder="Search jobs..."/>
                                        <select 
                                        onChange={(e) => setSearchStatus(e.target.value)}
                                        onBlur={(e) => setSearchStatus(e.target.value)}
                                        value={searchStatus}
                                        className="form-control">
                                            <option value="">All</option>
                                            <option value="new">New</option>
                                            <option value="active">Active</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn rounded-pill pxp-nav-btn ms-2" onClick={handleSearch}>Search</button>

                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        {
                            loading ?
                            <div className="text-center w-100  py-5">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                                :
                                <div>
                                    <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th className="pxp-is-checkbox"  style={{width:"1%"}}><input type="checkbox" className="form-check-input"/></th>
                                    <th style={{width:"25%"}}>Job</th>
                                    <th style={{width:"20%"}}>Category</th>
                                    <th style={{width:"12%"}}>Type</th>
                                    <th style={{width:"15%"}}>Applications</th>
                                    <th>Date<span className="fa fa-angle-up ms-3"></span></th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                            { 
                            reload ?
                            <div className="text-center w-100  py-5" style={{displat:"table-caption"}}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            jobs.map((application) => {
                        const {
                          id,
                          jobTitle,
                          status
                          //jobDescription,userId
                        } = application;
                        return (
                                <tr key={id}>
                                <td><input type="checkbox"
                                onChange={(e) => handleCheckbox(e, id)}
                                className="form-check-input"/></td>
                                <td>
                                    <a href="/">
                                        <div className="pxp-company-dashboard-job-title">{jobTitle}</div>
                                        <div className="pxp-company-dashboard-job-location"><span className="fa fa-globe me-1"></span>San Francisco, CA</div>
                                    </a>
                                </td>
                                <td><div className="pxp-company-dashboard-job-category">Software Engineering</div></td>
                                <td><div className="pxp-company-dashboard-job-type">Full-time</div></td>
                                <td><a href="/" className="pxp-company-dashboard-job-applications">3 Candidates</a></td>
                                <td>
                                    <div className="pxp-company-dashboard-job-status"><span className="badge rounded-pill bg-success">{status}</span></div>
                                    <div className="pxp-company-dashboard-job-date mt-1">2020/08/24 at 11:56 am</div>
                                </td>
                                <td>
                                    <div className="pxp-dashboard-table-options">
                                        <ul className="list-unstyled">
                                            <li><Link to={`${id}`} className="pxp-link-primary"><button 
                                            title="Edit"><span className="fa fa-pencil"></span></button></Link>
                                                {/* <button 
                                            title="Edit"><span className="fa fa-pencil"></span></button> */}
                                            </li>
                                            <li><button 
                                            onClick={()=>handleShowPreview(id)}
                                            title="Preview"><span className="fa fa-eye"></span></button></li>
                                            <li><button
                                            onClick={()=>handleShow(id)}
                                            title="Delete"><span className="fa fa-trash-o"></span></button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        );
                      })}
                               
                            </tbody>
                        </table>

                        <div className="row mt-4 mt-lg-5 w-100 justify-content-between align-items-center">
                            <div className="col-auto">
                                {/* <nav className="mt-3 mt-sm-0" aria-label="Jobs list pagination">
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
                                </nav> */}
                                <PageSelect pages={pages} active={activePage} handleClick={requestJobsData}/>
                            </div>
                        </div>
                                    </div>
                        }
                    </div>
                </div>
                <Modal centered={true} show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title className="mt-4 mx-4">Delete Job</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this job?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </Modal.Footer>
                </Modal>
                <Modal dialogClassName="my-modal" show={preview} onHide={handleClosePreview} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                        <JobDetails id={preview}/>
                    <Modal.Footer>
                        <button className="btn btn-secondary
                        " onClick={handleClosePreview}>Close</button>
                        {/* edit */}
                        <Link to={`${preview}`}><button className="btn btn-primary" onClick={handleClosePreview}>Edit</button></Link>
                    </Modal.Footer>
                </Modal>
            </div>
            )
            }

export default ManageJobs;