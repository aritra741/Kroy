import React, { useContext } from "react";
import { Marginer } from "../marginer";
import { Dropdown, MenuItem, DropdownButton } from "react-bootstrap";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import { Button } from "../button";

 export function AddProductForm(props) {
  //const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input placeholder="Description" />
        <Input placeholder="Price" />
        <Input placeholder="Quantity" />
        <Input placeholder="Upload Image" />
        <DropdownButton >
  <Dropdown.Item as={Button}>Action</Dropdown.Item>
  <Dropdown.Item as={Button}>Another action</Dropdown.Item>
  <Dropdown.Item as={Button}>Something else</Dropdown.Item>
</DropdownButton>
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
