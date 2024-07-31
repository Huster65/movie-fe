import { Children, createContext, useReducer } from "react";
import axios from 'axios'
import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post('http://localhost:3000/user/login', userForm)
            if (response.data.success)
            localStorage.setItem('userToken', response.data.accessToken)
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post('http://localhost:3000/user/create', userForm)
            if(response.data.success)
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // Context data
    const authContextData = {loginUser, registerUser, authState}

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider