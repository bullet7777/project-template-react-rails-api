import React,{ useState } from 'react'

const Signup = ({loginUser,errors}) => {
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [passwordConfirmation,setPasswordConfirmation] = useState("")
    const [errorsList,setErrorsList] =useState([])

const handleSubmit = (e) => {
    e.preventDefault(e)
    fetch("/signup",{
        method:"POST",
        headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
             name: name,
             password: password,
             passwordConfirmation: passwordConfirmation
         })

    })
    .then(r => r.json())
    .then(user => loginUser(user))
 }

 if (errors.length !==0 && errorsList.length === 0){
     setPassword("")
     setPasswordConfirmation("")
     const errorLis =errors.map(e => <li>{e}</li>)
     setErrorsList(errorLis)
 }

    return (
        <div>
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
           <label>Confirm Password: </label>
           <input 
           type="password"
           id="passwordConfirmation"
           value={passwordConfirmation}
           onChange={(e) => setPasswordConfirmation(e.target.value)}
           />
           <br/>
           <input type="submit"/>

       </form>
       <ul>
           {errorsList}
       </ul>
       </div>
    )
}

export default Signup