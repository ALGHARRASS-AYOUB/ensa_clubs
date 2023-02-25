import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUrl } from "../API";
import axios from "axios";
import { toast } from "react-toastify";
const userContext=createContext();
export const useUser=()=>{
    const context=useContext(userContext)
    if(!context) throw new Error('Auth provider does not exist')
    return context;
}
        
let USERS_URL=getUrl('Users');


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
export const UserContextProvider=({children})=>{
  const navigate=useNavigate();
    const [isLoading,setLoading   ]=useState(false  )

    

    // attempt for login
    const getUsers=async ()=>{
        console.log('in getUsers context',TOKEN)
        console.log('in getUsers context',USERS_URL)
        const config={
            headers:{
                 'content-type':'application/json',
                  Authorization:`Bearer ${TOKEN}`,

            },
        };
        try{
            setLoading(true)
            const users=await axios.get(`${USERS_URL}`,config)
            setLoading(false)
            return users;
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
            const user=await axios.post(USERS_URL+`/${id}`,null,config);
            setLoading(false)
            return user;
        }catch(error){
            toast.error('an error has been occured while fetching data')
        }
    }




    ///////////////////////////////////
    const deleteUserByAdmin = async id => {
        setLoading(true);
        try {
          const config = {
            headers: {
                'content-type':'application/json',
                Authorization:`Bearer ${TOKEN}`,
            },
          };
          const { data } =await axios.delete(USERS_URL+`/${id}`,config);

          setLoading(false);
          return data;
        } catch (error) {
          toast.error('Something went wrong');
          console.log(error.response);
          setLoading(false);
        }
      };
      const updateUserByAdmin = async (
        id,
        email,
        firstName,
        lastName,
        role,
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
            `${USERS_URL}/${id}`,
            {
                id,
                email,
                firstName,
                lastName,
                role,
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
    
      const updateProfile = async (
        id,
        email,
        firstName,
        lastName,
        role,
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
            USERS_URL+`/${id}`,
            {
                id,
                email,
                firstName,
                lastName,
                role,
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



return (
    // the return the created context createdcontext.provider"""
    // the value prop is like we would export those data.
    <userContext.Provider 
    value={{ USER_INFO,isLoading,setLoading,getUsers,show,updateUserByAdmin,updateProfile,deleteUserByAdmin }}> 
        {children}
    </userContext.Provider>
)
    

}













