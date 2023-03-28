import { useEffect, useState } from "react";
import axios from "axios";

// this is the api key and hash from the marvel developer portal
const API_KEY = import.meta.env.VITE_API_KEY;
const HASH = import.meta.env.VITE_HASH;

// this is the List component that will be used to display the list of characters on the page
const List = ( ) => {

      // this is the state that will be used to store the list of characters
      const [list, setList] = useState(null);

      // this is the state that will be used to store the search input
      const [searchInput, setSearchInput] = useState('')

      // this is the state that will be used to store the filtered results
      const [filteredResults, setFilteredResults] = useState([])

      // this is the useEffect hook that will be used to fetch the list of characters from the marvel api
      useEffect(() => {
            
      const fetchList = async () => {
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?&apikey=${API_KEY}&ts=1&hash=${HASH}`)
            setList(response.data)
      }
      fetchList().catch(console.error)
      }, [])


      // this is the function that will be used to search the list of characters
      const searchItems = (inputString) => {
            setSearchInput(inputString)

            // this is the conditional that will be used to filter the list of characters
            setFilteredResults(list.data.results.filter((item) => {
                  return item.name.toLowerCase().includes(inputString.toLowerCase())
            }))}

      // this is the function that will be used to filter the list of characters by the number of comics they have appeared in
          const filterByComics = (e) => {
            const filteredByComics = list.data.results.filter((item) => {
                  return item.comics.available >= e.target.value
            })
            setFilteredResults(filteredByComics)
      }

      // this is the function that will be used to clear both the search input and the filtered results
      const clearFilter = () => {

            // setting the filtered results to an empty array and the search input to an empty string
            setFilteredResults([])
            setSearchInput('')

            // this is the code that will be used to uncheck all of the radio buttons
            document.querySelectorAll('input[type=radio]').forEach((el) => el.checked = false);

            // this is the code that will be used to clear the search input
            document.querySelectorAll('input[type=text]').forEach((el) => el.value = '');
      }


      return(

      <div className="list">

            {/* This is the div that will be used to display the search and filter options */}
            <div className="filteringDivs">

            {/* This is the div that will be used to display the search options */}
            <div className="searchDiv">
            <h3>Search by Name</h3>
           { <input type="text" 
           placeholder="Search" 
           onChange={(inputString) => searchItems(inputString.target.value)} /> }
            </div>

            {/* This is the div that will be used to display the filter options */}
            <div className="filterDiv">
            <h3>Filter by # of Comics</h3>

            <div className="radioDiv">
            <input type="radio" id="5" name="comics" value="5" onChange={(e) => filterByComics(e)} />
            <label htmlFor="5">5+</label>
            <input type="radio" id="10" name="comics" value="10" onChange={(e) => filterByComics(e)} />
            <label htmlFor="10">10+</label>
            <input type="radio" id="15" name="comics" value="15" onChange={(e) => filterByComics(e)} />
            <label htmlFor="15">15+</label>
            <input type="radio" id="25" name="comics" value="25" onChange={(e) => filterByComics(e)} />
            <label htmlFor="25">25+</label>
            <input type="radio" id="50" name="comics" value="50" onChange={(e) => filterByComics(e)} />
            <label htmlFor="50">50+</label>
            <input type="radio" id="75" name="comics" value="75" onChange={(e) => filterByComics(e)} />
            <label htmlFor="75">75+</label>
            <input type="radio" id="100" name="comics" value="100" onChange={(e) => filterByComics(e)} />
            <label htmlFor="100">100+</label>
            </div>
            </div>

            {/* This is the div that will be used to display the clear filter button */}
            <div className="clearDiv">
            <button onClick={clearFilter}>Clear Filter</button>
            </div>
            </div>
            
            <ul>

            {/* This is the conditional that will be used to display the list of characters */}
            <li className="titleList"><h3>Image</h3><h3>Name</h3>
            <h3>Comics</h3></li>

            {/* This is the conditional that will be used to display the filtered results,
            if the results are not filtered, then the list of characters will be displayed*/}
            { searchInput.length > 0 || filteredResults.length > 0 ? 
            filteredResults.map((item) => {
                  return (
                        <li className="charList" key={item.id}>
                              <div className="imageDiv">
                              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} />
                              </div>
                              <div className="nameDiv">
                              <h3>{item.name}</h3>
                              </div>
                              <div className="comicsDiv">
                              {item.comics.items.map((comic) => {
                              return (
                              <li className="comicList" key={comic.name}>
                                    <h4>{comic.name}</h4>
                              </li>
                              )
                              })}
                              </div>
                        </li>
                  )})
            : list ? list.data.results.map((item) => {
                  return (
                        <li className="charList" key={item.id}>
                              <div className="imageDiv">
                              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} />
                              </div>
                              <div className="nameDiv">
                              <h3>{item.name}</h3>
                              </div>
                              <div className="comicsDiv">
                              {item.comics.items.map((comic) => {
                              return (
                              <li className="comicList" key={comic.name}>
                                    <h4>{comic.name}</h4>
                              </li>
                              )
                              })}

                              </div>
                        </li>
                  )
            }
            ) : ( <p>Loading...</p>
            )}
            </ul>
      </div>
      )
}

export default List;