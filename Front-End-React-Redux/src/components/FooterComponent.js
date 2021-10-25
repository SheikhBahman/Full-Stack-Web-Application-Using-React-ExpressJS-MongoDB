import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Log from './LogComponent ';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchLoggs, deleteLoggs } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {  
      loggs: state.loggs
    }
}

const mapDispatchToProps = (dispatch) => ({
  fetchLoggs: () => {dispatch(fetchLoggs())},
  deleteLoggs: () => dispatch(deleteLoggs())
});

class Footer extends Component {
    render() {      
        return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">    

                 <div className="col-12 col-sm-6">
                        <h3>Server Logs:</h3>
                        <p>Here you can see the front-end communications with the server (Express/MongoDB). Logs are being saved as a collection in a MongoDB table on the server side. Logs are coming back from the server you can send a REST: GET/DELETE request to fetch or delete logs:
                        &emsp;<Button className="button" type="submit" value="submit" color="primary" onClick={this.props.fetchLoggs}>Fetch</Button>&emsp;
                        <Button className="button" type="submit" value="submit" color="primary" onClick={this.props.deleteLoggs}>Reset</Button>
                        </p>
                        <div className="col-12 col-sm-12 serverLogs">
                            <Log loggs={this.props.loggs}/>
                        </div>
                    </div>         
                    <div className="col-4 col-sm-2">
                        <h3>Links:</h3>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/aboutme">About Me</Link></li>
                            <li><Link to="/certificates">All-Certificates</Link></li>
                            <li><Link to="/favorites">My Favorites</Link></li>
                            <li><Link to="/contactme">Contact Me</Link></li>
                        </ul>
                    </div>       
                   
                    <div className="col-12 col-sm-3 ">
                        <h3>Be in touch:</h3>
                        <div >
                            <a className="btn btn-social-icon btn-github" href="https://github.com/SheikhBahman"><i className="fa fa-github"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/bahman-sheikh-90922121b"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/bahman.sheikh.1"><i className="fa fa-facebook"></i></a>                            
                            <a className="btn btn-social-icon btn-twitter" href="https://twitter.com/SheikhBahman"><i className="fa fa-twitter"></i></a>
                            <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                            <a className="btn btn-social-icon" href="mailto:sheikh.bahman@gmail.com"><i className="fa fa-envelope-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© 2020 Bahman Sheikh</p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));