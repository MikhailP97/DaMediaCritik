import { useState, useEffect } from "react";
const Card = ({id, img, alt, title, cat, genres, year, style, click}) => {

    //cat : liste des ids d'un film
    //genres : liste de tous les genres / id

    const [catName, setCatName] = useState([]);
    useEffect(() => {
        //getGenresName()
    },[])

    // const getGenresName = () => {
    //     genres.forEach(element => {
    //         if (cat.includes(element.id))
    //         {
    //             console.log (element)
    //             setCatName(...catName, ...element)
    //         }
    //     });
    // }



    return (
        <>
            <div className="card text-white" onClick={click}>
                <img key={id} src={img} alt={alt} title={alt} style={style} />        
                <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">Catégories : {catName.map(v => 
                        <span>v.name</span>)}</h3>
                    <p className="text-white mt-1">{year}</p>
                </div>
            </div>
        </>
    )
}
export default Card;