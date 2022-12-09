const Card = ({id, img, alt, title, cat, year, style}) => {

    return (
        <>
            <div className="card text-white">
                <img key={id} src={img} alt={alt} title={alt} style={style} />        
          
                <div className="mt-4">
                    <h2 className="title-font text-lg font-medium text-white">{title}</h2>
                    <h3 className="title-font mb-1 text-xs tracking-widest text-gray-300">Catégories : {cat}</h3>
                    <p className="text-white mt-1">{year}</p>
                </div>
            </div>
        </>
    )
}
export default Card;