import React, { useReducer,useEffect } from "react";
import { useContext } from 'react'
import reducer from "./reducer";
let API="http://hn.algolia.com/api/v1/search?";
const initialState={
    isLoading:true, 
    query:"",
    nbPages:0,
    page:0,
    hits:[],
};
const appContext=React.createContext();
const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState);
    const fetchApiData=async (url)=>{
        dispatch({type:"SET_LOADING"});
        try{
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            dispatch({type:"GET_STORIES",
                payload:{
                    Hits:data.hits,
                    NbPages:data.nbPages,   
                },
            })
        }
        catch(err){
            console.log(err);
        }
    }
    const removePost=(Id)=>{
        dispatch({type:"REMOVE_POST",payload:Id});
    }
    const searchPost=(val)=>{
        dispatch({type:"SEARCH_POST",payload:val})
    }
    const getPrevPage=()=>{
        dispatch({
            type:"GET_PREV_PAGE",
        })
    }
    const getNextPage=()=>{
        dispatch({
            type:"GET_NEXT_PAGE",
        })
    }
    useEffect(()=>{
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    },[state.query,state.page]);
    return(
        <appContext.Provider value={{...state,removePost,searchPost,getPrevPage,getNextPage}}>
            {children}
        </appContext.Provider>
    )
}
const useGlobalContext=()=>{
    return useContext(appContext);
}
export {appContext,AppProvider,useGlobalContext};    