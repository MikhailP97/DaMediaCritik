/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, searchMovie, searchResults, tabDesGenres, tabGenres } from "../features/movies/movieSlice";
import { genres_url, serverPosters } from '../apiMovieDatabase';
import axios from "axios";
import SearchBar from "./SearchBar";

function NavBar(props) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //navigation
  const navigate = useNavigate();

  const ref = useRef(null);

  const [search, setSearch] = useState('');
  const [invisible, setInvisible] = useState('');
  const [genres, setGenres] = useState('');
  const [searchResultsState, setSearchResultsState] = useState([]);

  const resultsOfSearch = useSelector(searchResults);
  const dispatch = useDispatch();

  function getGenres() {
        axios.get(genres_url).then(({data}) => {
          console.log(data.genres);
          setGenres(data.genres)
        })
    }

  useEffect(() => {

    if(search !== ''){
      dispatch(searchMovie(search))
      setSearchResultsState(resultsOfSearch)
      setInvisible('')
    } else {
      setSearchResultsState()
    }
    getGenres()

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearch('');
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [search])

  return (
    <div>
      <nav className="w-full fixed-top md:static bg-stone-700 shadow py-2">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 max-h-16">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div
                onClick={() => navigate("/")}
                className="inline-flex items-center cursor-pointer"
              >
                <span className="ml-2 text-3xl font-bold tracking-wide text-amber-600">
                  DaMovieCritik
                </span>
              </div>
              <div className="ml-auto md:hidden">
                <button
                  aria-label="Open Menu"
                  title="Open Menu"
                  className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className="w-5 text-gray-100" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                    />
                    <path
                      fill="currentColor"
                      d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                    />
                  </svg>
                </button>
                {isMenuOpen && (
                  <div className="z-10 absolute top-0 left-0 w-full">
                    <div className="p-5 bg-stone-700 border rounded shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <button
                            aria-label="Close Menu"
                            title="Close Menu"
                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:shadow-outline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <svg className="w-5 text-gray-100" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <nav>
                        <ul className="space-y-4">
                          <li className="text-gray-100">
                            <div className="cursor-pointer" 
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/");
                              }}
                            >
                              Accueill
                            </div>
                          </li>
                          <li className="text-gray-100">
                            <div className="cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/films");
                              }}
                            >
                              Films
                            </div>
                          </li>
                          <li className="text-gray-100">
                            <div className="cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/categories");
                              }}
                            >
                              Catégories
                            </div>
                          </li>
                          <li className="text-gray-100 cursor-pointer" onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/genres-mobile");
                              }}
                            >
                              Genres
                          </li>
                          <li className="text-gray-100">
                            <div className="cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/contact");
                              }}>
                              Contact
                            </div>
                          </li>
                          <li className="text-gray-100">
                            <div className="cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/login");
                              }}
                            >
                              Profile
                            </div>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar */}

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

            {/* <SearchBar /> */}

          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  block`}
          >
            <ul className="items-center justify-center hidden space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/")}>Accueil</div>
              </li>
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/films")}>Films</div>
              </li>
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/categories")}>Catégories</div>
              </li>
              <li className="cursor-pointer z-10 transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">Genres{/*<ion-icon name="caret-down"></ion-icon>*/}
                                <ul>
                                  {genres?.length && genres.map((genre) => 
                                    <li key={genre.id} onClick={() => (navigate(`/genres/${genre.id}`))}><a href="#">{genre.name}</a></li>
                                  )}
                                </ul> 
              </li>
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/contact")}>Contact</div>
              </li>
              <li>
                <div className="cursor-pointer" onClick={() => navigate("/login")}>
                  <svg
                    className="h-6 w-6 text-gray-100 hover:fill-current hover:text-amber-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;