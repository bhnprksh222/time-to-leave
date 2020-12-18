import React from 'react';

import MyForm from './MyForm';
import './App.css';

const App = () => {
    return (
        <>
            <div className="ui container">
                <h1>It's <span style={{color: '#54c8ff'}}>time</span> to leave!</h1>
                <MyForm />
            </div>
            <hr className="hr"/>
        </>
    );
}

export default App;

// const mapStyles = {
//     position: 'relative',  
//     width: '50%',
//     height: '50%'
// };
  
// export class MapContainer extends Component {
//     render() {
//     return (
//         <>
//             <div className="ui container">
//                     <h1>It's time to leave!</h1>
//                     <MyForm />
//             </div>
//             <Map
//             google={this.props.google}
//             zoom={14}
//             style={mapStyles}
//             initialCenter={
//                 {
//                     lat: -1.2884,
//                     lng: 36.8233
//                 }
//             }
//             />
//         </>
//     );
//     }
// };
  
// export default GoogleApiWrapper({
//     apiKey: ''
// })(MapContainer);


//AIzaSyAW8v9wOOvEviACg4YbowQEQn0SLplfOJM