//import '.styles.css';

import {useState } from 'react'
import { Rating } from 'react-simple-star-rating'

function Stars({rate}) {

    const [rating, setRating] = useState(0); //initial rating value

    const handleRating = (rate) => {
        setRating(rate);
        // other logic
        console.log(rating);
    }

    return (
        <div>
            <Rating 
                tooltipArray={['nul', 'bof', 'moyen', 'top', 'génial']}
                allowHalfIcon                
                transition
                //showTooltip
                size={30}
                onClick={handleRating}
                ratingValue={rating} /* Available Props */
             />
             &nbsp;{rating} <input type="hidden" value={rating} />
        </div>
  )
  
}
export default Stars