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
let GET_MYCLUB_URL=getUrl('MyClub');
let VERIFICATION_URL=getUrl('VerifyClub');
let SUSPENDING_URL=getUrl('SuspendClub');



var USER_INFO=null;
var TOKEN=null;
var CLUB_INFO=null;
if(localStorage.getItem('userinfo')){
    USER_INFO=JSON.parse(localStorage.getItem('userinfo')).data;
    if(USER_INFO.adminToken){
       TOKEN=USER_INFO.adminToken
    }
    
    if(USER_INFO.token){
       TOKEN=USER_INFO.token
    }
    

}

if(localStorage.getItem('clubinfo')!=null){
    CLUB_INFO=JSON.parse(localStorage.getItem('clubinfo')).data;

}


export const ClubContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )


    const getAll=async ()=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const clubs=await axios.get(GET_CLUBS_URL,config);
            setLoading(false)
            return clubs;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    const getVerifiedClubs=async (status)=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const clubs=await axios.get(GET_CLUBS_URL+`?verified[eq]=${status}`,config);
            setLoading(false)
            return clubs;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    const getVerifiedAndNotSuspendedClubs=async ()=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const clubs=await axios.get(GET_CLUBS_URL+`?verified[eq]=1&suspended[eq]=0`,config);
            setLoading(false)
            console.log(clubs)
            return clubs;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    
    const getSuspendedClubs=async (status)=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const clubs=await axios.get(GET_CLUBS_URL+`?suspended[eq]=${status}`,config);
            setLoading(false)
            return clubs;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }
    


    const show=async (id)=>{
        console.log('show CLUB')

        try{
            setLoading(true)
            const config={
                headers:{
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


    const verifyOrNotClub=async (id)=>{
        console.log('verification CLUB')

        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const club=await axios.patch(VERIFICATION_URL+`/${id}`,null,config);
            setLoading(false)
            return club;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

    const suspendedOrNotClub=async (id)=>{
        console.log('suspending CLUB')

        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const club=await axios.patch(SUSPENDING_URL+`/${id}`,null,config);
            setLoading(false)
            return club;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

    
    const getClubOfAuthenticatedUser=async ()=>{
      
        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };
            const club=await axios.get(GET_MYCLUB_URL,config);
            setLoading(false)
            localStorage.setItem('clubinfo',JSON.stringify(club?.data.data));
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

    const update=async (id,name,slugon,activityDomaine,email,supervisor,logo=null,bureauMembersFile=null)=>{
       
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };
            const data={name,slugon,activityDomaine,email,supervisor};
            console.log('data in update :',data,id)
            if(logo!=null){
                data={name,slugon,activityDomaine,email,supervisor,logo}
                if(bureauMembersFile!=null){
                    data={name,slugon,activityDomaine,email,supervisor,logo,bureauMembersFile}
                    }
            }
            const club=await axios.put(GET_CLUBS_URL+`/${id}`,{name,slugon,activityDomaine,email,supervisor,logo},config);
            console.log('club updated:',club,GET_CLUBS_URL+`/${id}`)
            setLoading(false)
           if( localStorage.getItem('clubinfo'))
            // localStorage.removeItem('clubinfo')
            return club;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <ClubContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getAll,getVerifiedClubs,getVerifiedAndNotSuspendedClubs,getSuspendedClubs,show,store,update,getClubOfAuthenticatedUser,verifyOrNotClub,suspendedOrNotClub }}> 
        {children}
    </ClubContext.Provider>
)
    

}













