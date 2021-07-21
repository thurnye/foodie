import React,{useEffect} from 'react';
import {Router, Switch, Route} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {useSelector, useDispatch} from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {far} from "@fortawesome/free-regular-svg-icons"
import {userActions } from './store/userSlice'


import NavBar from './components/Nav/navbar'
import Home from './pages/home';
import singleRecipe from './pages/singleRecipe'
import Signup from './pages/signup';
import Login from './pages/login';
// import Footer from './components/Footer/footer'


import './public/css/hover.css'
import './App.css';


library.add(fab, fas, far)
const history = require("history").createBrowserHistory()  

function App() {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      // YOU DO: check expiry!
      const userDoc = jwt_decode(token);  // decode jwt token
      dispatch(userActions.login({
        user: userDoc
      }))    
    }
  }, [token, dispatch])
    
  // get the loggedIn User
  const user = useSelector(state => state.userLog.user)

  return (
    <React.Fragment>
      <Router history={history}>
      <NavBar/>
        <Switch>
          <Route path="/"  exact component={Home} />
          {!user && <Route path="/signin" component={Signup} /> }
          {!user && <Route path="/login" component={Login} />}
          <Route path="/recipe" component={singleRecipe} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </React.Fragment>
    
  );
}
export default App;
