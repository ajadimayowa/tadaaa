let baseUrl = import.meta.env.VITE_APP_BASE_URL;

let otpGenerator = () => {
    console.log(baseUrl)
    let otp = Math.floor(Math.random() * 1000000)
    return otp
}

const generateVerificationLink = (email:string, otp:number) => {
    return `${baseUrl}/verify?email=${encodeURIComponent(email)}&otp=${otp}`;
};


export {generateVerificationLink,otpGenerator}