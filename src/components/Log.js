import React, { Component } from 'react'

import {db} from './Firebase';
import './App.css'

class Log extends Component {

    constructor(props) {
        super(props);
        this.state = {infoList : []}
    }

    componentDidMount() {
        db.ref("info").on("value", snapshot => {
            let info = [];
            snapshot.forEach(snap => {
                info.push(snap.val());
            });
            this.setState({ infoList: info });
        });  
    }

    render() {
        return (
            <div>
                {this.state.infoList.map(data => {
                    return (
                        <div className="log">
                           <h4>At [{data.clickedTime}] requested to Google Maps API</h4>
                        </div>
                    )
                })}
            </div>
        )
    }
};

export default Log;
