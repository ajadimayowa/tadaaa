let dev = import.meta.env.DEV;
let baseURL = import.meta.env.BASE_URL

export const  fundingURL=import.meta.env.VITE_FUNDING_URL
export const emailVerificationUrl = import.meta.env.VITE_APP_BASE_URL

const enviromentMode = ()=>{
    console.log(dev)
    if(dev){
        baseURL = import.meta.env.BASE_URL
        return baseURL
    } else { return baseURL}

}

export default enviromentMode;