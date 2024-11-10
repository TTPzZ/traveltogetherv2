import React ,{ useState }from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import {Spin} from 'antd'

export const AuthContext = React.createContext();

export default function AuthProvider({children}) {
    const [user,setUser] =useState({});
    const navigate = useNavigate();
    const [isloading,setIsLoading]= useState (true);

    React.useEffect(()=>{
        const unsubscibed= auth.onAuthStateChanged((user)=>{
        //console.log({user});
        if (user){
            const {displayName, email,uid,photoURL}=user;
            setUser({
                displayName, 
                email,
                uid,
                photoURL
            })
            setIsLoading(false);
            //console.log('login success')
            navigate('/room');
            return;
        }
        else{
            setIsLoading(false);
            //console.log('login faled')
             navigate('/login');
        }
       
    })
//clear function
    return()=>{
        unsubscibed();
    }

    }, [navigate])
    

  return (
    <AuthContext.Provider value={{user}}> 
        {isloading? <Spin/>:children}
    </AuthContext.Provider>
  )
}
