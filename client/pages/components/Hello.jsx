import React , {useEffect,useState} from 'react'

export default function Hello() {
  
  const [message,setMessage] = useState("Loading...");
  // const [people,setPeople] = useState([]);

  useEffect(()=>{
    fetch("http://127.0.0.1:8080/api/home")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.messsage)
        setMessage(data.message);
        
        // console.log(data.people)
      })
  },[])
  return (
    

    <div style={{fontSize:"40px",fontWeight:"bold",backgroundColor:"aqua"}}>
      {message}
    
    
        
      
    </div>
  )
}

