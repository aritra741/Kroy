import React, { useContext, useState } from "react";
import Axios from 'axios';
import { Marginer } from "../marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import axios from "axios";

export function LoginForm(props) {

  const[isLoggedIn, setLoggedIn] = useState(false)
  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login handleLogin={setLoggedIn} />
      ) : (
        <Dashboard handleLogin={setLoggedIn} />
      )}
    </div>
  );

}
const Login = ({handleLogin}) => {
  const { switchToSignup } = useContext(AccountContext);
  
  const[email, setemail]= useState('')
  const[password, setpassword]= useState('')
  async function signin()
  {
    console.log(email)
    console.log(password)
    try{
      const config= {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const {data}= await axios.post(
        'http://127.0.0.1:8000/store/users/login/',
        {'username': email,
      'email': email, 'password': password},
      config)
        
      console.log(data)
    }
    catch(e)
    {
      console.log(e)
    }
  }

  return (
    
    <BoxContainer >
      <FormContainer>
        <Input 
        placeholder="Email" 
        value={email}
        onChange={ (e)=>{setemail(e.target.value)} } />
        <Input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={ (e)=>{setpassword(e.target.value)} } />
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={ () => handleLogin(true)}>Login</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToSignup}>
          sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );


}
  


const Dashboard = ({ handleLogin }) => {
  return (
    <div class="dashboard">
      <div>Welcome you are now logged in</div>
      <SubmitButton onClick={() => handleLogin(false)} variant="primary">
        Log Out
      </SubmitButton>
    </div>
  );
};