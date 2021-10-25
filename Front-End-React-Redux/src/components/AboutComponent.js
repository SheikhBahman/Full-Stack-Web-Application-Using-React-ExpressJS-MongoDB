import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components';

function RenderLeader({leader}) {
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={baseUrl + leader.image} alt={leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>
    );

}

function LeaderList(props) {
    const leaders = props.leaders.leaders.map((leader) => {
        return (
            <Fade in key={leader._id}>
                <div className="col-12 mt-2">
                        <RenderLeader leader={leader} />
                </div>
            </Fade>
        );
    });
    if (props.leaders.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.leaders.errMess) {
        return(
            <div className="col-12"> 
                <h4>{props.leaders.errMess}</h4>
            </div>
        );
    }
    else {
        return (
            <Media list>
                <Stagger in>
                    {leaders}
                </Stagger>
            </Media>
        );
    }
}

function About(props) {
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Me</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Me</h3>
                    <hr />
                </div>                
            </div>
            <div className="row ">            
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">As human beings we are all keenly aware of our own mortality, but although we know we all have to die eventually, there is some small amount of comfort in knowing that maybe it's something we could all do together, as a team.
                                We can only constantly challenge ourselves to push the boundaries of what is possible, working in partnership to fulfil our mission of shaping a better world.
                                </p>
                                <footer className="blockquote-footer">Robert Brockway</footer>
                                <p className="mb-0">Most people never run far enough on their first wind to find out they’ve got a second. Give your dreams all you’ve got and you’ll be amazed at the energy that comes out of you.</p>
                                <footer className="blockquote-footer">William James</footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Who am I?</h2>
                </div>
                <LeaderList leaders={props.leaders} />
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>The Base-line</h2>
                    <p>To carry out my share of responsibility to humanity and work towards a good cause I am always curious and open to new ideas in a constant quest of discovering how I can make things better either in my personal life or my profession. To reach my ambitions I continuously try to develop my skills by learning new things and broaden my views by working and interacting with a diverse range of people, reading books, and listening to music masterpieces.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Bahman Sheikh in a couple of sentences</CardHeader> 
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Mission</dt>
                                <dd className="col-6">Make a better world and promote humanity</dd>
                                <dt className="col-6">Occupation</dt>
                                <dd className="col-6">Software Engineer, Quantitative Data Modeler, Big data analyzer, Web developer, Cloud, Game</dd>                                
                                <dt className="col-6">Recent Skill</dt>
                                <dd className="col-6">Curious about Blockchain technology</dd>                                
                                <dt className="col-6">Hobby</dt>
                                <dd className="col-6">Play tennis, play the piano, listening to music masterpieces</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>                
            </div>
        </div>
    );
}

export default About;    