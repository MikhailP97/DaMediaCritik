import React from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-awesome-slider/dist/styles.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

function SliderComponent({movies, titleOfSection, mb}) {

    const server = "https://image.tmdb.org/t/p/w300_and_h450_bestv2/";

    const navigate = useNavigate();

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    return (
        <>
            <div className="mt-5 relative flex pt-5 pb-2 items-center">
                <div className="flex-grow border-t ml-20 border-amber-50"></div>
                <span className="flex-shrink my-10 mx-4 text-amber-50 text-2xl font-bold">{titleOfSection}</span>
                <div className="flex-grow border-t mr-20 border-amber-50"></div>
            </div>
            <div
                className={`flex flex-col items-center pb-5 ${mb}`}
                style={{color: '#1c1917'}}
            >
                <>
                    <AutoplaySlider
                        style={{height: "400px", width: "80%", backgroundColor: '#1c1917'}}
                        play={false}
                        cancelOnInteraction={false} // should stop playing on user interaction
                        interval={6000}
                        // transitionDelay={100}
                        mobileTouch={true}
                        bullets={true}
                    >
                        {movies?.length && movies.slice(0,6).map((mv) => (
                                                                        <div className="imgContainer" style={{ backgroundColor: '#1c1917' }} onClick={() => navigate(`/page-film/${mv.id}`)} key={movies.id}>
                                                                            <img src={server + mv.poster_path} alt={'elmrkf'} style={{ height: "400px", backgroundColor: '#1c1917' }} />
                                                                        </div>
                        ))}
                    </AutoplaySlider>
                </>
            </div>
        </>
    )
}

export default SliderComponent

