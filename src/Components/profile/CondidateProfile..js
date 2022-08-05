import { Component } from "react";
import userService from "../../services/user.service";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";
import CompanyContact from "./Components/CompanyContact";
import HeaderProfile from "./Components/HeaderProfile";
import UserInfo from "./Components/UserInfo";
import CompanyInfo from "./Components/CompanyInfo";
import ContactForm from "./Components/ContactForm";
import UserContact from "./Components/UserContact";
import authService from "../../services/auth/auth.service";
import NotFound from "../../pages/404/NotFound";
import { Spinner } from "react-bootstrap";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
// function GetId()
// {
//     const id = useParams();
//     return id;
// }

export class CandidateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      user: {},
      me: {},
      loading: true,
      error: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.getUser();
    this.setState({ me: authService.getUserId() });
  }





  getUser() {
    userService.getUserFullDataById(this.props.router.params.id).then(data => {
      this.setState({ user: data.data, loading: false });
    }).catch(error => {
      this.setState({ error: true, loading: false, errorMessage: error.message });
    });
  }

  //update component when props change
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ props: this.props, loading: true });
      this.getUser();
    }
  }
  render() {
    return (
      this.state.loading ?
        <div className="spinner-container d-flex justify-content-center align-items-center
      " style={{ height: '100vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
        :
        this.state.error ? <NotFound></NotFound> :
          (
            <div>
              <section>
                <div className="pxp-container">
                  <div className="pxp-single-candidate-container">
                    <div className="row justify-content-center">
                      <div className="col-xl-9">
                        <HeaderProfile user={this.state.user} />
                        <div className="row mt-4 mt-lg-5">
                          <div className="col-lg-7 col-xxl-8">


                            {
                              this.state.user.isCompany ?
                                <CompanyInfo company={this.state.user} />
                                :
                                <UserInfo user={this.state.user} />

                            }
                          </div>
                          <div className="col-lg-5 col-xxl-4">
                            {
                              this.state.user.isCompany ?
                                <CompanyContact company={this.state.user} />
                                :
                                <UserContact user={this.state.user} />

                            }
                            {this.state.me && this.state.me !== this.state.user.id
                              ? <ContactForm id={this.state.user.id} name={this.state.user.isCompany ? this.state.user.companyname : this.state.user.first_name} /> : null}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
    );
  }

}

export default withRouter(CandidateProfile);
