import React, {useReducer} from 'react';


export const AuthContext  = React.createContext();
const authReducer = (state,action)=>{
    switch (action.type) {
        case 'login':
            const token = action.payload;
            console.log(token);
            localStorage.setItem('token',token);
            return {state:token};
           
        case 'check':
            const user =  localStorage.getItem('token'); 
           // const history = useHistory();
             if(!user){
                //action.payload.history.push('/login')
              // history.push('/login');
                 console.log(user);
                
            } 
            break;
        case 'logout':
             localStorage.removeItem('token');
          //  action.payload.history.push('/');
          console.log('****LogOut');
            break;
        default:
            return state;
           
    }
}
const AuthContextProvider = (props)=>{
    const [ state, dispatch] = useReducer(authReducer,'')
    return(
        <AuthContext.Provider value={{state,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;