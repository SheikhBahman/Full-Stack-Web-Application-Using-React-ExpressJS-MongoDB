import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem} from 'reactstrap';


const FavoritesFailed = (props) => {   
     
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>My Favorites</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Authorization failed!</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <h4>Please sign-in to see your favorite certificates!</h4>
            </div>
        </div>
    );   
}

export default FavoritesFailed;