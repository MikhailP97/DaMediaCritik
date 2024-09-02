/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Card = ({ id, img, alt, title, style, click }) => {
    return (
        <>
            <div className="card text-white">
                <center>
                    <img className="rounded-md cursor-pointer transition duration-300 hover:scale-105 w-full" key={id} src={img} alt={alt} style={style} onClick={click}/>
                    <div className="mt-1 sm:mt-4">
                        <h2 className="title-font text-xs sm:text-lg font-medium text-amber-300">{title}</h2>
                    </div>
                </center>
            </div >
        </>
    )
}
export default Card;