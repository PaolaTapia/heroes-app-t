import React, { useMemo } from "react";
import queryString from 'query-string'; 
import { useLocation } from "react-router-dom";
//import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../heroes/HeroCard";

export const SearchScreen = ({history}) => {

     const location = useLocation();
     const {q=''}= queryString.parse(location.search);
    // console.log(q); 

     //const herosFiltered=heroes; 

     const  [formValues, handledInputChange] = useForm({find:q}) ;  
     
     const {find}= formValues; 
     

     const heroesFiltered= useMemo( () => getHeroesByName(q), [q]); 

     const handleSearch= (e)=>{
          e.preventDefault(); 
          history.push(`?q=${find}`); 
        
     }

  return (
    <div>
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Find your hero"
              className="form-control"              
              name="find"
              autoComplete="off"
              value={find}
              onChange={handledInputChange}
            />
            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
              
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-7">
             <h4>Results </h4>
             <hr/>
             {(q==='') && <div className="alert alert-info animate__animated animate__flash">
               Search a hero
             </div>}
             {(q!=='' && heroesFiltered.length===0) 
               && 
               <div className="alert alert-danger animate__animated animate__flash">
                    There is no a hero with {q}
               </div>}

             {
                  heroesFiltered.map(hero=>(
                     <HeroCard
                       key={hero.id}
                       {...hero}
                     />
                   
                  ))
             }
        </div>
      </div>
    </div>
  );
};
