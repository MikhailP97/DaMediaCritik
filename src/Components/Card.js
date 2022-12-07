const Card = ({title, img}) => {
    
    function sayHello() {
        alert('Helloo!');
    }

    return (
        <>
            <div className="card">
                <img src={img} alt={title} onClick={sayHello}/> 
            </div>
        </>
    )
}
export default Card;