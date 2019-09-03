import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
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
      <button onClick={ handleBack }>Back</button><button onClick={ handleNext }>Next</button>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default Home;