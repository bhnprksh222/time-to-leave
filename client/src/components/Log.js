import React, { Component } from 'react';
import axios from 'axios';

// import {db} from './Firebase';
import './App.css'

class Log extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {infoList : []}
    // }

    state = {
        info: []
    }

    // componentDidMount() {
    //     db.ref("info").on("value", snapshot => {
    //         let info = [];
    //         snapshot.forEach(snap => {
    //             info.push(snap.val());
    //         });
    //         this.setState({ infoList: info });
    //     });  
    // }

    componentDidMount = () =>{
        this.getData();
    }

    getData = () => {
        axios.get('http://localhost:8080/')
        .then((response) => {
            const data = response.data;
            this.setState({info: data});
        })
        .catch((err) => console.log(err));
    }


    render() {
        return (
            <div key={Math.random}> 
            {
                this.state.info.map(data => {
                    return (
                        <div className="log">
                            <h4>[{data.clickedTime}] requested to Google Maps API by {data.name}</h4>
                        </div>
                    )
                })
            }
            </div>
        )
    }
};

export default Log;


// {this.state.infoList.map(data => 
//     {
//         return (
//             <div className="log">
//                 <h4>At [{data.clickedTime}] requested to Google Maps API</h4>
//             </div>
//         )
//     })
// }