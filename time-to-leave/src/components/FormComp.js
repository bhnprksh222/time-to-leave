import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './App.css';
// import Data from '../data.json';

const MyForm = ({template}) => {
    let { register, handleSubmit } = useForm();
    let {fields} = template;


    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, name, icon, placeholder } = field;
            return (
                <div className="labelField" key={name}>
                    <label htmlFor={name}>{title}<i className={icon}></i>: </label>
                    <input type={type} name={name} id={name} placeholder={placeholder} ref={register} required/>
                </div>
            )
        })
    };

    const onSubmit = async (values) => {
        // console.log(values);
        // axios
        //     .post(`${__dirname}/../data.json`, values)
        //     .then(response => console.log(response))
        //     .catch(error => console.log(error));
        // const { source, destination, time, email } = values;
        const { source, destination } = values;
        const KEY = 'AIzaSyAW8v9wOOvEviACg4YbowQEQn0SLplfOJM';
        // console.log(source);
        const res = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${source}&destinations=${destination}&key=${KEY}`);
        // const duration = res.data.rows[0].elements[0].duration.text.match(/\d+/gm).map(Number);
        const duration = res.data.rows[0].elements[0].duration.text;
        // let durationArr = [0,0,0,0];
        // let separatedArr = 
        // if((duration.match(/min/gm)) === 'min'){
        //     durationArr[2] = Number(duration.match(/\d+/gm)[0]);
        // }
        console.log(duration);
    };
    
    return (
        <div>
            <form className="ui form" id="timeForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="field" key={Math.random}>
                    {renderFields(fields)}
                </div>
                <div className="Button">
                    <button className="ui inverted primary button" type="submit">Remind Me</button>
                </div>
            </form>
        </div>
    );
};



export default MyForm;











    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         source: ``,
    //         destination: ``,
    //         time: ``,
    //         email: ``
    //     }
    // }
    // const [source, setSource] = useState(``);
    // const [destination, setDestination] = useState(``);
    // const [time, setTime] = useState(``);
    // const [email, setEmail] = useState(``);

    // const getResults = (event) => {
    //     event.preventDefault();
    //     let source = this.state.source;
    //     let destination = this.state.destination;
    //     let time = this.state.time;
    //     let email = this.state.email;
    //     console.log(source, destination, time, email);
    //     this.setState({
    //         source:``,
    //         destination:``,
    //         time:``,
    //         email:``
    //     });
    // }

    // const getSource = (event) => {
    //     setSource("");
    //     setSource(event.target.value);
    // }
    
    // const getDestination = (event) => {
    //     setDestination(event.target.value);
    // }
    
    // const getTime = (event) => {
    //     setTime(event.target.value);
    // }
    
    // const getEmail = (event) => {
    //     setEmail(event.target.value);
    // }


    /* <div className="labelField">
        <label htmlFor="source">Source <i className="flag icon"></i>: </label>
        <input ref={register} type="text" name="source" id="source" placeholder="12.927880, 77.627600" required/>
    </div>
    <div className="labelField">
        <label htmlFor="destination">Destination <i className="flag checkered icon"></i>: </label>
        <input  type="text" placeholder="13.035542, 77.597100" required/>
    </div>
    <div className="labelField">
        <label htmlFor="time">Time <i className="clock icon"></i></label>
        <input  type="time" required></input>
    </div>
    <div className="labelField">
        <label htmlFor="email">Email <i className="envelope open icon"></i>:</label>
        <input  type="email" placeholder="john@email.com" required/>
    </div> */