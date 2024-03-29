import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0 ) {
        firebase.initializeApp(firebaseConfig);
    }
    const hendleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
           const {displayName, email} = result.user;
           const signInUser = {displayName, email};
            setLoggedInUser(signInUser);
            history.replace(from);
        
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
           
          });
    }
    return (

        <div>
            <h1>This is Login</h1>
            <button onClick={hendleGoogleSignIn}>Google Sign-in</button>
        </div>
    );
};

export default Login;