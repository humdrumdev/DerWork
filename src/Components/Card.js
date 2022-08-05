const Card = (props) => {
  function interuptClick() {
    props.customClickEvent(props.id);
  }
  console.log("-----",props);
  return (
    <span //eslint-disable-line
      onClick={() => interuptClick()}
      className={`pxp-jobs-card-4 pxp-has-border ${props.active ? "active" : ""}`}
      id={`job-${props.id}`}
      data-bs-toggle="tab"
      data-bs-target={`#job-details-${props.id}`}
      role="tab"
      aria-controls={`job-details-${props.id}`}
      aria-selected="true"
    > 
      <div className="pxp-jobs-card-4-company-top ">
        <div className="pxp-jobs-card-4-company-logo bg-white" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + props.image}`}}></div>
        <div className="pxp-jobs-card-4-info">
          <div className="pxp-jobs-card-4-title">{props.title}</div>
          <div className="pxp-jobs-card-4-details">
            <div className="pxp-jobs-card-4-location pxp-text-light">
              <span className="fa fa-globe"></span>
              {props.location}
            </div>
            <div className="pxp-jobs-card-4-type">{props.type}</div>
          </div>
        </div>
      </div>
      <div className="pxp-jobs-card-4-company-bottom">
        <div className="pxp-jobs-card-4-category">
          <span className="pxp-jobs-card-4-company">{props.company}</span>
        </div>
        <div className="pxp-jobs-card-4-bottom-right">
          <span className="pxp-jobs-card-4-date pxp-text-light">
            {props.date.substring(0, 10).split("-").reverse().join("/")}, {props.date.substring(11, 16)}
          </span>
        </div>
      </div>
    </span>
  );
};

export default Card;
