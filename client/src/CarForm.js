import React,{ useState } from 'react'

const CarForm = ({addACar}) => {
    const [name,setName] = useState("")
    const [carMake,setMake] = useState("")
    const [year,setYear] = useState("")

const handleSubmit = (e) => {
    e.preventDefault(e)
   addACar({
       name: name,
       carMake: carMake,
       year: year
   })
 }

    return (
       <form onSubmit={handleSubmit}>
           <label>Name: </label>
           <input 
           type="text"
           id="name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           />
           <br/>
            <label>Make: </label>
           <input 
           type="text"
           id="carMake"
           value={carMake}
           onChange={(e) => setMake(e.target.value)}
           />
           <br/>
           <label>Year: </label>
           <input 
           type="text"
           id="year"
           value={year}
           onChange={(e) => setYear(e.target.value)}
           />
           <br/>
           <input type="submit"/>

       </form>
    )
}

export default CarForm