
import './App.css';
import Axios from "axios";
import { useState, useEffect } from 'react';
import {useTransition, animated, useSpring} from 'react-spring'

import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import Popup from './Popup';
import PopupUniversity from './PopupUniversity';
import { Alert } from '@mui/material';
import PopupInstitue from './PopupInstitues';
import Demo from './Demo';

function App() {
  
 
  const CurrentThesis = {
    Title: '',
    Author: '',
    University: '',
    Abstract: '',
    Institute: '',
    Year: '',
    SubmissionDate: '',
    isCurrentDate: false,
    Pages: '',
    Language: 'English',
    Type: 'Master',
    Topic: 'Education'
  }
  const SearchInputs = {
    SearchThesis: '',
    SearchAuthor: '',
    SearchType: 'Any'
  }

  const [thesisList,setThesisList] = useState([]);
  
  const [addClick,setaddClick] = useState(false);
  const tops ={
    Top0: '',
    Top1:'',
    Top2: ''
}

const [topCount,setTopCount] = useState(1)


  const [PopupTrigger,setPopupTrigger] = useState(false);
  const [UPopupTrigger,setUPopupTrigger] = useState(false);
  const [IPopupTrigger,setIPopupTrigger] = useState(false);
  const [Universities,SetUniversities] = useState([]);
  const [Institutes,SetInstitutes] = useState([]);
  const [inputUniversity,setInputUniversity] = useState();
  const [inputInstitute,setInputInstitute] = useState();

  
  const addUniversity = ()=>{
    Axios.post("http://localhost:3001/api/addUniversity",{
      University: inputUniversity
     })
  }
 
  const addInstitute = ()=>{
    Axios.post("http://localhost:3001/api/addInstitute",{
      Institute: inputInstitute
     })
  }
  const slide = useSpring({
    height: addClick? 260 : 5
  })
  const getUniversities = ()=>{
    Axios.get("http://localhost:3001/api/getUniversities").then((Response)=>{
      SetUniversities(Response.data);
      
    })
    
  }
  const getInstitutes = ()=>{
    Axios.get("http://localhost:3001/api/getInstitutes").then((Response)=>{
      SetInstitutes(Response.data);
      
    })
    
  }
 

const CheckInputs=() =>{
  if(CurrentThesis.Title == ''|| 
  CurrentThesis.Abstract == '' || 
  CurrentThesis.Author == '' || 
  CurrentThesis.Year == ''|| 
  CurrentThesis.Institute == ''||
  CurrentThesis.University == '' ||
  CurrentThesis.SubmissionDate == '' ||
  CurrentThesis.Pages == '' ){
    
    return false
  }
  else{
    
    return true
  }
}
 const Filter = () =>{
   Axios.post("http://localhost:3001/api/search",{
    SearchThesis: SearchInputs.SearchThesis,
    SearchAuthor: SearchInputs.SearchAuthor,
    SearchType: SearchInputs.SearchType
   }).then((Response)=>{console.log(Response.data);
      setThesisList(Response.data)
    
  })
 } 
 const postList = () =>{
   //ADDS TO UNIVERSITY LIST
   alert('Submit is Succesful')
  Axios.post("http://localhost:3001/api/addUniversity",{
    University: CurrentThesis.University
   })
   Axios.post("http://localhost:3001/api/addInstitute",{
    Institute: CurrentThesis.Institute
   })
    if(CheckInputs()){
        Axios.post("http://localhost:3001/api/insert",{
        
        Title: CurrentThesis.Title,
        Abstract: CurrentThesis.Abstract,
        Author: CurrentThesis.Author,
        Year: CurrentThesis.Year,
        Type: CurrentThesis.Type,
        University: CurrentThesis.University,
        Institute: CurrentThesis.Institute,
        Number_of_pages: CurrentThesis.Pages,
        Language: CurrentThesis.Language,
        Submission_date: CurrentThesis.SubmissionDate,
        Topic: tops.Top0+','+tops.Top1+','+tops.Top2
      }).then(()=>{
        alert("succesful insert")
      });
    }
    else{
      alert("Please fill all the given fields.");
    }
    
  } 
  const [info,setInfo] = useState([])
  const Thesis = (props)=>{
    return(
      <div style={{marginTop:'10px',width:'100%',height:'48px',backgroundColor:'lightgray',border: '1px solid black'}}>
        <div style={{display: 'grid', height: '100%',gridTemplateColumns: '6% 20% 6% 46% 8% 14%',fontWeight: '400'}}>
          <div className='ThesisId' style={{backgroundColor: 'gray',justifyContent: 'center',alignItems:'center',display:'flex',color: 'white'}} onClick={()=>{setInfo([props.Title,props.Abstract,props.Author,props.University,props.Institute,props.Topic,props.Pages,props.Language,props.SubDate.toString().slice(0,10)]);setPopupTrigger(true)}}>{props.Id}</div>
          <div style={{backgroundColor: 'lightgray',justifyContent: 'center',alignItems:'center',display:'flex'}}>{props.Author}</div>
          <div style={{backgroundColor: 'gray',justifyContent: 'center',alignItems:'center',display:'flex',color: 'white'}}>{props.Year}</div>
          <div style={{backgroundColor: 'lightgray',justifyContent: 'center',alignItems:'center',display:'flex',overflow:'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}}>
          <textarea readOnly disabled rows={2} cols={70} style={{resize:'none',overflow:'hidden',border:'none',backgroundColor:'lightgray',fontFamily:'fantasy',color:'black'}}>{props.Title}</textarea>
          </div>
          <div style={{backgroundColor: 'gray',justifyContent: 'center',alignItems:'center',display:'flex',color: 'white'}}>{props.Type}</div>
          <div style={{backgroundColor: 'lightgray',justifyContent: 'center',alignItems:'center',display:'flex'}}>{props.Institute}</div>
        </div>
      </div>
    )
  }
  const deleteThesis = ()=>{
    Axios.post("http://localhost:3001/api/delete",{
     DeleteTitle: info[0]
      
   }).then(()=>{alert("Thesis Deleted.");
  })
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((Response)=>{
      if(Response.data.length == 0){
        alert('No data');
      }
      setThesisList(Response.data);
    })

  },[])

  const Topics = ()=>{
    return(
      <select style={{marginLeft:'8px',marginTop:'6px'}} name='type' onChange={(e)=>{tops.Top0 = e.target.value}}>
            <option value=''>-</option>
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
            <option value='Computer Vision'> Biology</option>
            <option value='Economics'>Robotics</option>
            
        </select>
    )
  }
  const Topics1 = ()=>{
    return(
      <select style={{marginLeft:'8px',marginTop:'6px',marginLeft:'62px'}} name='type' onChange={(e)=>{tops.Top1 = e.target.value}}>
            <option value=''>-</option>
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
            <option value='Computer Vision'> Biology</option>
            <option value='Economics'>Robotics</option>
            
        </select>
    )
  }
  const Topics2 = ()=>{
    return(
      <select style={{marginLeft:'8px',marginTop:'6px',marginLeft:'62px'}} name='type' onChange={(e)=>{tops.Top2 = e.target.value}}>
            <option value=''>-</option>
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
            <option value='Computer Vision'> Biology</option>
            <option value='Economics'>Robotics</option>
            
        </select>
    )
  }
 

  function AddThesis(props){
    const inputStyle = {
      backgroundColor:'hotpink',marginTop:'12px',height:'100%',justifyContent:'center',display:'flex'
    }
      return (
        <animated.div className="addThesis" style={{height: slide.height,width:'1320px',margin:'auto',overflow:'hidden',borderTop:'2px solid black'}}>
        
          <span style={{height: '100%',width:'25%',float: 'left'}}>
            <div style={{width:'80%',height:'80%',padding:'28px'}}>
              <label style={{float:'left'}}>*Title :</label>
              <br></br>
              <input style={{float:'left',width:'240px',height:'26px'}} onChange={(e)=>{CurrentThesis.Title =(e.target.value)}}>

              </input>
              <label style={{float:'left',marginTop:'14px'}}>*Author of Thesis :</label>
              <br></br>
              <input style={{float:'left',width:'240px',height:'26px'}} onChange={(e)=>{CurrentThesis.Author = (e.target.value)}}>

              </input>
              <label style={{float:'left',marginTop:'14px'}}>*University :</label>
              <br></br>
              <input style={{float:'left',width:'240px',height:'26px'}} onChange={(e)=>{CurrentThesis.University = (e.target.value)}}>
  
              </input>
            </div>
          </span>


          <span style={{height: '100%',width:'25%',float:'left'}}>
            <div style={{width:'80%',height:'80%',padding:'28px'}}>
              <label style={{float:'left'}}>*Abstract :</label>
              <textarea rows="5" cols="60" name="text" maxLength={4950} style={{width:'100%',height:'74%',resize:'none'}} onChange={(e)=>{CurrentThesis.Abstract=(e.target.value)}}>
              
              </textarea>
            </div>
            
          </span>


          <span style={{height: '100%',width:'25%',float:'left'}}>
            <div style={{width:'80%',height:'80%',padding:'28px'}}>
            <label style={{float:'left'}}>*Institute :</label>
              <br></br>
              <input style={{float:'left',width:'246px',height:'26px'}} onChange={(e)=>{CurrentThesis.Institute = (e.target.value)}}>
              
              
              
              </input>
              
             <div >
                <label style={{float:'left',marginTop:'16px'}}>*Year :</label>
                <input style={{width:'240px',height:'26px',width:'40%',marginTop:'14px',marginLeft:'84px'}} placeholder='YYYY' onChange={(e)=>{CurrentThesis.Year = (e.target.value)}} maxLength={4}>
                </input>
             </div>
              
              
              <div>
                <input style={{width:'240px',height:'26px',width:'40%',marginTop:'10px'}} placeholder='YYYY-MM-DD' onChange={(e)=>{CurrentThesis.SubmissionDate = (e.target.value)}} maxLength={10}>
                  
                </input>
                <label style={{float:'left',marginTop:'12px'}}>*Submission Date :</label>
              </div>
              <label style={{float:'left',marginTop:'20px'}} >*Number of Pages :</label>
              <input style={{float:'left',width:'240px',height:'26px',width:'20%',marginTop:'12px',marginLeft:'6px'}} placeholder='1-999' onChange={(e)=>{CurrentThesis.Pages = (e.target.value)}} maxLength={3}>
    
              </input>
             
               
               
                              
          </div>
          
          </span>

          <span style={{height: '100%',width:'25%',float:'left'}}>
          
          <div style={{float:'left',width:'240px',height:'26px',marginTop:'32px'}}>
          <label style={{float:'left'}}>*Type :</label>
          <select name='type' onChange={(e)=>{CurrentThesis.Type = e.target.value}}>
            
            <option value='Master'>Master</option>
            <option value='Doctorate'>Doctorate</option>
            <option value='Specialization in Medicine'>Specialization in Medicine</option>
            <option value='Proficiency in Art'> Proficiency in Art</option>
          </select>
        </div>
        <div style={{float:'left',width:'240px',marginTop:'12px'}}>
          <label style={{float:'left',marginTop:'6px'}}>*Topics:</label>
         
         
            
            
            
          <div>
          
            <Topics  ></Topics>
            <Topics1></Topics1>
            <Topics2></Topics2>
          </div>
          
        </div>
        
        <div style={{float:'left',width:'240px',height:'26px',marginTop:'20px'}}>
        <label style={{float:'left'}}>*Language :</label>
        <select name='type' onChange={(e)=>{CurrentThesis.Language = e.target.value}}>
          <option value='English'>English</option>
          <option value='Turkish'>Turkish</option>
          <option value='French'>French</option>
          <option value='German'>German</option>
          <option value='Italian'>Italian</option>
          <option value='Russian'>Russian</option>
          <option value='Spanish'>Spanish</option>
          <option value='Chinese'>Chinese</option>
        </select>
      </div>
          <button type='submit' style={{float:'left',height:'26px',width:'20%',marginTop:'20px'}} onClick={()=>{postList()}}>SUBMIT</button>
          </span>
          
          
    
    </animated.div>
      )
     
  }
  return (
   <div>
   <div className="App">
   <div className='limited-body' style={{width:'1320px'}}>
     <div> <span style={{float:'left',marginTop:'18px'}}>SE 307 DATABASE PROJECT</span> <span><h1 style={{marginRight:'132px'}}>Graduate Thesis System</h1></span>  <span style={{float:'right',marginTop:'-42px'}}>Mehmet Ali Kul</span>     </div>
     
     
     <div style={{height:'100px'}}>
     <div style={{float:'left',marginLeft:'36px',marginTop:'52px'}}>
       <input type='text' placeholder='Search Thesis' style={{height:'20px',width:'240px'}} onChange={(e)=>{SearchInputs.SearchThesis = e.target.value}}></input>
       <input type='text' placeholder='Search Author' style={{marginLeft:'12px',width:'180px',height:'20px'}} onChange={(e)=>{SearchInputs.SearchAuthor = e.target.value}}></input>
       <label style={{marginLeft:'24px'}}>Type:</label>
       <select style={{marginLeft:'12px'}} onChange={(e)=>{SearchInputs.SearchType = e.target.value}}>
         <option value='Any'>Any</option>
         <option value='Master'>Master</option>
         <option value='Doctorate'>Doctorate</option>
         <option value='Specialization in Medicine'>Specialization in Medicine</option>
         <option value='Proficiency in Art'> Proficiency in Art</option>
       </select>
       <button style={{marginLeft:'32px'}} onClick={()=>{Filter();}}>SEARCH</button>
       <span>
       <SchoolIcon style={{marginLeft:'42px'}}></SchoolIcon>
       <span className="addUniversity" onClick={()=>{getUniversities();setUPopupTrigger(true)}}>Add University</span>
       </span>
       <span>
       <AccountBalanceIcon style={{marginLeft:'42px'}}></AccountBalanceIcon>
       <span className="addInstitue" onClick={()=>{getInstitutes();setIPopupTrigger(true)}}>Add Institute</span>
       </span>
       
       <button style={{marginLeft:'52px',borderRadius:'4px'}} onClick={()=>{setaddClick(!addClick)}}>ADD THESIS {addClick?<KeyboardArrowUpIcon></KeyboardArrowUpIcon> :<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}</button>
       
       <PopupUniversity trigger={UPopupTrigger} setUTrigger={setUPopupTrigger}>
         <button style={{float:'left',marginTop:'-24px',marginBottom:'12px'}} onClick={()=>{getUniversities()}}>REFRESH</button>
         <div style={{float:'right'}}>Number of Thesis</div>
         <div style={{float:'left'}}>
           {Universities.map((val,index)=>{
             
             return <div style={{textAlign:'left',backgroundColor: (index%2==0)?'lightgray': 'white'}} key={val.UName}>{val.UName} <span style={{float:'right',marginLeft:'270px'}}>{val.Number_of_Thesis}</span></div>
             
           })}
         </div>
           <div style={{float:'bottom',width:'100%',height:'40px',backgroundColor:'lightgray',borderTop:'2px solid black',marginTop:'12px',justifyContent:'center',alignItems:'center',display:'flex'}}>
             <div>
               <input onChange={(e)=>{setInputUniversity(e.target.value)}} placeholder='Name of a University'></input> <button onClick={(e)=>{addUniversity();alert(inputUniversity+" is succesfully added.")}}>ADD</button>

             </div>
             
               <div><label style={{fontSize:'12px'}}>*Please check spelling errors before adding an university</label></div>
           
           
           </div>
       </PopupUniversity>


       <PopupInstitue trigger={IPopupTrigger} setITrigger={setIPopupTrigger}>
         <button style={{float:'left',marginTop:'-24px',marginBottom:'12px'}} onClick={()=>{getInstitutes()}}>REFRESH</button>
         <div style={{float:'right'}}>Number of Thesis</div>
         <div style={{float:'left'}}>
           {Institutes.map((val,index)=>{
             
             return <div style={{textAlign:'left',backgroundColor: (index%2==0)?'lightgray': 'white'}} key={val.IName}>{val.IName} <span style={{float:'right',marginLeft:'270px'}}>{val.Number_of_Universities}</span></div>
             
           })}
           <div style={{float:'bottom',width:'100%',height:'40px',backgroundColor:'lightgray',borderTop:'2px solid black',marginTop:'12px',justifyContent:'center',alignItems:'center',display:'flex'}}>
             <div>
               <input onChange={(e)=>{setInputInstitute(e.target.value)}} placeholder='Name of a Institute'></input> <button onClick={(e)=>{addInstitute();alert(inputInstitute+" is succesfully added.")}}>ADD</button>

             </div>
             
               <div><label style={{fontSize:'12px'}}>*Please check spelling errors before adding an Institute</label></div>
           
           
           </div>
           </div>


       </PopupInstitue>


       <Popup trigger={PopupTrigger} setTrigger={setPopupTrigger}>
       <div><p style={{color:'red'}}>{info[0]}</p> </div>
       <p style={{textDecoration:'underline'}}>Abstract</p>
       <div>{info[1]}</div>
       <div style={{width:'100%',height:'40%',borderTop: '2px solid black',marginTop:'12px'}}>
         <span style={{width:'60%',height:'100%',float:'left', fontSize:'14px',marginTop:'12px'}}>
           <div style={{float:'left'}}>
             <PersonIcon></PersonIcon>
             {info[2]}
           </div>
           <div style={{float:'right'}}>
             <CoPresentIcon></CoPresentIcon>
             Prof.Dr. John Doe
           </div>
           <div style={{float:'left',width:'100%'}}>
             <div style={{float:'left'}}>
               <SchoolIcon></SchoolIcon>
               {info[3]}
             </div>
             
           </div>
           <br></br>
           <div style={{float:'left',width:'100%'}}>
             <div style={{float:'left'}}>
             <AccountBalanceIcon></AccountBalanceIcon>
             {info[4]}
             </div>
           </div>
           <div style={{float:'left',width:'100%',marginTop:'18px'}}>
             <div style={{float:'left'}}>
             
             TOPIC: {info[5]}
             </div>
           </div>
           
           </span>
         <span style={{width:'40%',height:'100%',float:'right'}}>
           <div style={{float:'left',width:'100%'}}>
             <div style={{float:'right',fontSize:'14px'}}>
               
               {info[6]} Pages
           </div>
           </div>
             <div style={{float:'right',marginTop:'4px'}}>
             <div>{info[7]}</div>
           </div>
           
             <div style={{marginRight:'-46px',marginTop:'42px'}}>
               <div>Submission Date:{info[8]}</div>
             
           </div>
           <div style={{marginTop:'42px',float:'right'}}>
           <button onClick={()=>{alert('!Under construction')}}>EDIT</button>
           <button style={{marginLeft:'24px'}} onClick={()=>{deleteThesis()}}>DELETE</button>
         </div>
         </span>
         
          
         
       </div>
       
       
       </Popup>
     </div>
   
     </div>
     
   
   
       <AddThesis></AddThesis>
     

       <div style={{width:'100%', margin: 'auto',alignContent:'center'}}>
         <div style={{height:'22px',display:'grid',gridTemplateColumns: '6% 20% 6% 46% 8% 14%',fontWeight: '400', borderTop: '2px solid black',borderBottom: '2px solid black'}}>
           <div>Thesis NO</div>
           <div>Author</div>
           <div>Year</div>
           <div>Title</div>
           <div>Type</div>
           <div>Institute</div>
         </div>
         {thesisList.map((val)=>{
             return <Thesis key={val.Thesis_no} Id= {val.Thesis_no} Author={val.Author} Year={val.Year} Title= {val.Title} Type= {val.Type} Institute={val.Institute} Abstract={val.Abstract} University={val.University} Topic={val.Topic} Pages={val.Number_of_pages} Language={val.Language} SubDate={val.Submission_date}></Thesis>
         })}
         
       </div>
       </div>
     </div>
   </div>

  );

}

export default App;
