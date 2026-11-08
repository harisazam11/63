// import logo from './logo.svg';
import './App.css';
import axios from 'axios';  // need to install axios
import {useEffect, useState} from 'react';

function App() {
   const [useData , setData ] = useState([]);
  //  const [useDa , setDa ] = useState();
  const [randomObject, setRandomObject] = useState();
  

  useEffect(() => {
    axios.get('http://localhost:8081/Quotes')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>{console.log(err)})    
  },[]);
  


  
  const getRandomItem = () => {
    const randomIndex = Math.floor(Math.random() * useData.length);
    return useData[randomIndex];
  };

    //  const firstTimeData = getRandomItem();
  const handleButtonClick = () => {
    const newRandomObject = getRandomItem();
    setRandomObject(newRandomObject);
  };

  return (
    <div className='QuotesForm'>
    <div className='QuotesFor'>
      <h1>  Quotes App</h1> 
         {/* {useData[dd].quote} */}
         {randomObject ? (
          <div>
        <p> {randomObject.quote}</p>
        <p style={{color:'black', float:'right'}}> by {randomObject.author}</p></div>
      ) : (
        <p> Care your word because word is stronger than sword</p>
        )}      
    </div>
    <button onClick={handleButtonClick} className='button'> Next</button>
    </div>
  );
}

export default App;
