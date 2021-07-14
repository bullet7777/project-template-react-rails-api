
import React, { useState, useEffect } from 'react'

 const Makes = ({onClick}) => {
     const [makes,setMakes]=useState([])
     const [error, setError] = useState("")


     useEffect(() => {
        fetch('/makes')
            .then(r => r.json())
            .then(data => {
                console.log(data)
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setMakes(data)
                    } 
                
            })
    }, [])



const allMakes=makes.map(m => <button  key={m.id} onClick={() => onClick(m)}>{m.name}</button>)
    
    return (
        <div>
            
            {allMakes} 
            <button onClick={()=> onClick(null)}>All</button>
           
        </div>
    )
}

export default Makes
