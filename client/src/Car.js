import React, { useState, useEffect } from 'react'
import EditForm from './EditForm'

const Car = (props) => {
   const [car, setCar] = useState({make:{}})
   const [error, setError] = useState("")
   const [formFlag,setFormFlag]=useState(false)

   useEffect(() => {
      console.log("hi")
      console.log(props.match.params.id)
         fetch(`/cars/${props.match.params.id}`)
         .then(r => r.json())
         .then(data => {
            if (data.error) {
               setError(data.error)
            } else {
               setCar(data)
            }

         })
   },[])
   const editForm =(updatedCar) =>{
      
      fetch(`/cars/${props.match.params.id}`,{
         method: "PATCH",
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedCar)
    
      })
      .then(r =>r.json())
      .then(data =>{
         if (data.error) {
            setError(data.error)
         }else{
         setFormFlag(false)
         setCar(data)
         }
      })
   }



   if (error === "") {
      return (
         <div>
            <h2>Car Specifications:</h2>
            <h3>Name: {car.name}</h3>
            <h3>Car Make:{car.make.name}</h3>
            <h3>Year:{car.year}</h3>
            <br/>
            <br/>
            {formFlag ?<EditForm t={car} editAForm={editForm}/> : <button onClick={() =>setFormFlag(true) }>Edit Car</button>}
          

         </div>
      )
   } else {
      return (
         <h3>{error}</h3>
      )
   }
}

export default Car