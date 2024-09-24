import { useState } from "react";

function custom( { valueInnital = 10 }) {
    const [counter, setCounter] = useState( valueInnital );
    
    const decrement = () => {
        setCounter( counter => counter - 1)
    } 
    const reset = () => {
        setCounter( counter => counter * 0)
    }
    const increment = () => {
        setCounter( counter => counter + 1)
    }


    return{
        counter,
        decrement,
        reset,
        increment
    }
}

export default custom;