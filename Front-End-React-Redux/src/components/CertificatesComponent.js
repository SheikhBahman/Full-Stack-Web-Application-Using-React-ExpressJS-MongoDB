import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

    function RenderCertificatesItem({ certificate, onClick }) {
        return(
            <Card>
                <Link to={`/certificates/${certificate._id}`} >
                    <CardImg width="100%" src={baseUrl + certificate.image} alt={certificate.name} />
                    <CardImgOverlay>
                        <CardTitle>{certificate.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        );
    }
    const Certificates = (props) => {
       
        const certificates = props.certificates.certificates.map((certificate) => {
            return (
                <div key={certificate._id} className="col-12 col-md-5 m-1">
                    <RenderCertificatesItem certificate={certificate} />
                </div>
            );
        });

        if (props.certificates.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.certificates.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.certificates.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>All-Certificates</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Certificates</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {certificates}
                    </div>
                </div>
            );
    }

export default Certificates;