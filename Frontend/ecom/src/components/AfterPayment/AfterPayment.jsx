import "./styles.css";
import React, { useState } from "react";
import { useEffect } from "react";
import Styled from "styled-components";
import { PageContainer } from "../pageContainer";
import { Navbar } from "../navbar";
import axios from "axios";

const Overall = Styled.div`
  display: flex;
  // width: 680px;
  height: 370px;
  // max-width: 680px;
  // max-height: 370px;
  margin: 0 auto;
  background-color: #fff;
  [class*="col-"] {
    padding: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .col-1 img {
    width: 100%;
    max-width: 145px;
  }
  .ty-text { margin: 0; }
  .thankyou-main-text {
    color: #2C3345;
    font-size: 50px;
  }
  .thankyou-sub-text { color: rgba(44, 51, 69, 0.6); }
  
  ${({ type }) =>

        `
    justify-content: center;
    flex-direction: column;
  `}
  ${({ type }) =>
        `
    align-items: center;
    [class*="col-"] {
      flex: 1 1;
      height: 100%;
    }
  `}
  ${({ reverseCol }) =>
        reverseCol &&
        `
    .col-1 { order: 2; }
    .col-2 { order: 1; }
  `}
  ${({ col1Width, col2Width, col1Height, col2Height }) =>
        `
    .col-1 {
      flex-basis: ${col1Width}%;
      min-height: ${col1Height}%;
    }
    .col-2 {
      flex-basis: ${col2Width}%;
      min-height: ${col2Height}%;
    }
  `}
  ${({ hasBG }) =>
        hasBG &&
        `
    background: url('https://www.sirfrancisdrake.com/images/1700-960/istock-1136437406-sfbridge-493862f1.jpg') center;
  `}
  ${({ col1BG }) =>
        col1BG &&
        `
    .col-1 { background-color: rgb(255 255 255 / 28%); }
  `}
  ${({ col2BG }) =>
        col2BG &&
        `
    .col-2 { background-color: rgb(255 255 255 / 28%); }
  `}
  ${({ col1XA }) => `.col-1 { align-items: ${col1XA}; }`}
  ${({ col2XA }) => `.col-2 { align-items: ${col2XA}; }`}
  ${({ col1YA }) => `.col-1 { justify-content: ${col1YA}; }`}
  ${({ col2YA }) => `.col-2 { justify-content: ${col2YA}; }`}
`;

export default function AfterPayment() {

    useEffect(() => {

        function addOrder() {
            const formData = new FormData();

            formData.append("payment_stats", "R");
            formData.append("customer", localStorage.getItem('user'))
            formData.append("bid", localStorage.getItem('bid'))

            axios.post("http://localhost:8000/store/addorders/",
                formData
            )
                .then((result) => {
                    console.log("Success:", result);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

        }

        addOrder()
    }, [])

    return (
        <PageContainer>
            <Navbar />
            <Overall
                className="container"
                stylisOptions={{ prefix: false }}

            >
                <div className="col-1 ">
                    <img
                        src="https://cms.jotform.com/uploads/image_upload/image_upload/global/128011_Group%20742.png"
                        alt=""
                    />
                </div>
                <div className="col-2">
                    <h1 className="thankyou-main-text ty-text">Thank You!</h1>
                    <p className="thankyou-sub-text ty-text">
                        Your payment has been received.
                    </p>
                </div>
            </Overall>
        </PageContainer>
    );
}
