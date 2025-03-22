import React, { useState } from 'react'


const usePreviewImg = () => {
    const [imgUrl,setImgUrl] = useState(null);
   
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file && file.type.startsWith('image/')){
            const reader = new FileReader(); 
            reader.onload = (e) => {
                setImgUrl(reader.result);
            }
            reader.readAsDataURL(file);  // convert to base64 string
        } else{
            setImgUrl(null);
            
        }
    };
  
    

    return {handleImageChange , imgUrl , setImgUrl };
} ;

export default usePreviewImg;