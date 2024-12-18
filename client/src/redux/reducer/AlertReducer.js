const initialState ={
    loading:false,
    likeorunlikeloading:false,
    addcommentloading:false,
    followloading:false,
    unfollowloading:false,
    editpostloading:false,
    deletepostloading:false,
}

export const alertReducer= (state=initialState ,action)=>{
    switch(action.type){
        case 'LOADING':return{
            ...state,
            loading:action.payload
        }
        case 'LIKE_UNLIKE_LOADING':return{
            ...state,
            likeorunlikeloading:action.payload
        }
        case 'ADD_COMMENT_LOADING':return{
            ...state,
            addcommentloading:action.payload
        }
        case 'FOLLOW_LOADING':return{
            ...state,
           followloading:action.payload
        }
        case 'UNFOLLOW_LOADING':return{
            ...state,
           unfollowloading:action.payload
        }
        case 'EDIT_POST_LOADING': {
            return {
                ...state,
                editpostloading: action.payload
            };
        }
        case 'DELETE_POST_LOADING': {
            return {
                ...state,
                deletepostloading: action.payload
            };
        }
        default :return state
    }
}