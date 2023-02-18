import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const ClubContext=createContext();
export const useClub=()=>{
    const context=useContext(ClubContext)
    if(!context) throw new Error('Club provider does not exist')
    return context;
}
        
let GET_CLUBS_URL=getUrl('Clubs');


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
export const ClubContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )

    if(!USER_INFO)
    navigate('/login')

    // attempt for login
    const getAll=async ()=>{
        const config={
            header:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const clubs=await axios.get(GET_CLUBS_URL,null,config);
            setLoading(false)
            return clubs;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }
        // registeration


    const show=async (id)=>{
        try{
            setLoading(true)
            const config={
                header:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const club=await axios.post(GET_CLUBS_URL+`/${id}`,null,config);
            setLoading(false)
            return club;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

    const store=async (name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile)=>{
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };

            const club=await axios.post(GET_CLUBS_URL,{name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile},config);
            setLoading(false)
            return club;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <ClubContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getAll,show,store }}> 
        {children}
    </ClubContext.Provider>
)
    

}













