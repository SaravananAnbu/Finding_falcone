import React from 'react';
import history from '../history';
import isEmpty from 'lodash/isEmpty';

class GameResult extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            result: {}
        }
    }
    componentDidMount() {
        console.log(this.props);
        if(isEmpty(this.props.location.state)){
            history.push('/')
        }
    }
    
    render() {
        return (
            <div className="container-fluid text-center">
                <div className="row p-3">
                    <div className="col-12">
                        <h2>Finding Falcone </h2>	
                        <div className="mt-3">
                            { this.props.location.state.result.status === "success" ?
                                <p className="p-2">Success! Congratulations on Finding Falcone. King Shan is <br/> mightly pleased</p> :
                                <p>Sorry, Please try Again </p>
                            }
                        </div>
                        <hr/>
                        {
                            this.props.location.state.result.status === "success" &&
                            <div><p className="mb-0">Time Taken: {this.props.location.state.Time}</p>
                            <p>Place Found: {this.props.location.state.result.planet_name}</p></div>
                        }
                        <button className="btn btn-outline-secondary mb-3" onClick={() => history.push({ pathname: '/', state: { resetAll: true }})} >Start Again</button>
                    </div>
                </div>
            </div>     
        )
    }
}

export default GameResult;