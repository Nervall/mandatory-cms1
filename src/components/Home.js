import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Header from './header.js'
import { Link } from "react-router-dom";
import '../App.css';

function Home() {

  const [data, updateData] = useState([]);
  const [skip, updateSkip] = useState(0);
  const [articlePosts, updateArticlePosts] = useState(0);
  const [disableBack, updateDisableBack] = useState(true);
  const [disableNext, updateDisableNext] = useState(false);
  const [search, updateSearch] = useState();
  const [value, updateValue] = useState();

  useEffect(() => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/article';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    const pagination = '&limit=4&skip=' + skip
    if (search) {
      updateValue('&filter[title][$regex]=' + search)
    } else {
      updateValue('');
    }
    axios.get(API_ROOT + token + pagination + value)
      .then((response) => {
        updateArticlePosts(response.data.total)
        updateData(response.data.entries);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        if (error) {
          console.log(error)
        }
      })
  },[skip, search, value]);

  useEffect( () => {
    if (skip === 0) {
      updateDisableBack(true);
      updateDisableNext(false)
    }
    else if (skip > articlePosts-4) {
      updateDisableNext(true);
      updateDisableBack(false)
    }
    else {
      updateDisableBack(false)
      updateDisableNext(false)
    }
  },[skip, articlePosts]
  );

  let handleBack = () => {
      updateSkip(skip-4)
  }

  let handleNext = () => {
    updateSkip(skip+4)
  }

  let handleSearch = (e) => {
    let searchValue = e.target.value;
    updateSearch(searchValue);
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
  
  if (data === null) {
    return (<p>Loading...</p>)
  }
  return (
    <div>
      <Header />
      <input type="text" name="search" placeholder="Sök titel..."  onChange={ handleSearch } />
      <main>
        { renderAllArticle }
      </main>
      <button disabled={ disableBack } onClick={ handleBack }>Back</button><button disabled={ disableNext } onClick={ handleNext }>Next</button>
      <footer>
      </footer>
    </div>
  );
}

export default Home;