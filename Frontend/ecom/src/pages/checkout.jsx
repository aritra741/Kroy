import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { Button } from "../components/button";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "../contexts/checkout";
import { CartStateContext } from "../contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "../contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//import _get from "lodash.get";
import Input from "../components/core/form-controls/Input";
import { phoneRegExp } from "../constants/common";
import {Navbar} from "../components/navbar"
import {Footer} from "../components/Footer"
import axios from 'axios'

const AddressSchema = Yup.object().shape(
  {
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone Number is not a valid 10 digit number")
    .min(10, "Phone Number is too short")
    .max(10, "Phone Number is too long"),
  addressLine: Yup.string().required("Door No. & Street is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  code: Yup.string().required("ZIP/Postal code is required!"),
  country: Yup.string().required("Country is required!")
});

// const LoginStep = () => {
//   const history = useHistory();
//   // const { user, isLoggedIn } = useContext(AuthStateContext);
//   const authDispatch = useContext(AuthDispatchContext);
//   const checkoutDispatch = useContext(CheckoutDispatchContext);
//   const handleContinueShopping = () => {
//     history.push("/");
//   };
//   const handleLoginAsDiffUser = () => {
//     signOut(authDispatch);
//     history.push("/auth");
//   };
//   const handleGotoLogin = () => {
//     history.push("/auth");
//   };
//   const handleProceed = () => {
//     setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
//   };
//   return (
//     <div className="detail-container">
//       <h2>Sign In now!</h2>
//       <div className="auth-message">
//         {(
//           <>
//             <p>
//               Logged in as 
//             </p>
//             <button onClick={() => handleLoginAsDiffUser()}>
//               Login as Different User
//             </button>
//           </>
//         ) }
//       </div>
//       <div className="actions">
//         <button className="outline" onClick={() => handleContinueShopping()}>
//           <i className="rsc-icon-arrow_back" /> Continue Shopping
//         </button>
//         <button onClick={() => handleProceed()}>
//           Proceed
//           <i className="rsc-icon-arrow_forward" />
//         </button>
//       </div>
//     </div>
//   );
// };

const AddressStep = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleBackToLogin = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  return (
    
    <div className="detail-container">
      <h2>Shipping Address</h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          code: "",
          country: ""
        }}
        validationSchema={AddressSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const addressData = { ...values };
            resetForm();
            handleSaveAddress(addressData);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {() => (
          <Form>
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                component={Input}
              />
            </div>
            <Field
              name="addressLine"
              type="text"
              placeholder="Street and House Number"
              component={Input}
            />
            <div className="field-group">
              <Field
                name="city"
                type="text"
                placeholder="City"
                component={Input}
              />
              <Field
                name="state"
                type="text"
                placeholder="State"
                component={Input}
              />
            </div>
            <div className="field-group">
              <Field
                name="code"
                type="text"
                placeholder="ZIP/Postal Code"
                component={Input}
              />
              <Field
                name="country"
                type="text"
                placeholder="Country"
                component={Input}
              />
            </div>
            <div className="actions">
              {/* <button
                type="button"
                className="outline"
                onClick={() => handleBackToLogin()}
              >
                <i className="rsc-icon-arrow_back" /> Login in as Different User
              </button> */}
              <Link to="/payment">
              <Button >
               Confirm payment 
                <i className="rsc-icon-arrow_forward" />
              </Button>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// const PaymentStep = () => {
//   const { shippingAddress } = useContext(CheckoutStateContext);
//   const checkoutDispatch = useContext(CheckoutDispatchContext);
//   const handleBackToAddress = () => {
//     console.log("ashe")
//     setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
//   };
//   const handlePayment = () => {};

//   function addOrder()
//   {
//     const formData = new FormData();

//         formData.append("payment_stats", "R");
//         formData.append("customer", localStorage.getItem('user'))
//         formData.append("bid", localStorage.getItem('bid'))
                
//         axios.post("http://localhost:8000/store/addorders/",
//             formData
//         )
//             .then((result) => {
//                 console.log("Success:", result);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });

//   }

//   return (
//     <div className="detail-container">
//       <h2>Payment</h2>
//       {/* <div>
//         <pre>{JSON.stringify(shippingAddress, null, 0)}</pre>
//       </div> */}
//       <Formik
//         initialValues={{
//           fullName: "",
//           phoneNumber: "",
//           addressLine: "",
//           city: "",
//           state: "",
//           code: "",
//           country: ""
//         }}
//         validationSchema={AddressSchema}
//         onSubmit={async (values, { resetForm }) => {
//           try {
//             const addressData = { ...values };
//             resetForm();
//             // handleSaveAddress(addressData);
//           } catch (err) {
//             console.error(err);
//           }
//         }}
//       >
//         {() => (
//           <Form>
//             <div className="field-group">
//               <Field
//                 name="fullName"
//                 type="text"
//                 placeholder="Full Name"
//                 component={Input}
//               />
//               <Field
//                 name="phoneNumber"
//                 type="text"
//                 placeholder="Phone Number"
//                 component={Input}
//               />
//             </div>
//             <Field
//               name="addressLine"
//               type="text"
//               placeholder="Street and House Number"
//               component={Input}
//             />
//             <div className="field-group">
//               <Field
//                 name="city"
//                 type="text"
//                 placeholder="City"
//                 component={Input}
//               />
//               <Field
//                 name="state"
//                 type="text"
//                 placeholder="State"
//                 component={Input}
//               />
//             </div>
//             <div className="field-group">
//               <Field
//                 name="code"
//                 type="text"
//                 placeholder="ZIP/Postal Code"
//                 component={Input}
//               />
//               <Field
//                 name="country"
//                 type="text"
//                 placeholder="Country"
//                 component={Input}
//               />
//             </div>
//             <div className="actions">
//               {/* <button
//                 type="button"
//                 className="outline"
//                 onClick={() => handleBackToLogin()}
//               >
//                 <i className="rsc-icon-arrow_back" /> Login in as Different User
//               </button> */}
//               <div onClick={addOrder}>
//               <Link to="/payment">
//               <Button>
//                 Confirm Payment
//               </Button>
//               </Link>
//                 </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//       <div className="actions">
        
//         {/* <Button disabled={!shippingAddress} onClick={() => handlePayment()}>
//           Save Address
//           <i className="rsc-icon-arrow_forward" />
//         </Button> */}
//       </div>
//     </div>
//   );
// };

const Checkout = () => {
  const { items = [] } = useContext(CartStateContext);
  // const { isLoggedIn } = useContext(AuthStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;
  const bidID= localStorage.getItem('bid')
  console.log(bidID)

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };

  useEffect(() => {
    handleClickTimeline(CHECKOUT_STEPS.SHIPPING);
}, [])

  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="container">
        <div className="order-details">
       
            {/* <li
              className={classNames({
                // done: isLoggedIn,
                active: step === CHECKOUT_STEPS.AUTH
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.AUTH)}
            >
              <h2>Sign In</h2>
              <i className="rsc-icon-check_circle" />
            </li> */}
            <div
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
            
            </div>
            {/* <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li> */}
          
          {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />}
         
        </div>
        
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default Checkout;
