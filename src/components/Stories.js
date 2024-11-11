import React from 'react'
import { useGlobalContext } from '../Context'
const Stories = () => {
    const {hits,isLoading,removePost}=useGlobalContext();
    if(isLoading)
    {
        return <>
        <h1>Loading....</h1>
        </>
    }
    if (!hits || hits.length === 0) {
      return <h1>No stories available</h1>;
    }
  return (
    <>
    <div className='stories-div'>
    {hits.map((curr)=>{
      const {title,author,objectID,url,num_comments}=curr
        return(
        <div className='card' key={objectID}>
          <h2>{title}</h2>
          <p>
            By <span>{author}</span> | <span>{num_comments}</span> Comments
          </p>
          <div className='card-button'>
            <a href={url}>
              Read More
            </a>
            <a href='#' onClick={()=>removePost(objectID)}>Remove</a>
          </div>
        </div>
      )
    })}
    </div>
    </>
  )
}

export default Stories