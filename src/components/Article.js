import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.css';
const ReactMarkdown = require('react-markdown')

function Article(props) {
  const id = props.match.params.id;
  const [data, updateData] = useState([]);
  const [author, updateAuthor] = useState('')

  useEffect( () => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/article';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    axios.get(API_ROOT + token)
    .then((response) => {
      for (let article of response.data.entries) {
        if (article._id === id) {
          updateData(article)
          for (let x of article.author) {
            updateAuthor(x.display)
          }
        }
      }
    })
  }, [id]
  );

  return (
    <div>
      <header>
        header
      </header>
      <main>
       <div className="article_container">
        <h3>{ data.title }</h3>
        <p>{ author }</p>
        <p>{ data.published__on }</p>
        <p><ReactMarkdown>{ data.body }</ReactMarkdown></p>
       </div>
       <button><Link to="/">Back</Link></button>
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default Article;