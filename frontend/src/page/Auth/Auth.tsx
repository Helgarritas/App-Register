// import { useState } from "react"
import Form from "./Components/form/Form"
// import custom from "./custom";

function Auth() {
  // const { counter, decrement, reset, increment } = custom(0) 

  return (
    <>
      <div className="w-full min-h-[100dvh] grid items-center justify-center">
        {/* <div>
          <div>
            <p className="text-lg font-semibold">counter: {counter}</p>
          </div>
          <button onClick={decrement} className="mt-3 px-3 py-2 border border-white">-</button>
          <button onClick={reset} className="mt-3 px-3 py-2 border border-white">reset</button>
          <button onClick={increment} className="mt-3 px-3 py-2 border border-white">+</button>
        </div> */}
        <Form/>
      </div>  
    </>
  )
}

export default Auth
