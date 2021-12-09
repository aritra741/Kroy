import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
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

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const history = useHistory()

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function signup() {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      const { data } = await axios.post(
        'http://127.0.0.1:8000/store/users/register/',
        {
          'name': name,
          'email': email, 'password': password
        },
        config)

      console.log(data)
      localStorage.setItem('user', data.id)

      history.push("../../");
    }
    catch (e) {
      console.log(e)
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => { setname(e.target.value) }} />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => { setemail(e.target.value) }} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => { setpassword(e.target.value) }} />
        <Input type="password"
          placeholder="Confirm Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={signup}>Signup</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}