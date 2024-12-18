
let initialState={
    users:[],
    savedPosts:[],
   
}

export const userReducer = (state=initialState, action)=>{
    switch(action.type){
        case 'GET_ALL_USERS':{
            return{
                ...state,
                users: action.payload.users
            }
        }
        case 'GET_SAVED_POSTS':
            return {
                ...state,
                savedPosts: action.payload,
            };
        default :return state
    }
}