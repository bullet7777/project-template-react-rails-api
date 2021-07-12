import React,{ useState } from 'react'

const Login = ({loginUser}) => {
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] =useState("")

const handleSubmit = (e) => {
    e.preventDefault(e)
    fetch("/login",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
             name: name,
             password: password
         })

    })
    .then(r => r.json())
    .then(data => {
        if(data.error){
            setError(data.error)
        }else{

        loginUser(data)
        setError("")
    }

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
            <label>Password: </label>
           <input 
           type="password"
           id="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
           <br/>
           <input type="submit"/>
            <h3>{error}</h3>
       </form>

    )
}

export default Login