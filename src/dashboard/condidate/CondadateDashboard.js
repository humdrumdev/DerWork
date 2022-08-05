import statisticsService from "../../services/statistics.service";
import { useEffect, useState } from "react";
import applicationService from "../../services/application.service";
import messageService from "../../services/messages.service";
import notificationService from "../../services/notifications.service";
const CondadateDashboard = () => {
    const [messages, setMessages] = useState(0);
    const [notifications, setNotifications] = useState(0);

    const [jobsStatistics, setjobsStatistics] = useState({
        total_jobs: 0,
        total_applications: 0,
    });
    const [applications, setapplications] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data } = await messageService.getUnreadMessagesCount();
            setMessages(data);
        };
        const fetchNotifications = async () => {
            const { data } = await notificationService.getUreadedNotificationsCount();
            setNotifications(data);
        };
        fetchMessages();
        fetchNotifications();
        requestjobsStatisticsData();
        requestApplicationsData();
    }, []);
    async function requestjobsStatisticsData() {
        try {
            await statisticsService.getJobsStatistics().then(
                (response) => {
                    console.log(response);
                    setjobsStatistics(response.data);
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

    async function requestApplicationsData() {
        try {
            await applicationService.getJobsApplications({ start: 0 }).then(
                (response) => {
                    console.log(response);
                    setapplications(response.data);
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
            <h1>Dashboard</h1>
            <div className="row mt-4 mt-lg-5 align-items-center">
                <div className="col-sm-6 col-xxl-3">
                    <div className="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
                        <div className="pxp-dashboard-stats-card-icon text-primary">
                            <span className="fa fa-file-text-o"></span>
                        </div>
                        <div className="pxp-dashboard-stats-card-info">
                            <div className="pxp-dashboard-stats-card-info-number">{jobsStatistics.total_jobs}</div>
                            <div className="pxp-dashboard-stats-card-info-text pxp-text-light">Job applications</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xxl-3">
                    <div className="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
                        <div className="pxp-dashboard-stats-card-icon text-success">
                            <span className="fa fa-eye"></span>
                        </div>
                        <div className="pxp-dashboard-stats-card-info">
                            <div className="pxp-dashboard-stats-card-info-number">{jobsStatistics.total_applications}</div>
                            <div className="pxp-dashboard-stats-card-info-text pxp-text-light">Profile visits</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xxl-3">
                    <div className="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
                        <div className="pxp-dashboard-stats-card-icon text-warning">
                            <span className="fa fa-envelope-o"></span>
                        </div>
                        <div className="pxp-dashboard-stats-card-info">
                            <div className="pxp-dashboard-stats-card-info-number">{messages}</div>
                            <div className="pxp-dashboard-stats-card-info-text pxp-text-light">Unread messages</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-xxl-3">
                    <div className="pxp-dashboard-stats-card bg-primary bg-opacity-10 mb-3 mb-xxl-0">
                        <div className="pxp-dashboard-stats-card-icon text-danger">
                            <span className="fa fa-bell-o"></span>
                        </div>
                        <div className="pxp-dashboard-stats-card-info">
                            <div className="pxp-dashboard-stats-card-info-number">{notifications}</div>
                            <div className="pxp-dashboard-stats-card-info-text pxp-text-light">Notifications</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 mt-lg-5">
                <h2>Recent Candidates</h2>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <tbody>
                            {applications.map((application) => {
                                const {
                                    id,
                                    user,
                                    job,
                                    //jobDescription,userId
                                } = application;
                                return (
                                    <tr key={id}>
                                        <td style={{ width: "3%" }}><div className="pxp-company-dashboard-candidate-avatar pxp-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + user.photo})` }}></div></td>

                                        <td style={{ width: "25%" }}><div className="pxp-company-dashboard-candidate-name">{user.first_name + " " + user.last_name}</div></td>
                                        <td><div className="pxp-company-dashboard-candidate-location"><span className="fa fa-globe"></span>Casablanca, Ma</div></td>

                                        <td style={{ width: "25%" }}><div className="pxp-company-dashboard-candidate-location">{job.jobTitle}</div></td>

                                        <td>
                                            <div className="pxp-dashboard-table-options">
                                                <ul className="list-unstyled">
                                                    <li><button title="View profile"><span className="fa fa-eye"></span></button></li>
                                                    <li><button title="Send message"><span className="fa fa-envelope-o"></span></button></li>
                                                    <li><button title="Delete"><span className="fa fa-ban"></span></button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody> </table>
                </div>
            </div>
        </div>
    )
}
export default CondadateDashboard;