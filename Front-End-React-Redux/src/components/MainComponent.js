import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Certificates from './CertificatesComponent';
import Contact from './ContactComponent';
import CertificateDetail from './CertificatedetailComponent';
import Favorites from './FavoriteComponent';
import FavoritesFailed from './FavoriteFailedComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchCertificates, fetchLoggs, deleteLoggs, fetchComments, fetchPromos, fetchLeaders, signupUser, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      certificates: state.certificates,
      loggs: state.loggs,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders,
      favorites: state.favorites,
      auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (certificateId, rating, comment) => dispatch(postComment(certificateId, rating, comment)),
  fetchCertificates: () => {dispatch(fetchCertificates())},
  fetchLoggs: () => {dispatch(fetchLoggs())},
  deleteLoggs: () => dispatch(deleteLoggs()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()), 
  signupUser: (creds) => dispatch(signupUser(creds)),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (certificateId) => dispatch(postFavorite(certificateId)),
  deleteFavorite: (certificateId) => dispatch(deleteFavorite(certificateId))
});

class Main extends Component {

  
  componentDidMount() {
    this.props.fetchCertificates();
    this.props.fetchLoggs();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {

    const HomePage = () => {
      return(
        <Home certificate={this.props.certificates.certificates.filter((certificate) => certificate.featured)[0]}
          certificatesLoading={this.props.certificates.isLoading}
          certificatesErrMess={this.props.certificates.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const CertificateWithId = ({match}) => {
      return(
        this.props.auth.isAuthenticated
        ?
        <CertificateDetail certificate={this.props.certificates.certificates.filter((certificate) => certificate._id === match.params.certificateId)[0]}
          isLoading={this.props.certificates.isLoading}
          errMess={this.props.certificates.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.certificate === match.params.certificateId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}          
          favorite={this.props.favorites.favorites && this.props.favorites.favorites.certificates.some((certificate) => certificate._id === match.params.certificateId)}
          postFavorite={this.props.postFavorite}
          />
        :
        <CertificateDetail certificate={this.props.certificates.certificates.filter((certificate) => certificate._id === match.params.certificateId)[0]}
          isLoading={this.props.certificates.isLoading}
          errMess={this.props.certificates.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.certificate === match.params.certificateId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          favorite={false}
          postFavorite={this.props.postFavorite}
          />
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (      
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          :      
          <FavoritesFailed/>
      )} />
    );
   
    return (      
      <div>      
        <Header auth={this.props.auth}          
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} 
          signupUser={this.props.signupUser} 
          />   
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path='/aboutme' component={() => <About leaders={this.props.leaders} />} />
              <Route exact path="/certificates" component={() => <Certificates certificates={this.props.certificates} />} />
              <Route path="/certificates/:certificateId" component={CertificateWithId} />
              <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
              <Route exact path="/contactme" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
