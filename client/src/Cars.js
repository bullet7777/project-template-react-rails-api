import React, { useState, useEffect } from 'react'
import CarForm from './CarForm'
import CarsLink from './CarsLink'

const Cars = ({loggedIn}) => {
    const [cars, setCars] = useState([])
    const [error, setError] = useState("")
    const [formFlag, setFormFlag] = useState(false)
    const [addNewError,setNewError]= useState('')

    useEffect(() => {
        fetch('/cars')
            .then(r => r.json())
            .then(data => {
                console.log(data)
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setCars(data)
                    } 
                
            })
    }, [])

    const addCar = (car) => {
        fetch('/cars', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    setNewError(data.error)}
                    else{
                setCars([...cars, data])
                setFormFlag(false)
                setNewError('')
                    }

            })

    }

    const deleteCar = (car) => {
        fetch(`/cars/${car.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }else{
                const newCars=cars.filter(t => t.id !== car.id)
              
                setCars(newCars)
                }
            })

    }
   
 
   
     
   
console.log(loggedIn)

if (error === ''){
    if(loggedIn) {
        const carsList = cars.map(c => <CarsLink key={c.id} car={c} deleteCar={deleteCar}/>)

        return (
            <div>
                <ul>
                
                    {formFlag ?
                    <div>
                          <CarForm addACar={addCar} />
                        <div>{addNewError}</div>
                      
                        </div>
                        :
                        <button onClick={() => setFormFlag(true)}>Add Car</button>
                    }
                    {carsList}
                </ul>
    
            </div>
        )
    }
    else {
        return <h3>"Please Log In"</h3>
    }
}else {
    return(
 <h3>{error}</h3>
    )
}
}

export default Cars