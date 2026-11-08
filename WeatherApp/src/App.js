import './App.css'
import './waterWaveEffect.css';
import axios from 'axios'; 
import { WiDaySnowWind } from "react-icons/wi";  // all
import { BsCloudsFill } from "react-icons/bs";  // full cloud
import { IoIosSunny } from "react-icons/io";  // sunny
import { WiNightPartlyCloudy } from "react-icons/wi";  // partialy cloud
import {useEffect, useState} from 'react';
function App() {
  const [weatherData, setWeatherData] = useState(null);
   const [useData , setData ] = useState("Quetta");
  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=48825f6ea94a46abbed81852241101 &q=${useData}&aqi=yes`)
    .then((res)=>{
      setWeatherData(res.data)
    })
    .catch((err)=>{console.log(err)})
  },[useData]);
  
  if (!weatherData) {
    
    return <div>Loading... 
      </div>;
  }
  const { location, current } = weatherData;
  const { name, country } = location;
  const {  text } = current.condition;
  const {temp_c ,humidity, is_day, wind_mph, pressure_mb} = current;
 var Status = '';
 var mosamStatus;
 var mosamColor;
  if(text ==='Sunny')
  {
   mosamStatus = <IoIosSunny/>
   mosamColor="yellow" 
  }
  else if(text ==='cloud')
  {
    mosamStatus= <BsCloudsFill /> 
    mosamColor="whitesmoke"
  }
  else if(text ==='Partly cloudy'){
    mosamStatus = <WiNightPartlyCloudy/>
  }else if(text ==='partly cloud'){
    mosamStatus = <WiNightPartlyCloudy/>
  }
  else{
    mosamColor= ""
  }

  if(is_day){
       Status = "day"
  }
  else{
    Status = "Night"
  }
  // console.log(useData.location.name);
  // console.log(nnnn);
  const handleInputChange = (event) => {
    setData(event.target.value);
  };
const handleButtonClick = ()=>{
  setData('');
}
  return (
    <div className='QuotesForm'>
      <div className='ovaloutside1'>
        <div className='ovaloutside2'>
          <div className='ovaloutside3'>
    <div className='QuotesFor'>     
    <input placeholder='search city name' className='searchbox' autoFocus
      value={useData}
      onChange={handleInputChange}
      />  <button onClick={handleButtonClick} className='clearBtn'>Clear</button>
    <h4> <WiDaySnowWind style ={{color:'whitesmoke', fontSize:35}} /> {name} {country}</h4>
      <h4>     </h4>
      <div style={{ fontWeight:'bolder'}}>      
     <p style={{color: `${mosamColor}` , fontSize:19}}>{mosamStatus} {text} </p></div>  <br />
     <p style={{float:'left', color:'white', fontSize:19}}> humidity : {humidity} <br/> Pressure: {pressure_mb} </p>
     <div className='oval1'>
     <div className='oval'> <div style={{ marginLeft:269, }}>Temperature : {temp_c} c | {Status} <br/>      
      Wind mph: {wind_mph} <br/>
    </div>
         </div> </div>
    </div>
    </div>
    </div>
    </div></div>
  );
}

export default App;
