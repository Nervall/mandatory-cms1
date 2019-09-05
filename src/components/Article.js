import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import Header from './header.js'
import { Link } from "react-router-dom";
import '../App.css';
const ReactMarkdown = require('react-markdown')

function Article(props) {
  const id = props.match.params.id;
  const [data, updateData] = useState([]);

  useEffect( () => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/article';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    axios.get(API_ROOT + token)
    .then((response) => {
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
  }, [id]
  );

  let renderArticle = (
    data.map( article => {
      if (article._id === id) {
        return(
        <div key={ article._id } className="article_container">
          <h3 className="home-main-header">{ article.title }</h3>
          { (article.author || []).map(authorName => <div key={ article._id }>{ authorName.display }</div>)}
          <p>{ article.published__on }</p>
          <ReactMarkdown>{ article.body }</ReactMarkdown>
       </div>
        )}
        return null;
    })
  )

  return (
    <div>
      <Header />
      <main>
       { renderArticle }
      </main>
      <Link to="/" className="link-button"><button>Back</button></Link>
      <footer>
      </footer>
    </div>
  );
}

export default Article;