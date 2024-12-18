const initialState={
    posts:[]
}
export const postReducer = (state=initialState , action )=>{
    switch(action.type){
        case 'GET_ALL_POST': {
            return {
                ...state,
                posts: action.payload.posts
            };
        }
        
        default: return state
    }
}

