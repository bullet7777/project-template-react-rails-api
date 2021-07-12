import React from 'react'
import { Link } from 'react-router-dom'

const CarsLink = ({car,deleteCar}) => {
    return (
        
      <div> <Link to={`/cars/${car.id}`} className="home" >
           {car.name}
      
       </Link>
       <button onClick={() => deleteCar(car)}>Delete</button>
       </div>
      
    )
}
export default CarsLink
