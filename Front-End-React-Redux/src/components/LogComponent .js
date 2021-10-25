import React, { Component } from 'react';
import { Loading } from './LoadingComponent';


class Log extends Component {
    constructor(props) {
        super(props); 
        this.RenderLogItem = this.RenderLogItem.bind(this);       
    }
 
    RenderLogItem({ logItem, onClick }) {
        return(
            <li>{logItem.log + " " + logItem.createdAt}</li>            
        );
    }

    render() {    
        if (this.props.loggs.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.loggs.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>Error server log</h4>
                    </div>
                </div>
            );
        }
        else{            
            const log = this.props.loggs.loggs.map((logItem) => {
                return (
                    <div key={logItem._id} className="col-12 col-sm-12">
                        {this.RenderLogItem( logItem={logItem})}
                    </div>
                );
            });
            return (            
                    <ul>
                        {log}
                    </ul>                
            );
        }
    }
}

export default Log;