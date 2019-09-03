import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Header from './header.js'
import { Link } from "react-router-dom";
import '../App.css';

function Home() {

  const [data, updateData] = useState([]);
  const [skip, updateSkip] = useState(0);
  const [articlePosts, updateArticlePosts] = useState(0);

  useEffect(() => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/article';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    const pagination = '&limit=4&skip=' + skip
    axios.get(API_ROOT + token + pagination)
      .then((response) => {
        console.log(response.data.entries);
        updateArticlePosts(response.data.total)
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
  },[skip]);

  let handleBack = () => {
    if (skip > 0) {
      updateSkip(skip-4)
    }
    else {
      updateSkip(0)
    }
  }

  let handleNext = () => {
    if (skip < articlePosts-4) {
    updateSkip(skip+4)
    }
  }

  let renderAllArticle = (
    data.map(article => {
      return(
        <div key={article._id} className="home-article-container">
          <h3><Link to={"/article/" + article._id } className="home-main-header">{ article.title }</Link></h3>
          <img className="home-main-img" alt={ article.title } src={'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/'+ article.image.path}></img>
          { (article.author || []).map(authorName => 
          <div className="home-main-author-container" key={article._id}>Av: <Link className="home-main-author" to={"/author/" + article._id}>{ authorName.display }</Link>
          <span className="home-main-date">{ article.published__on }</span></div>)}
          
        </div>
      )
    })
  );

  return (
    <div>
      <Header></Header>
      <main>
        { renderAllArticle }
      </main>
      <button onClick={ handleBack }>Back</button><button onClick={ handleNext }>Next</button>
      <footer>
      </footer>
    </div>
  );
}

export default Home;