import { AxiosPromise } from "axios";
import api from "../controllers/api";

const getGigs = async (payload:any):Promise<AxiosPromise>=>{
   const {id,limit,page}=payload
    const res = await api.get(`gigs?gigCategoryId=${id}&limit=${limit}&page=${page}`);
    console.log({ hereMe: res })
    if(res.data){
        return res
    } else {
        return res
    }
   
}

const getGig = async (id:number)=>{
    const res = await api.get(`service/${id}`);
    if(res.data){
        return {success:true,loading:false,data:res.data?.services}
    } else {
        return {success:false,loading:false,data:{}}
    }
   
}

export {getGigs,getGig}