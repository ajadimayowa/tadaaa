import api from "../controllers/api";

const getServices = async (limit:number,page:number)=>{
    const res = await api.get(`services?limit=${limit}&page=${page}`);
    if(res.data){
        return {success:true,loading:false,data:res.data}
    } else {
        return {success:false,loading:false,error:res.statusText}
    }
   
}

const getService = async (id:number)=>{
    const res = await api.get(`service/${id}`);
    if(res.data){
        return {success:true,loading:false,data:res.data?.services}
    } else {
        return {success:false,loading:false,data:{}}
    }
   
}

export {getServices,getService}