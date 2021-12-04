import React, { useContext } from "react";
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

 export function AddProductForm(props) {
  //const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input placeholder="Description" />
        <Input placeholder="Price" />
        <Input placeholder="Quantity" />
        <Input placeholder="Upload Image" />
        <Input placeholder="collection" />
        
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton>Submit</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton>Cancel</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      {/* <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToSignup}>
          sign up
        </BoldLink>
      </MutedLink> */}
    </BoxContainer>
  );
}

export default  AddProductForm;
