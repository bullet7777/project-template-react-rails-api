import './App.css';
import React,{ useState,useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup  from './Signup';
import Cars from './Cars';
import Car from './Car'

function App() {
  const [loggedIn,setLoggedIn] = useState(false)
  const [user,setUser] = useState({})
  const [errors,setErrors] = useState([])
  const history = useHistory()

  useEffect(()=>{
    fetch('/me')
    .then(r=>{
      if (r.ok){
        r.json()
        .then(u => {
          setLoggedIn(true)
          setUser(u)
        })
      }
     })
    },[])

    const logoutUser = () =>{
      fetch('/logout', {
        method:'DELETE'
      })
      .then(()=>{
        console.log("logged out")
        setLoggedIn(false)
        setUser({})
      })
      history.push('/')
    }

  const loginUser = (u) =>{
    if (!u.errors){
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }else{
    setErrors(u.errors)
    history.push('/signup')
  }
}

  return (
    <div className="App">
      <Navbar user={user} loggedIn={loggedIn} logoutUser={logoutUser} /> 
      <Switch>
        <Route exact path="/signup" render={routerProps => <Signup {...routerProps} errors={errors} loginUser={loginUser}/>}/>
        <Route exact path="/login" render={routerProps => <Login {...routerProps} loginUser={loginUser}/>}/>
        <Route exact path="/"  render={routerProps => <Cars {...routerProps} loggedIn={loggedIn}/>} />
        <Route path="/cars/:id" component={Car}/>
      </Switch>  
    </div>
  );
}
  
export default App;
