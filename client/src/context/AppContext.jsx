import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const AppContext = createContext();
//Context allows you to share values (like state or functions) between components, without having to pass props manually at every level.
const AppContextProvider=(props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token,setToken]=useState(localStorage.getItem("token"));
    const [credit,setCredit]=useState(false);

    const backendUrl=import.meta.env.VITE_BACKEND_URL;

    const navigate=useNavigate()

    const loadCreditsData=async()=>{
        try{
            const {data}=await axios.get(backendUrl+"/api/users/credits",{
                headers:{token}
            })
            if(data.success){
                setCredit(data.credits)
                setUser(data.user);
            }
            else{
                toast.error(data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.message)
        }
    }
    const generateImage=async(prompt)=>{
        try{
            const {data}=await axios.post(backendUrl+"/api/images/generate-image",{prompt},{
                headers:{token}
            })
            if(data.success){
                loadCreditsData();
                return data.resultImage
            }
            else{
                toast.error(data.message)
                loadCreditsData();
                if(data.creditBalance===0){
                    navigate('/buy')
                }
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    const logout=()=>{
        localStorage.removeItem("token");
        setToken('');
        setUser(null)
    }
    useEffect(()=>{
        if(token) {
            loadCreditsData();
        }
    },[token])
    const value={  //things in value can be accessed by any component 
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    }

    return (
        // This means **any component inside this provider** (`props.children`) can "consume" the state and updater by using the AppContext.
        <AppContext.Provider value={value}> 
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;