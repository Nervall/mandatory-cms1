import  React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import Logo from '../img/blog.jpg'

function Header() {
 return(
  <header>
  <span className="home-header-container"><img className="home-header-logo" src={ Logo } alt="logo" /></span>
  <span><Link className="home-header-link" to="/">Home</Link></span>
  <span><Link className="home-header-link" to="/author">Bloggare</Link></span>
</header>
 )
}

export default Header;