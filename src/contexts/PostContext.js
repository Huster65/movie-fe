import {createContext, useReducer} from 'react'
import { postReducer } from '../reducers/PostReducer'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({children}) => {
    //state
    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postLoading: true
    })

    // GET ALL POST
    const getPosts = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/movie/posts`)
            if (response.data.success) {
                dispatch({type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts})
            }
        } catch (error) {
            return error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
        }
    }

    // Post context data
    const PostContextData = {postState, getPosts}

    return (
        <PostContext.Provider value={PostContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider