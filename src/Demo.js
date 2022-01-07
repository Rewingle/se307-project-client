import { display } from '@mui/system'
import React from 'react'
import { useState } from 'react'

export function Demo() {

    
   const tops ={
        Top0: 'Education',
        Top1:'',
        Top2: ''
    }
    const [topCount,setTopCount] = useState(1)
    const Topics = ()=>{
        return(
          <select style={{marginLeft:'8px',marginTop:'6px'}} name='type' onChange={(e)=>{tops.Top0 = e.target.value}}>
                <option value='Education'>Education</option>
                <option value='Psychology'>Psychology</option>
                <option value='Computer Science'>Computer Science</option>
                <option value='Electronics'> Electronics</option>
                <option value='Chemistry'>Chemistry</option>
                <option value='Physics'>Physics</option>
                <option value='Artifical Intelligence'>Artifical Intelligence</option>
                <option value='Computer Vision'> Computer Vision</option>
                <option value='Economics'>Economics</option>
                <option value='Sociology'> Sociology</option>
            </select>
        )
      }
      const Topics1 = ()=>{
        return(
          <select style={{marginLeft:'8px',marginTop:'6px',display: (topCount>1)?'block':'none'}} name='type' onChange={(e)=>{tops.Top1 = e.target.value}}>
                <option value='Education'>Education</option>
                <option value='Psychology'>Psychology</option>
                <option value='Computer Science'>Computer Science</option>
                <option value='Electronics'> Electronics</option>
                <option value='Chemistry'>Chemistry</option>
                <option value='Physics'>Physics</option>
                <option value='Artifical Intelligence'>Artifical Intelligence</option>
                <option value='Computer Vision'> Computer Vision</option>
                <option value='Economics'>Economics</option>
                <option value='Sociology'> Sociology</option>
            </select>
        )
      }
      const Topics2 = ()=>{
        return(
          <select style={{marginLeft:'8px',marginTop:'6px',display: (topCount>2)?'block':'none'}} name='type' onChange={(e)=>{tops.Top2 = e.target.value}}>
                <option value='Education'>Education</option>
                <option value='Psychology'>Psychology</option>
                <option value='Computer Science'>Computer Science</option>
                <option value='Electronics'> Electronics</option>
                <option value='Chemistry'>Chemistry</option>
                <option value='Physics'>Physics</option>
                <option value='Artifical Intelligence'>Artifical Intelligence</option>
                <option value='Computer Vision'> Computer Vision</option>
                <option value='Economics'>Economics</option>
                <option value='Sociology'> Sociology</option>
            </select>
        )
      }

    return (
        <div>
            <Topics ></Topics>
            <Topics1></Topics1>
            <Topics2></Topics2>
            <button onClick={()=>{if(topCount < 4)
                {setTopCount(topCount+1)}}}>
                
                +</button>
            <button onClick={()=>{if(topCount >0)
                    {setTopCount(topCount-1)}}}>
                    
                    -</button>
            <button onClick={()=>{
                        alert(tops.Top0 + tops.Top1 + tops.Top2)}}>
                        
                        </button>
        </div>
    )
}

export default Demo
