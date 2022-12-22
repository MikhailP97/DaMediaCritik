/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGenres, searchMovie, searchResults, tabDesGenres, tabGenres } from "../features/movies/movieSlice";
import { genres_url, serverPosters } from '../apiMovieDatabase';
import axios from "axios";
import SearchBar from "./SearchBar";
import { UserContext } from "../UserContext";
import { currentUser } from "../features/users/userSlice";

function NavBar(props) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //navigation
  const navigate = useNavigate();

  const ref = useRef(null);

  const [search, setSearch] = useState('');
  const [invisible, setInvisible] = useState('');
  const [genres, setGenres] = useState('');
  const [searchResultsState, setSearchResultsState] = useState([]);
  const [searchBar, setSearchBar] = useState(false)

  const resultsOfSearch = useSelector(searchResults);
  const dispatch = useDispatch();

  function getGenres() {
        axios.get(genres_url).then(({data}) => {
          setGenres(data.genres)
        })
    }

  useEffect(() => {

    if (search !== '') {
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

  const currentUserVerif = useSelector(currentUser)
  console.log(Object.keys(currentUserVerif).length !== 0)

  const profileOrConnectRoute = () => {
    if(Object.keys(currentUserVerif).length !== 0) {
      navigate('/profile')
    } else if(Object.keys(currentUserVerif).length === 0) {
      navigate('/login')
    }
  }

  return (
    <div>
      <nav className="w-full fixed-top md:static bg-stone-700 shadow py-2">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 xl:px-0 max-h-16">
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
                <div className="flex mr-2 md:mr-0">
                  <button onClick={() => setSearchBar(!searchBar)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 sm:w-9 mr-1 ml-1 sm:mr-2 icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="10" cy="10" r="7" />
                      <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                  </button>
                  <button
                    aria-label="Open Menu"
                    title="Open Menu"
                    className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <svg className="w-7 sm:w-8 text-gray-100" viewBox="0 0 24 24">
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
                </div>
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
                          <li className="text-gray-100 cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/");
                              }}
                            >
                              Accueil
                          </li>
                          <li className="text-gray-100 cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/films");
                              }}
                            >
                              Films
                          </li>
                          <li className="text-gray-100 cursor-pointer" onClick={() => {
                            setIsMenuOpen(false);
                            navigate("/genres-mobile");
                          }}
                          >
                            Genres
                          </li>
                          <li className="text-gray-100 cursor-pointer"
                            onClick={() => {
                              setIsMenuOpen(false);
                              navigate("/contact");
                            }}
                          >
                            Contact
                          </li>
                          <li className="text-gray-100 cursor-pointer"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/login");
                              }}
                            >
                              Profile
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

          {/* <SearchBar /> */}

          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0  block`}
          >
            <ul className="items-center justify-end hidden space-y-8 md:flex md:space-x-6 md:space-y-0">
              <button className="" onClick={() => setSearchBar(!searchBar)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125 w-8 sm:w-9 icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </button>
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/")}>Accueil</div>
              </li>
              <li className="transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125">
                <div className="cursor-pointer" onClick={() => navigate("/films")}>Films</div>
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
                <div className="cursor-pointer " onClick={profileOrConnectRoute}>
                  <svg
                    className="h-6 w-6 hover:fill-current transition ease-in-out origin-center delay-75 text-gray-100 hover:text-amber-600 hover:scale-125"
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
        
          {searchBar ?

            <input className="flex w-9/12 xl:w-7/12 m-auto mb-2 py-1 px-5 rounded-3xl border-2 border-amber-50 bg-stone-700 text-white"
              placeholder="Recherchez votre film..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}>

            </input>
            :
            <></>}

          {resultsOfSearch?.length ?
            <div ref={ref} id='results' className={` absolute mt-2 w-full md:ml-28  md:w-96 xl:ml-96 z-10 ${invisible} overflow-hidden rounded-md bg-amber-50 divide-y`}>
              {resultsOfSearch?.length && search !== '' ? resultsOfSearch.slice(0, 5).map((res) =>
                <div className="flex items-center space-x-4 py-1 hover:bg-amber-200 cursor-pointer" key={res.id} onClick={() => {
                  navigate(`/page-film/${res.id}`)
                  setInvisible('invisible')
                  setSearch('')
                }}>
                  <img className="ml-2" src={serverPosters + res.backdrop_path} alt={res.title} width='50' />
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold ">{res.title}</span>
                    <span>{res?.release_date ? res.release_date.slice(0, 4) : ''}</span>
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
        
       
      </nav>

    </div>
  );
}

export default NavBar;