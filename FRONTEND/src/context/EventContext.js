import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const EventContext=createContext();
export const useEvent=()=>{
    const context=useContext(EventContext)
    if(!context) throw new Error('Club provider does not exist')
    return context;
}
        
let GET_EVENTS_URL=getUrl('Evenements');
let GET_MY_EVENTS_URL=getUrl('MyEvenements');
let APPROUVE_EVENT_URL=getUrl('EvenementsChangeApprouvement');



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

if(localStorage.getItem('clubinfo')){
    CLUB_INFO=JSON.parse(localStorage.getItem('clubinfo')).data;

}


export const EventContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )


    const getEvents=async ()=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const events=await axios.get(GET_EVENTS_URL,config);
            setLoading(false)
            return events;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }
 

    
    const getMyEvents=async ()=>{
        console.log(GET_MY_EVENTS_URL)
        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const my_events=await axios.get(GET_MY_EVENTS_URL,config);
            setLoading(false)
            return my_events;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    
 

    const getApprouvedEvents=async (status)=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const events=await axios.get(GET_EVENTS_URL+`?isApprouved[eq]=${status}`,config);
            setLoading(false)
            return events;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }


    const getApprouvedMyEvents=async (status)=>{

        const config={
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
        };
        try{
            setLoading(true)
            const events=await axios.get(GET_MY_EVENTS_URL+`?isApprouved[eq]=${status}`,config);
            setLoading(false)
            return events;
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
            const event=await axios.get(GET_EVENTS_URL+`/${id}`,config);
            setLoading(false)
            return event;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }


    const ApprouveOrNotEvent=async (id)=>{
        console.log('approuvemetn event')

        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const club=await axios.patch(APPROUVE_EVENT_URL+`/${id}`,null,config);
            setLoading(false)
            return club;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }

 

    

    const store=async (name,description,startAt,endAt,image,salles=null)=>{
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };

            const event=await axios.post(GET_EVENTS_URL,{name,description,startAt,endAt,image,salles},config);
            setLoading(false)
            return event;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

    const update=async (id,name,description,startAt,endAt,image,salles=null)=>{

        if(true){
            try {
                setLoading(true)
                var config={
                    headers:{
                        'Content-Type':'application/json',
                        Authorization:`Bearer ${TOKEN}`,
                    },
                };
    
                const event=await axios.patch(GET_EVENTS_URL+`/${id}`,{name,description,startAt,endAt,image,salles}
             ,config);
                setLoading(false)
                return event;
            } catch (error) {
                toast.error('an error has been occured while logging out ')
            }


        }
    }


    const deleteEvent=async (id)=>{
        try {
            setLoading(true)
       
            var config={
                headers:{
                    'Content-Type':'multipart/form-data',
                    Authorization:`Bearer ${TOKEN}`,
                },
            };

            const res=await axios.delete(GET_EVENTS_URL+`/${id}`,config);
            setLoading(false)
            return res;
        } catch (error) {
            toast.error('an error has been occured while logging out ')
        }
    }

return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <EventContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getEvents,update,getMyEvents,getApprouvedEvents,getApprouvedMyEvents,show,store,deleteEvent,ApprouveOrNotEvent }}> 
        {children}
    </EventContext.Provider>
)
    

}













