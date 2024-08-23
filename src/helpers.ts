import { emailVerificationUrl } from "./app/config";

let otpGenerator = () => {
   
    let otp = Math.floor(Math.random() * 1000000)
    return otp
}

const generateVerificationLink = (email:string, otp:number) => {
    return `${emailVerificationUrl}/verify?email=${encodeURIComponent(email)}&otp=${otp}`;
};


export {generateVerificationLink,otpGenerator}