import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchMovie, searchResults } from "../features/movies/movieSlice";
import { serverPosters } from '../apiMovieDatabase';

function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //navigation
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [invisible, setInvisible] = useState('');
  const [searchResultsState, setSearchResultsState] = useState([]);

  const resultsOfSearch = useSelector(searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    if(search !== ''){
      dispatch(searchMovie(search))
      setSearchResultsState(resultsOfSearch)
    } else {
      setSearchResultsState()
    }
  }, [search])

  const click = (id) => {
    // navigate(`/page-film/${id}`)
  }

  console.log(search)
  console.log(searchResultsState)

  return (
    <div>
      <nav className="w-full bg-stone-700 shadow py-2">
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
                                navigate("/contact");
                              }}>
                              Contact
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
              <div className="grid place-items-center h-full w-12 bg-stone-700">
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
              </div>
            </div>

              {searchResultsState?.length ? 
                <div className={`absolute mt-2 w-96 z-10 ${invisible} overflow-hidden rounded-md bg-amber-50 divide-y`}>
                  {searchResultsState?.length && searchResultsState.slice(0,10).map((res) => 
                  <div className="flex items-center space-x-4 py-1" key={res.id} onClick={(id) => {
                                                                                                    navigate(`/page-film/${res.id}`)
                                                                                                    // setInvisible('invisible')
                                                                                                  }}>
                    <img className="ml-2" src={serverPosters + res.backdrop_path} alt={res.title} width='50' />
                    <div className="flex flex-col space-y-2">
                        <span>{res.title}</span>
                        <span>{res.release_date.slice(0,4)}</span>
                    </div>
                  </div>
                    )}
                </div>
              : <></>
              }
              
            </div>

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