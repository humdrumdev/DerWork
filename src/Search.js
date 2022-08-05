import React, { Component } from "react";
import SearchBar from "./Components/SearchBar";
import Card from "./Components/Card";
import Filtter from "./Components/Search/Filtter";
import JobDetails from "./Components/Post/JobDetails";
import jobService from "./services/job.service";
import Spinner from 'react-bootstrap/Spinner';
import PageSelect from "./Components/PageSelect";
import { Modal } from "react-bootstrap";
class Search extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleJobSearch = this.handleJobSearch.bind(this);
    this.requestJobsData = this.requestJobsData.bind(this);
    this.getQueryParams = this.getQueryParams.bind(this);
    this.state = {
      loading: true,
      jobId: 0,
      limit: 10,
      page: 1,
      pages: [],
      jobs: [],
      error: null,
    };
  }

    //function to get querys params
    getQueryParams(params) { 
    let query = {};
    for (let param of params) {
    let [key, value] = param.split('=');
    value = decodeURIComponent(value);
    query[key] = value;
    }
    return query;
    }

  //get jobs from the server
  async handleJobSearch(e) {
    // set url params
    if(e.search)
    window.history.pushState(
        {},
        "",
        `?search=${e.search}&city=${e.city}&categorie=${e.categorie}&countryCode=${e.countryCode}`
    );

    this.setState({
      loading: true,
    });
    e.limit = this.state.limit;
    e.page = this.state.page;
    console.log(e);
    try {
      await jobService.getJobs(e).then(
        (response) => {
          const numberOfPages = Math.ceil(response.data[1]/10);
          
          this.setState({
            loading: false,
            jobs: response.data[0],
            pages: numberOfPages,
          })
          if(window.innerWidth > 992)
          this.setState({
            jobId: response.data[0].length ? response.data[0][0].id : -1,
          })
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



  componentDidMount() {
    const query = this.getQueryParams(window.location.search.slice(1).split('&'));
    this.handleJobSearch({ page: this.state.page, search: query.search, city: query.city, categorie: query.categorie, countryCode: query.countryCode });
  }
  requestJobsData(page) {
    this.setState({
      page: page,
    });
    this.handleJobSearch({ page: page, Search: null, Location: null, categorie: null, filters: null });
  }

  handleClick(id) {
    // Changing state
    this.setState({ jobId: id });
  }
  render() {
    const { jobs, jobId, error, pages } = this.state;
    const query = this.getQueryParams(window.location.search.slice(1).split('&'));
    console.log(query);
    // const [jobId, setJobId] = useState("1");
    // const [jobs, setJobs] = useState([]);
    // useEffect(() => {
    //     requestJobs();
    // }, []);

    // async function requestJobs() {

    //     const response = await fetch;
    //     const data = await response.json();
    //     console.log(data);
    //     setJobs(data);
    // }
    // window.addEventListener('scroll', function (evt) {

    //   // This value is your scroll distance from the top
    //   var distance_from_top = document.documentElement.scrollTop;
    //   console.log(document.documentElement.scrollTop);
    
    //   // The user has scrolled to the tippy top of the page. Set appropriate style.
    //   if (distance_from_top === 400) {
    //     //id sticky
    //     // document.getElementById("sticky").style.position = "none";
    //   }
    
    //   // The user has scrolled down the page.
    //   if(distance_from_top > 0) {
    //     document.getElementById("sticky").style.position = "fixed";
    //     //top 
    //     document.getElementById("sticky").style.top = "100px";
    //   }
    
    // });
    return (
      <div>
        <React.Fragment></React.Fragment>

        <section className="pxp-page-header-simple">
          <div className="pxp-container">
            <h1>Search Jobs</h1>
            <div className="pxp-hero-subtitle pxp-text-light">
              Search your career opportunity through <strong>12,800</strong>{" "}
              jobs
            </div>
            <SearchBar searchCallback={this.handleJobSearch} search={query.search} city={query.city} country={query.country} countryCode={query.countryCode} categorie={query.categorie} />
          </div>
        </section>
        <section>
          <div className="pxp-container">
            {
              this.state.loading ?
                <div className="d-flex justify-content-center">
                  <Spinner animation="grow" />
                </div>
                :
                jobs.length > 0 ?

                  <div className="row">
                    <div className="col-lg-5 col-xl-4 col-xxl-4">
                      <div className="row">
                        {/* <div className="col-xxl-5">
                    <Filtter />
                  </div> */}
                        <div className="col-xxl-12">
                          <div
                            className="pxp-jobs-list-single-column nav mt-4 mt-xxl-0"
                            role="tablist"
                          >
                            {error ? <p>{error.message}</p> : null}
                            {jobs.map((job) => {
                              const {
                                // categorie: {id: 1, label: "ewe", icon: "wewe"}
                                // icon: "wewe"
                                // id: 1
                                // label: "ewe"
                                // createdAt: "2022-05-29T20:25:33.079Z"
                                // id: 2
                                // jobTitle: "Database Administrator, MSSQL (Bangkok based)"
                                // jobType: "Contract"
                                // user: {photo: "/users/image/2f7933007d2b2193ff0de6dde298f5d4.jpg"}
                                // photo: "/users/image/2f7933007d2b2193ff0de6dde298f5d4.jpg"
                                id,
                                jobTitle, 
                                jobType,
                                jobCity,
                                jobCountryCode,
                                user: { photo,companyname },
                                categorie: { label, icon },
                                createdAt,
                                // jobCategorie: { label },
                                

                                //jobDescription,userId
                              } = job;
                              return (
                                <Card
                                  customClickEvent={this.handleClick}
                                  key={id}
                                  id={id}
                                  title={jobTitle}
                                  image={job.user.photo}
                                  date={createdAt}
                                  type={jobType}
                                  company={companyname}
                                  categorie={label}
                                  location={jobCity+ ', ' +jobCountryCode}
                                  active={id == jobId}
                                />
                              );
                            })}

                          </div>
                          <div className="row mt-4 mt-lg-5 w-100 justify-content-center align-items-center">
                              <div className="col-auto">
                                  <PageSelect pages={pages} active={this.state.page} handleClick={this.requestJobsData}/>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-xl-8 col-xxl-8">
                      <div id="sticky" className="tab-content pxp-jobs-tab-content pxp-show mt-5">
                        {
                          jobId > 0  && window.innerWidth > 992 ?
                            <JobDetails id={jobId} />
                          :
                          <Modal fullscreen={true} show={jobId > 0} onHide={() => this.setState({ jobId: 0 })}>
                            <Modal.Header closebutton>
                            </Modal.Header>
                            <Modal.Body>
                            
                            <JobDetails id={jobId} />
                            </Modal.Body>
                            <Modal.Footer>
                              <button onClick={() => this.setState({ jobId: 0 })} className="btn rounded-pill pxp-nav-btn">
                                Close
                              </button>
                            </Modal.Footer>

                          </Modal>


                        }
                      </div>
                    </div>
                  </div>
                  :
                  <div className="pxp-jobs-list-single-column nav mt-4 mt-xxl-0" role="tablist">
                    <p>No jobs found</p>
                  </div>
            }

          </div>
        </section>
      </div>
    );
  }
}
export default Search;
