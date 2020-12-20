import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import emailjs from 'emailjs-com';
import timediff from 'timediff';


// import {db} from './Firebase';
import './App.css';

const MyForm = ({template}) => {
    let { register, handleSubmit } = useForm();
    let {fields} = template;

    const [msg, setMsg] = useState('');

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

        const { name, source, destination, time, email } = values;
        const res =  await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${source}&destinations=${destination}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
        const duration = res.data.rows[0].elements[0].duration.text;
        let durationFinalArr = [0,0,0,0];
        let durationArr = duration.split(' ');
        durationArr.forEach((el, index) => {
            if(el === 'day' || el === 'days'){
                durationFinalArr[0] = Number(durationArr[index-1]);
            }
            if(el === 'hour' || el === 'hours'){
                durationFinalArr[1] = Number(durationArr[index-1]);
            }
            if(el === 'min' || el === 'mins'){
                durationFinalArr[2] = Number(durationArr[index-1]);
            }
            if(el === 'sec' || el === 'secs'){
                durationFinalArr[3] = Number(durationArr[index-1]);
            }
        }); 
        let durF = Math.round(durationFinalArr[0]*60*24 + durationFinalArr[1]*60 + durationFinalArr[2] + durationFinalArr[3]*(1/60));
        // let clickedTime = new Date().toTimeString().toString().slice(0,5);
        let clickedTime = (new Date().toISOString()).slice(0,10) + ' ' + (new Date().toTimeString()).slice(0,8);
        let t = time.split('T').join(' ') + ':00';
        const fd = timediff(new Date(),time);

        const fdInMin = Math.round(fd.hours*60 + fd.minutes + (fd.seconds/60)) ;

        const x = fdInMin - durF;
        if(x < 0) {
            setMsg('You are delayed!');
        } else if(x > 0) {
            setMsg('You have ' + (x) + ' minutes left to start the journey'); 
        }
        
        const result = {
            name: name,
            source : source, 
            destination : destination, 
            t : t, 
            email : email, 
            clickedTime : clickedTime,
            msg: msg
        };

        
        console.log(result);
        
        
        // await axios({
        //     url: 'http://localhost:8080/api/data',
        //     method: 'POST',
        //     data: result
        // })
        // .then(() => {
        //     console.log('DATA SENT TO SERVER');
        //     window.location.reload();
        //     // setMsg('');
        // })
        // .catch(()=>console.log('INTERNAL SERVER ERROR! : FROM REACT'));
        
        const data = await axios({
                url: 'http://localhost:8080/',
                method: 'GET'
            });
            console.log(data.data);
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



















//!
//!firebase code
// db.ref('/info').push({ source, destination, time, email, clickedTime, durF}); 
        // emailjs.sendForm('mail_service', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });







        // source, destination, time, email, clickedTime
        // var clickedTime = new Date('2020-12-20T16:53'),
        //     time = new Date('2020-12-21T16:53'),
        //     clickedTimeInSeconds = clickedTime.getTime() / 1000,
        //     timeInSeconds = time.getTime() / 1000,
        //     difference = Math.abs(clickedTimeInSeconds - timeInSeconds);

        //     const timeArr = [0,0,0];

        // if (difference < 60) {
        //     timeArr[2] = difference;
        // } else if (difference < 3600) {
        //     timeArr[1] = Math.floor(difference / 60);
        // } else {
        //     timeArr[0] = Math.floor(difference / 3600);
        // }

        // console.log(timeArr);








        // const ta = time.split(':').map((el) => Number(el));
        // const cta = clickedTime.split(':').map((el) => Number(el));

        // console.log(ta);
        // console.log(cta);
        // var resT = [0,0];
        // let resT = [];

        // if(cta[0] > ta[0]) {
        //     console.log('delay');
        // } 
        // else if (cta[0] < ta[0]) {
        //     if(cta[1]<ta[1]) {
        //         resT[0] = ta[0] - cta[0];
        //         resT[1] = ta[1] - cta[1];
        //     } else if(cta[1]>ta[1]) {
        //         ta[0]--;
        //         resT[1] = ta[1]+ 60 - cta[1];
        //         resT[0] = ta[0] - cta[0];
        //     }
        // };

        // const timeDiff = (resT[0] * 60 + resT[1]);
//!




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















    // let duration = '2 days 3 hours 4 mins';
    // let durationFinalArr = [0,0,0,0];
    // let durationArr = duration.split(' ');
    // durationArr.forEach((el, index) => {
    //     if(el === 'day' || el === 'days'){
    //         durationFinalArr[0] = durationArr[index-1];
    //     }
    //     if(el === 'hour' || el === 'hours'){
    //         durationFinalArr[1] = durationArr[index-1];
    //     }
    //     if(el === 'min' || el === 'mins'){
    //         durationFinalArr[2] = durationArr[index-1];
    //     }
    //     if(el === 'sec' || el === 'secs'){
    //         durationFinalArr[3] = durationArr[index-1];
    //     }
    // }); 
    // console.log(durationFinalArr);