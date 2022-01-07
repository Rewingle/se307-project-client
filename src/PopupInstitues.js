import React from 'react'

export function PopupInstitue(props) {
    return (props.trigger) ? (
        <div className='Upopup' style={{position:' fixed',top: '0',left:'0',width: '100%',height:'100vh',backgroundColor:'rgba(0,0,0,0.2)',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className='Upopup-inner' style={{position:'relative',padding:'32px',width:'100%',maxWidth: '540px',backgroundColor: '#FFF'}}>
                <button className='Uclose-btn' style={{position:'absolute',top:'6px',right:'6px'}} onClick={()=>{props.setITrigger(false)}}>CLOSE</button>
                  
                    {props.children}                        
                   
                
            </div>
        </div>
    ) : "";
}

export default PopupInstitue
