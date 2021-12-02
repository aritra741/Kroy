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
  const { switchToSignup } = useContext(AccountContext);
  
  const[email, setemail]= useState('')
  const[password, setpassword]= useState('')
  

  async function signin()
  {
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
    <BoxContainer>
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
      <MutedLink href="#">Forgot Password?</MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={signin}>Login</SubmitButton>
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