import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../type'

const GithubState = (props)=>{
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state, dispatch] = useReducer(GithubReducer,initialState);
   //Search githhub users
 const searchUser = async(text)=>{
    setLoading();
      await axios.get(`https://api.github.com/search/users?q=${text}`)
    .then(res=>{
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items
        })
  
        })
    .catch(err=>{
      console.log(err)
    })
  }
    //Get single User
    const getUser = async(username)=>{
        setLoading()
    
        await axios.get(`https://api.github.com/users/${username}`)
        .then(res=>{
      dispatch({
          type:GET_USER,
          payload:res.data
        })
      
        })
        .catch(err=>{
          console.log(err)
        })
      }
    //Get Repos
    const getUserRepos = async username=>{
        setLoading()
             await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
        .then(res=>{
            dispatch({
                type:GET_REPOS,
                payload:res.data
                }
                    )
      
        })
        .catch(err=>{
          console.log(err)
        })
      }
    //Clear Users
    const clearUsers =()=>{
       dispatch({type:CLEAR_USERS})
       
      }
    //Set Loading
const setLoading =()=>{
    dispatch({type:SET_LOADING})
}
    return( <GithubContext.Provider
    value={{
        users:state.users,
        user:state.user,
        repos:state.repos,
        loading:state.loading,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos
    }}
    >
{props.children}
    </GithubContext.Provider>)
}
export default GithubState;