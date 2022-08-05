const Filtter = () => {
  return (
    <div className="pxp-jobs-list-side-filter pxp-with-details">
      <div className="pxp-list-side-filter-header d-flex d-xxl-none">
        <div className="pxp-list-side-filter-header-label">Filter Jobs</div>
        <a role="button" href="/">
          <span className="fa fa-sliders"></span>
        </a>
      </div>
      <div className="mt-4 mt-xxl-0 d-xxl-block pxp-list-side-filter-panel">
        <h3>Type of Employment</h3>
        <div className="list-group mt-2 mt-lg-3">
          <label className="list-group-item d-flex justify-content-between align-items-center pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Full Time
            </span>
            <span className="badge rounded-pill">56</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3 pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Part Time
            </span>
            <span className="badge rounded-pill">34</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3 pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Remote
            </span>
            <span className="badge rounded-pill">24</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Internship
            </span>
            <span className="badge rounded-pill">27</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Contract
            </span>
            <span className="badge rounded-pill">76</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Training
            </span>
            <span className="badge rounded-pill">28</span>
          </label>
        </div>

        <h3 className="mt-3 mt-lg-4">Experience Level</h3>
        <div className="list-group mt-2 mt-lg-3">
          <label className="list-group-item d-flex justify-content-between align-items-center">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              No Experience
            </span>
            <span className="badge rounded-pill">98</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3 pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Entry-Level
            </span>
            <span className="badge rounded-pill">44</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3 pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Mid-Level
            </span>
            <span className="badge rounded-pill">35</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Senior-Level
            </span>
            <span className="badge rounded-pill">45</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              Manager / Executive
            </span>
            <span className="badge rounded-pill">21</span>
          </label>
        </div>

        <h3 className="mt-3 mt-lg-4">Salary Range</h3>
        <div className="list-group mt-2 mt-lg-3">
          <label className="list-group-item d-flex justify-content-between align-items-center pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              $700 - $1000
            </span>
            <span className="badge rounded-pill">34</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3 pxp-checked">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              $1000 - $1200
            </span>
            <span className="badge rounded-pill">22</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              $1200 - $1400
            </span>
            <span className="badge rounded-pill">67</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              $1500 - $1800
            </span>
            <span className="badge rounded-pill">12</span>
          </label>
          <label className="list-group-item d-flex justify-content-between align-items-center mt-2 mt-lg-3">
            <span className="d-flex">
              <input
                className="form-check-input me-2"
                type="checkbox"
                value=""
              />
              $2000 - $3000
            </span>
            <span className="badge rounded-pill">26</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filtter;
