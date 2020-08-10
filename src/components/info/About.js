import React from 'react';
import image from "../../images/pp.jpg";

export default function() {
  return (
    <div className="container"> 
      <div className="text-center py-4">
        <img src={image} alt="aremieye ebi" className="rounded-circle z-depth-1-half about-img"/>
      </div>   
      <p className="py-2 about-text">Aremieye Ebimobowei Pius is a Software developer in Nigeria, specialized in back-end programming techonlogies like java and also front-end programming techonlogies namely; React, ES6, CSS, and Html. As an advocate for clean writing and maintaining codes, I love building application programming interfaces(API) and to seek challenges in creative design of new programming language which is eminent for the growth of a Software Engineer.</p>
    </div>
  )  
} 

