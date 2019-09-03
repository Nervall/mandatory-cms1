import  React, { useState, useEffect }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.css';

function Author(props) {
  const id = props.match.params.id;
  console.log(id);
  const [data, updateData] = useState([]);
  
  useEffect( () => {
    const API_ROOT = 'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/api/collections/get/author';
    const token = '?token=cd1b9f1b2f3244b102788d356b2a6a';
    axios.get(API_ROOT + token)
    .then((response) => {
      console.log(response.data.entries);
      updateData(response.data.entries);
    })
  }, []
  );

  let renderAuthors = (
    data.map( author => {
      return ( 
        <div className="author-container">
          <h3>{ author.name }</h3>
          <img className="author-image" alt={ author.name } src={'http://ec2-13-53-135-13.eu-north-1.compute.amazonaws.com:8080/'+ author.avatar.path }></img>
          <p>{ author.description }</p>
        </div>
      )
    })
  )

  
  
  return (
    <div>
      <header>
        header
      </header>
      <main>
        { renderAuthors }
        <button><Link to="/">Back</Link></button>
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default Author;