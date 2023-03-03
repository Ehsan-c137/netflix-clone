import { useState } from "react"

const MovieImage = (props)=>{
    const [isLoad, setIsLoad] = useState(false);

    return (
        
        
        isLoad && <img src={props.src} alt={props.alt} className="w-full h-auto"  />
        
    )
}

export default MovieImage