const reducer=(state,action)=>{
    switch(action.type)
    {
        case "SET_LOADING":
            return{
                ...state,
                isLoading:true,
            }
        case "GET_STORIES":
            return {
                ...state,
                isLoading:false,
                hits:action.payload.Hits,
                nbPages:action.payload.NbPages,
            }
        case "REMOVE_POST":
            return{
                ...state,
                hits:state.hits.filter((curEle)=> curEle.objectID!==action.payload)  
            };
        case "SEARCH_POST":
            return{
                ...state,
                query:action.payload
            };
        case "GET_PREV_PAGE":
            let pageNum=state.page-1;
            if(pageNum<=0)
            {
                pageNum=0;
            }
            return{
                ...state,
                page:pageNum
            }
        case "GET_NEXT_PAGE":
            let pageInc=state.page+1;
            if(pageInc>=state.nbPages)
            {
                pageInc=0;
            }
            return{
                ...state,
                page:pageInc
            }
    }
    return state;
}
export default reducer;