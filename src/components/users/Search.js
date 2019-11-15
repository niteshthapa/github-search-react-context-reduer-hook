import React,{useState,useContext} from 'react';
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

  const Search = ()=>{
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    const[text,setText] = useState('')
   
   const onSubmit =(e)=>{
        e.preventDefault();
     if(text === '' ){
      alertContext.setAlert("Please enter value","light")
     }
     else{
      githubContext.searchUser(text);
       setText('')
     }
       
   }
   const onChange = (e) =>{
       setText(e.target.value)
   }
  
  
   
        return (
          <div>
              <form onSubmit={onSubmit} className="form">
            <input value={text} onChange={onChange} type="text" name="text" placeholder="Search User..." />
            <input type="submit" value="Search" className="btn btn-dark btn-block" />
              </form>
              {githubContext.users.length > 0 && <input type="submit" value="Clear" onClick={githubContext.clearUsers} className="btn btn-light btn-block" />}
              
          </div>
        )
  
}
// Search.propTypes ={

// setAlert:PropTypes.func.isRequired
// }

export default Search;
