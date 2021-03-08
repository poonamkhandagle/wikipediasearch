import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  //set initial search criteria as programming
  const [term,setTerm] = useState("programming");
  const [results,setResults] = useState([]);
//renders initially and after every state change of term
  useEffect(() => {
    //API call
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      //result of API request
      setResults(data.query.search);
    }
    if(term && !results.length){
      search();
    }else{
      //timeout of 1 sec after every key press and assign an id to it to clear timeout
      const timeoutId = setTimeout(() => {
        if (term){
          search();
        }
      },1000);
      //clear timeout
      return () => {
        clearTimeout(timeoutId);
      }
    }

      },[term]);
//make a list of search results
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
      <div className = "right floated content">
      <a className = "ui button"
      href = {`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
      </div>
      <div className ="content">
      <div className ="header">
      {result.title}
      </div>
      <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
      </div>
      </div>
    )
  })
  return(
  <div>
    <div className = "ui form">
      <div className="field">
         <label>Enter search term </label>
         <input
          value = {term}
          onChange = {e => setTerm(e.target.value)}
          className = "input" />
      </div>
    </div>
    //ApI result as a list
    <div className = "ui celled list">
    {renderedResults}
    </div>
  </div>
  )
}
export default Search;
