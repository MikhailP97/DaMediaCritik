import React from 'react'
import Card from '../Components/Card';
import { useNavigate } from 'react-router-dom';
import { serverPosters } from '../apiMovieDatabase';

const Tendances = ({titleOfSection, movies}) => {

      const navigate = useNavigate();

      return(
        <>
          <div className="mt-5 relative flex py-5 items-center">
              <div className="flex-grow border-t ml-20 border-amber-50"></div>
              <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">{titleOfSection}</span>
              <div className="flex-grow border-t mr-20 border-amber-50"></div>
          </div>
          <div className="grid 2xl:grid-cols-8-mx-1 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xm:grid-cols-1 gap-5">
            {
              movies?.length && movies.slice(0,6).map(mv => <Card  key={mv.id} 
                                                                  img={serverPosters+mv.poster_path} 
                                                                  id={mv.id} 
                                                                  title={mv.title} 
                                                                  alt={mv.title} 
                                                                  style={{width: "250px", padding: "10px"}}
                                                                  click={() => navigate(`/page-film/${mv.id}`)}>
                                                            </Card> )     
            }   
          </div>
          <br/><br/>
        </>
      )
}
export default Tendances;