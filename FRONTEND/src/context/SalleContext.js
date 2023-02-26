import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const salleContext=createContext();
export const useSalle=()=>{
    const context=useContext(salleContext)
    if(!context) throw new Error('salle provider does not exist')
    return context;
}
        
let SALLES_URL=getUrl('Salles');
let DISPO_SALLES_URL=getUrl('DispoSalles');
let RESERVED_SALLES_URL=getUrl('ReservedSalle');
let DISPO_NOT_RESERVED_URL=getUrl('DispoNotReservedSalle');
let DISPO_CHANGE_URL=getUrl('SalleChangeDisponibility')


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
export const SalleContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )

    

    // attempt for login
    const getSalles=async ()=>{

        const config={
            headers:{
                 'content-type':'application/json',
                  Authorization:`Bearer ${TOKEN}`,

            },
        };
        try{
            setLoading(true)
            const salles=await axios.get(`${SALLES_URL}`,config)
            setLoading(false)
            return salles;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }

    }

    const getSallesByDisponibility=async (status)=>{

      const config={
          headers:{
               'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,

          },
      };
      try{
          setLoading(true)
          const salles=await axios.get(`${SALLES_URL}?isDisponible[eq]=${status}`,config)
          setLoading(false)
          return salles;
      }catch(error){
          toast.error('an error has been occured while fetching data')
      }

  }


  const getSallesByReservedStatus=async (status)=>{

    const config={
        headers:{
             'content-type':'application/json',
              Authorization:`Bearer ${TOKEN}`,

        },
    };
    try{
        setLoading(true)
        const salles=await axios.get(`${SALLES_URL}?isReserved[eq]=${status}`,config)
        setLoading(false)
        return salles;
    }catch(error){
        toast.error('an error has been occured while fetching data')
    }

}

    const show=async (id)=>{
        console.log('show USER')

        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const salle=await axios.post(SALLES_URL+`/${id}`,null,config);
            setLoading(false)
            return salle;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }




    ///////////////////////////////////
    const deleteSalleByAdmin = async id => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const { data } =await axios.delete(SALLES_URL+`/${id}`,config);

          setLoading(false);
          return data;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error.response);
          setLoading(false);
        }
      };
      const updateSalleByAdmin = async (
        id,
        name,
        isDisponible,
        description,
      ) => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const { data } = await axios.put(
            `${SALLES_URL}/${id}`,
            {
                id,
                name,
                isDisponible,
                description,
            },
            config,
          );
          toast.success('Updated successfully');
          setLoading(false);
          return data;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error);
          setLoading(false);
        }
      };
    
      const getDispoAndNotReservedSalles = async ( ) => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const salles = await axios.get(
            DISPO_NOT_RESERVED_URL,
            config,
          );
     
          setLoading(false);
          return salles;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error);
          setLoading(false);
        }
      };


          
      const getDispoSalles = async ( ) => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const salles = await axios.get(
            DISPO_SALLES_URL,
            config,
          );
     
          setLoading(false);
          return salles;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error);
          setLoading(false);
        }
      };

      const getReservedSalles = async ( ) => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const salles = await axios.get(
            RESERVED_SALLES_URL,
            config,
          );
     
          setLoading(false);
          return salles;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error);
          setLoading(false);
        }
      };

    
      const changeDiponibilitySalle=async (id)=>{
        console.log('dispo salle ??')

        try{
            setLoading(true)
            const config={
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${TOKEN}`,

                },
            };
            const salle=await axios.patch(DISPO_CHANGE_URL+`/${id}`,null,config);
            setLoading(false)
            console.log(salle)
            return salle;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }



return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <salleContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getSalles,getSallesByDisponibility,getSallesByReservedStatus,show,changeDiponibilitySalle,updateSalleByAdmin,deleteSalleByAdmin,getDispoAndNotReservedSalles,getDispoSalles,getReservedSalles }}> 
        {children}
    </salleContext.Provider>
)
    

}













