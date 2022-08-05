const JobLabel = ({ title, value }) => {
    return (
        <div className="col-sm-6">
            <div>
                <div className="pxp-jobs-tab-pane-content-info-label pxp-text-light">
                    {title}
                </div>
                <div className="pxp-jobs-tab-pane-content-info-data">
                    {value}
                </div>
            </div>
        </div>
    )
}
export default JobLabel;