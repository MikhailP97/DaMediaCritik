const Card = ({title, img}) => {
    
    return (
        <>
            Titre:<h3>{title}</h3>
            Image:<img src={img} alt={title}/>

            <div className="card">CARD
                <div className="card-header">CARD-HEADER
                    Image:<img src={img} alt={title}/>
                </div>
                <div className="card-body">CARD-BODY
                    Titre:<h3>{title}</h3>
                </div>
            </div>

            {/* <ul id="ul"></ul>
            
            <div id="tendances"></div> */}

        </>
    )
}
export default Card;