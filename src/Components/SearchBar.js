import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverPosters } from '../apiMovieDatabase';
import { searchMovie, searchResults } from '../features/movies/movieSlice';

function SearchBar(props) {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [invisible, setInvisible] = useState('');
    const [searchResultsState, setSearchResultsState] = useState([]);

    const ref = useRef(null);
    const { onClickOutside } = props;

    const resultsOfSearch = useSelector(searchResults);
    const dispatch = useDispatch();

    useEffect(() => {
        if(search !== ''){
          dispatch(searchMovie(search))
          setSearchResultsState(resultsOfSearch)
          setInvisible('')
        } else {
          setSearchResultsState()
        }
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
              onClickOutside && onClickOutside();
            }
          };
          document.addEventListener('click', handleClickOutside, true);
          return () => {
            document.removeEventListener('click', handleClickOutside, true);
          };
    }, [search, onClickOutside])

    return (
        <div className="max-w-md invisible lg:mx-20 lg:visible w-full">
            <div className="border border-white relative flex items-center max-h-10 h-8 w-96 rounded-full focus-within:shadow-lg bg-stone-700 overflow-hidden">
              <input
                className="peer h-full w-full outline-none text-sm text-c text-gray-100 bg-stone-700 pr-2 ml-2"
                type="text"
                id="search"
                placeholder="Recherche"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search !== '' ?
                <div className="grid place-items-center h-full w-12 bg-stone-700" onClick={() => setSearch('')}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    className="h-6 w-6"
                    viewBox="0 0 48 48"
                    style={{fill:'#FFFFFF'}}>
                    <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path>
                  </svg>
                </div>
              : <></>}
              {/* <div className="grid place-items-center h-full w-12 bg-stone-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div> */}
            </div>

              {resultsOfSearch?.length ? 
                <div ref={ref} id='results' className={`absolute mt-2 w-96 z-10 ${invisible} overflow-hidden rounded-md bg-amber-50 divide-y`}>
                  {resultsOfSearch?.length && search !== '' ? resultsOfSearch.slice(0,5).map((res) => 
                    <div className="flex items-center space-x-4 py-1 hover:bg-amber-200 cursor-pointer" key={res.id} onClick={() => {
                                                                                                      navigate(`/page-film/${res.id}`)
                                                                                                      setInvisible('invisible')
                                                                                                      setSearch('')
                                                                                                    }}>
                      <img className="ml-2" src={serverPosters + res.backdrop_path} alt={res.title} width='50' />
                      <div className="flex flex-col space-y-2">
                          <span className="font-semibold">{res.title}</span>
                          <span>{res?.release_date ? res.release_date.slice(0,4) : ''}</span>
                      </div>
                    </div>
                    )
                    : <></>
                    
                      // <div class="flex justify-center items-center py-5">
                      //     <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                      //         <span class="visually-hidden">Loading...</span>
                      //     </div>
                      // </div>
                  }
                </div>
              : <></>
              }
        </div>
    )
}

export default SearchBar;