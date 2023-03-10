import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const ActualityContext=createContext();
export const useActuality=()=>{
    const context=useContext(ActualityContext)
    if(!context) throw new Error('Actuality provider does not exist')
    return context;
}
        
let ACTUALITIES_URL=getUrl('Actualities');
let NEWEST_ACTUALITIES_URL=getUrl('NewActualities');


var USER_INFO=null;
var TOKEN=null;
if(localStorage.getItem('userinfo')){
    USER_INFO=JSON.parse(localStorage.getItem('userinfo')).data;
    if(USER_INFO.adminToken){
       TOKEN=USER_INFO.adminToken
    }
    
    if(USER_INFO.token){
       TOKEN=USER_INFO.token
    }
    

}
console.log(USER_INFO);
export const ActualityContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )


    const getAllActualities=async ()=>{
        const config={
            header:{
                'content-type':'application/json',
            },
        };
        try{
            setLoading(true)
            const actualities=await axios.get(ACTUALITIES_URL,null,config);
            if(actualities!=null)
            setLoading(false)
        
            return actualities;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    const getNewsetActualities=async ()=>{
        const config={
            header:{
                'content-type':'application/json',
            },
        };
        try{
            setLoading(true)
            const actualities=await axios.get(NEWEST_ACTUALITIES_URL,null,config);
            // if(actualities)
            // setLoading(false)
            return actualities;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }


    const show=async (id)=>{
        try{
            setLoading(true)
            const config={
                header:{
                    'content-type':'application/json',
                },
            };
            const actuality=await axios.get(ACTUALITIES_URL+`/${id}`,config);
            setLoading(false)
            return actuality;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

    const store=async (title,body,startAt,endAt,image,evenementId=null)=>{
        let data=null;
        var config=null;
        try {
            if(evenementId!=null){
                data={startAt,endAt,evenementId}
                var config={
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${TOKEN}`,
                    },
                };
                setLoading(true)
            }else{
                setLoading(true)
                data={title,body,startAt,endAt,image}
                var config={
                    headers:{
                        'Content-Type':'multipart/form-data',
                        Authorization:`Bearer ${TOKEN}`,
                    },
                };
            }
    
            const actuality=await axios.post(ACTUALITIES_URL,data,config);
            setLoading(false)
            return actuality;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

    const update=async (id,title,body,startAt,endAt,image,evenementId=null)=>{
        let data=null;
        var config=null;
        try {
            if(evenementId!=null){
                data={startAt,endAt,evenementId}
                var config={
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${TOKEN}`,
                    },
                };
                setLoading(true)
            }else{
                setLoading(true)
                data={title,body,startAt,endAt,image}
                var config={
                    headers:{
                        'Content-Type':'multipart/form-data',
                        Authorization:`Bearer ${TOKEN}`,
                    },
                };
            }
    
            const actuality=await axios.patch(ACTUALITIES_URL+`/${id}`,data,config);
            setLoading(false)
            return actuality;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

    const deleteActuality=async (id)=>{
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };

            const res=await axios.delete(ACTUALITIES_URL+`/${id}`,config);
            setLoading(false)
            return res;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <ActualityContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getAllActualities,getNewsetActualities,show,store,update,deleteActuality }}> 
        {children}
    </ActualityContext.Provider>
)
    

}













