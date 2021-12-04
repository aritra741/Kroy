const express = require('express')
const bodyParser = require('body-parser')
const SSLCommerzPayment = require('sslcommerz')
const app = express()

require('dotenv').config()

app.use(bodyParser({
    extended: false
}))
app.use(bodyParser.json())

app.get('/ssl-request', async (req, res, next) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://127.0.0.1:3030/ssl-payment-success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment("kroy61ab4cc56ba8d", "kroy61ab4cc56ba8d@ssl", false)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        // let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        // console.log('Redirecting to: ', GatewayPageURL)

        if(apiResponse?.GatewayPageURL){
            return res.status(200).redirect(apiResponse?.GatewayPageURL)
        }
        else
            return res.status(400).json({
                message: "SSL session was not successful"
            })
    });


})

app.post("/ssl-payment-success", async(req,res,next)=>{
    res.redirect('http://127.0.0.1:3000/')
})

app.post("/ssl-payment-failure", async(req,res,next)=>{
    return res.status(400).json({
        data: req.body
    })
})

app.post("/ssl-payment-cancel", async(req,res,next)=>{
    return res.status(200).json({
        data: req.body
    })
})

app.post("/ssl-payment-ipn", async(req,res,next)=>{
    res.redirect('http://127.0.0.1:3000/')
})


app.listen(3030, ()=>{
    console.log("App is running")
})

