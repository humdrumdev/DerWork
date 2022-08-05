import statisticsService from "../../../services/statistics.service";
import { useEffect, useState } from "react";
import applicationService from "../../../services/application.service";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import ApplicationDetails from "./ApplicationDetails";
import draftToHtml from "draftjs-to-html";

const ManageApplications = (props) => {

    const [applicationsStatistics, setapplicationsStatistics] = useState(0);
    const [applications, setapplications] = useState([]);
    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [ids, setIds] = useState([]);
    const [status, setStatus] = useState("new");
    const [search, setSearch] = useState("");
    const [searchStatus, setSearchStatus] = useState("");
    //modal open and close
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => setShow(id);
    const [preview, setPreview] = useState(false);
    const handleClosePreview = () => setPreview(false);
    const handleShowPreview = (id) => setPreview(id);

    useEffect(() => {
        requestApplicationsData(1);
    }, []);

    async function requestapplicationsStatisticsData() {
        try {
            await statisticsService.getJobsStatistics().then(
                (response) => {
                    console.log(response);
                    setapplicationsStatistics(response.data);
                    //set a page to each 10 applications

                    const numberOfPages = Math.ceil(response.data.total_applications / 10);
                    const pages = [];
                    for (let index = 1; index <= numberOfPages; index++) {
                        pages.push(index);
                    }
                    setPages(pages);

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

    async function requestApplicationsData(page) {
        try {
            await applicationService.getJobCreatorApplications({ limit: 10, page, search, status: searchStatus }).then(
                (response) => {
                    setapplications(response.data[0]);
                    setapplicationsStatistics(response.data[1]);
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

    //checkboxes for each application handle
    const handleCheckbox = (e, applicationId) => {
        const { checked } = e.target;
        if (checked) {
            setIds([...ids, applicationId]);
        } else {
            setIds(ids.filter((id) => id !== applicationId));
        }
    }

    //submit checked applications
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(ids);
        if (ids.length > 0) {
            applicationService.changeStatus(ids, status).then(
                (response) => {
                    console.log(response);
                    setIds([]);
                    requestApplicationsData(activePage);
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    }

    //handle search
    const handleSearch = () => {
        requestApplicationsData(1)
    }

    const handleDelete = () => {
        applicationService.deleteApplicationById(show).then(
            (response) => {
                console.log(response);

                requestApplicationsData(activePage);
                requestapplicationsStatisticsData();
                handleClose();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div >
            <h1>Manage Applications</h1>
            <p className="pxp-text-light">Detailed list with all your application offers.</p>

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
                            <div className="pxp-company-dashboard-jobs-search-results me-3">{applicationsStatistics} applications</div>
                            <div className="pxp-company-dashboard-jobs-search-search-form">
                                <div className="input-group">
                                    <span className="input-group-text"><span className="fa fa-search"></span></span>
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        type="text" className="form-control" placeholder="Search applications..." />
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
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th className="pxp-is-checkbox" style={{ width: "1%" }}><input type="checkbox" className="form-check-input" /></th>
                                <th colSpan="2" style={{ width: "25%" }}>Name</th>
                                <th style={{ width: "20%" }}>Applied for</th>
                                <th style={{ width: "15%" }}>Status</th>
                                <th>Date<span className="fa fa-angle-up ms-3"></span></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application) => {
                                const {
                                    id,
                                    status,
                                    date,
                                    job,
                                    user
                                    //applicationDescription,userId
                                } = application;
                                return (
                                    <tr key={id}>
                                        <td><input type="checkbox" className="form-check-input" /></td>
                                        <td style={{ width: "3%" }}>
                                            <div className="pxp-company-dashboard-candidate-avatar pxp-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + user.photo})` }}></div>
                                        </td>
                                        <td>
                                            <Link to={`/${user.id}`}>
                                                <div className="pxp-company-dashboard-job-title">{user.first_name} {user.last_name}</div>
                                                <div className="pxp-company-dashboard-job-location"><span className="fa fa-globe me-1"></span>{user.city}, {user.country}</div>
                                            </Link>
                                        </td>
                                        <td><div className="pxp-company-dashboard-job-category">{job.jobTitle}</div></td>
                                        <td><div className="pxp-company-dashboard-job-status"><span className="badge rounded-pill bg-success">{status}</span></div></td>
                                        <td>
                                            <div className="pxp-company-dashboard-job-date">{date}</div>
                                        </td>
                                        <td>
                                            <div className="pxp-dashboard-table-options">
                                                <ul className="list-unstyled">
                                                    <li><button
                                                        type="button"
                                                        onClick={() => { handleShowPreview(id) }}
                                                        title="View profile"><span className="fa fa-eye"></span></button></li>
                                                    <li><button title="Send message"><span className="fa fa-envelope-o"></span></button></li>
                                                    <li><button title="Approve"><span className="fa fa-check"></span></button></li>
                                                    <li><button title="Reject"><span className="fa fa-ban"></span></button></li>
                                                    <li><button title="Delete"><span className="fa fa-trash-o"></span></button></li>
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
                            <nav className="mt-3 mt-sm-0" aria-label="Applications list pagination">
                                <ul className="pagination pxp-pagination">
                                    {
                                        pages.length > 1 ?
                                            pages.map((page, index) => {
                                                return (
                                                    <li key={index}
                                                        //add class active if the page is active
                                                        className={page === activePage ? "page-item active" : "page-item"}
                                                        onClick={() => { requestApplicationsData(page), setActivePage(page) }}>
                                                        <span className="page-link">{page}</span>
                                                    </li>
                                                );
                                            }) : null
                                    }
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Modal centered={true} show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title className="mt-4 mx-4">Delete Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this application?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </Modal.Footer>
            </Modal>
            <Modal dialogClassName="my-modal" show={preview} onHide={handleClosePreview} >
                <Modal.Header closeButton>
                </Modal.Header>
                <ApplicationDetails id={preview} />
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

export default ManageApplications;