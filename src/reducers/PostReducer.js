export const postReducer = (state, action) => {
    const { type , payload} = action
    switch (type){
        case 'POSTS_LOADED_SUCCESS':
            return {
                ...state,
                posts: payload,
                postLoading: false
            }
        default:
            return state
    }
}