import axios from 'axios';
import {useEffect, useState} from 'react';
const NewsApi = () => {
  const [NewsData, setNewsData ] = useState(null);
  const [useData , setData ] = useState("cricket");
// aritciles data and id 
// const [articleData, setArticleData] = useState([]);



useEffect(() => {
    axios.get(`https://newsapi.org/v2/top-headlines?apiKey=4e7ec1e6ce8e494da88ca12888a23c74&q=${useData}`)
    .then(res=>{setNewsData(res.data)
        // setArticleData(res.data.articles);
    })
    .catch(err=>{console.log(err)})
}, [useData]);

if(!NewsData){
    return <div>loding .....</div>;
}


const {totalResults, articles } = NewsData;
const {author, content, urlToImage, title} = articles[0];
// if(NewsData){
//     return <div> Total Results : {NewsData.totalResults}</div>;
// }

const handleInputChange = (event) => {
    setData(event.target.value);
  };

const clearSearch = () => {
   setData('');
}
 

    return ( 

        <div className="position-absolute top-50 start-50 translate-middle " >
        <div className="card " style={{width: "50rem"}}>
        <div className="card-header">           
<div><input placeholder='Search News category' className="SearchBox" style={{width: "90%", height:"40px", borderRadius:'10px'}} autoFocus
      value={useData}
      onChange={handleInputChange}
      />  <button  className='btn btn-danger' style={{padding:'15px', borderRadius:'590px', opacity:0.8}} onClick={clearSearch}>Clear</button> </div>
  <img src={urlToImage} className="card-img-top " alt="click on more button"
  /> </div>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{content} written by: {author}</p>
    <button className="btn btn-primary" > More Data Article</button>
    Total Results : {totalResults} 
  </div>
</div>




{/* <div>
      {articleData.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          
        </div>
      ))}
    </div> */}








</div>
     );
}
 
export default NewsApi;