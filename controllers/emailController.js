const express = require("express")
const nodemailer = require("nodemailer")
const User = require("../models/User")
const dotenv = require("dotenv")


dotenv.config()


const from = process.env.MAILSENDER
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: from,
        pass: process.env.PASSWORD
    }
})


const emailController = async (req, res) => {
    try {

        // const {name,email,mobile}=req.body
        var data = new User(req.body)
        // Email Validation Code
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const isValidEmail = emailRegex.test(req.body.email);

        if (isValidEmail === false) {
            console.log("email is not correct");
            throw new Error("Please write correct email id")
        }

        // if (email === User.email) {
        //     var data = await User.findOne({ email: req.body.email })
        //     if (data) {
        //         let otp = parseInt(Math.random() * 1000000)
        //         data.otp = otp
        //         await data.save()
        //         mailOption = {
        //             from: from,
        //             to: data.email,
        //             subject: "OTP for Password Reset !!! : Team Ecom",
        //             text: `
        //                     OTP for Password Reset is ${otp}
        //                     Team : Ecom PVT LTD
        //                     Noida`
        //         }
        //         transporter.sendMail(mailOption, (error, data) => {
        //             if (error)
        //                 console.log(error);
        //         })
        //         res.send({ result: "Done", message: "OTP is Sent on Your Registered Email Id!!" })


        //     }
        //     else{
        //         res.status(404).send({ result: "Fail", message: "Invalid Username!!" })
        //     }
        // }

            if (data) {
                let otp = parseInt(Math.random() * 1000000)
                data.otp = otp
                await data.save()
                mailOption = {
                    from: from,
                    to: data.email,
                    subject: "OTP for Verify Email Id",
                    text: `
                            OTP for verify email id is ${otp}
                            Team : Agatsa
                            Noida sec 59`
                }
                transporter.sendMail(mailOption, (error, data) => {
                    if (error)
                        console.log(error);
                })
                res.send({ result: "Done",
                message: "OTP is Sent on Your Registered Email Id!!",
                data:data
                })
            }
            else{
                res.status(404).send({ result: "Fail", message: "Invalid Username!!" })
            }
        


        // await data.save()
        // res.send({
        //     result: "Done",
        //     data: data
        // })



    }
    catch (error) {
        res.send({
            result: "Fail",
            message: "Internal server Error"
        })
    }
}

module.exports = emailController