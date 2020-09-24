import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import "./App.css";
import { v4 as uuidv4} from 'uuid';
import Recipe from "./components/Recipe"
import Alert from './components/Alert'


const App = () => {
  
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID =  "12e3bacd";
  const APP_KEY =  "9ede987946f451e821401a575e67980a";

  const url =  `https://api.edamam.com/search?
  q=${query}&app_id=${APP_ID}&
  app_key=${APP_KEY}`;

  const getData = async () => {
    if(query !=="") {
      const result = await Axios.get(url);
      if(!result.data.more) {
        return setAlert("No food with such name");

      }
      setRecipes(result.data.hits)
      console.log("result" + result);
      setAlert("");
      setQuery(""); 
    } else {
      setAlert('Please fill the form')
    }

   
  };

  const onChange = (e) => {
    setQuery(e.target.value)
  };
  const onSubmit = (e) => {
    e.preventDefault(); 
    getData ();
  };

  return (
    <div className="App">
     <h1>Food Searching App</h1> 
     <form className="search-form" onSubmit=
     {onSubmit}>
       {alert !== "" && <Alert alert={alert} />}
       <input 
       type="text" 
       placeholder="Search Food" 
       autoComplete="off" 
       onChange={onChange} 
       value={query}
       />
        <input type="submit"  value="search" />
     </form>
     <div className="recipes">
       {recipes !== []&&
       recipes.map(recipe => 
       <Recipe key={uuidv4()} recipe={recipe} />)}

     </div>
    </div>
  );
};

export default App
