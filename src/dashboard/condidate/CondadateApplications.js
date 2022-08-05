import applicationService from "../../services/application.service";
import { useState, useEffect } from "react";
import PageSelect from "../../Components/PageSelect";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import ApplicationDetails from "../company/ManageApplications/ApplicationDetails";

const CondadateApplications = ()  =>{

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [reload, setReload] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => setShow(id);
    const [preview, setPreview] = useState(false);
    const handleClosePreview = () => setPreview(false);
    const handleShowPreview = (id) => setPreview(id);
    const getApplications = (page) => {
        setLoading(true);
        applicationService.getApplications(
            {
                page: page,
                search: "",
                limit: 10,
            }
        ).then(
            (response) => {
                setApplications(response.data);
                setLoading(false);
            }
            , (error) => {
                setLoading(false);
            }
        );
    }
    useEffect(() => {
        getApplications(1);
    }
    , []);


    const handlePageChange = (page) => {
        setCurrentPage(page);
        getApplications(page);
    }
    const handleDelete=()=>
    {
        // jobService.deleteJobById(show).then(
        //     (response) => {
        //         console.log(response);
                
        //         requestJobsData(activePage);
        //         requestjobsStatisticsData();
        //         handleClose();
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
    }

    return(
        <div>
                <h1>Applications</h1>
                <p className="pxp-text-light">Detailed list of your job applications.</p>

                <div className="mt-4 mt-lg-5">
                    {/* <div className="row justify-content-between align-content-center">
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
                    </div> */}
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
                                    <th style={{width:"35%"}}>Job</th>
                                    <th style={{width:"20%"}}>Company</th>
                                    <th style={{width:"12%"}}>Type</th>
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
                            applications.map((application) => {
                        const {
                          id,
                          job,
                          date
                          //jobDescription,userId
                        } = application;
                        return (
                                <tr key={id}>
                                <td><input type="checkbox"
                                onChange={(e) => handleCheckbox(e, id)}
                                className="form-check-input"/></td>
                                <td>
                                    <a href="/">
                                        <div className="pxp-company-dashboard-job-title">{job.jobTitle}</div>
                                        <div className="pxp-company-dashboard-job-location"><span className="fa fa-globe me-1"></span>{job.jobCity}, {job.jobCountryCode}</div>
                                    </a>
                                </td>
                                <td><div className="pxp-company-dashboard-job-category">
                                    <Link to={`/${job.userId}`} className="d-flex align-items-center">
                                    <div className="pxp-company-dashboard-candidate-avatar pxp-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + job.user.photo})` }}></div>
                                    <div className="pxp-company-dashboard-candidate-name m-3"> {job.user.companyname}</div>
                                    </Link>
                                </div></td>
                                <td><div className="pxp-company-dashboard-job-type">{job.jobType}</div></td>
                                <td>
                                    <div className="pxp-company-dashboard-job-date mt-1{">{date}</div>
                                </td>
                                <td>
                                    <div className="pxp-dashboard-table-options">
                                        <ul className="list-unstyled">
                                            {/* <li><Link to={`${id}`} className="pxp-link-primary"><button 
                                            title="Edit"><span className="fa fa-pencil"></span></button></Link>
                                            </li> */}
                                            <li><button 
                                            onClick={()=>handleShowPreview(id)}
                                            title="Preview"><span className="fa fa-eye"></span></button></li>
                                            {/* <li><button
                                            onClick={()=>handleShow(id)}
                                            title="Delete"><span className="fa fa-trash-o"></span></button></li> */}
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
                                <PageSelect pages={pages} active={currentPage} handleClick={handlePageChange}/>
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
                        <ApplicationDetails id={preview}/>
                </Modal>
            </div>
    )
}

export default CondadateApplications;