import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.css';

function Home() {

  const [data, updateData] = useState([]);

  useEffect(() => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/article';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    axios.get(API_ROOT + token)
      .then((response) => {
        console.log(response.data.entries);
        updateData(response.data.entries);
      })
      /*
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        if (error.response.status === 404) {
        } 
        */
  },[]);

  let renderAllArticle = (
    data.map(article => {
      return(
        <div key={article._id} className="home-article-container">
          <h3><Link to={"/article/" + article._id }>{ article.title }</Link></h3>
          { (article.author || []).map(authorName => <p key={article._id}><Link to={"/author/" + article._id}>{ authorName.display }</Link></p>)}
          <p>{ article.published__on }</p>
        </div>
      )
    })
  );

  return (
    <div>
      <header>
        header
      </header>
      <main>
        { renderAllArticle }
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default Home;