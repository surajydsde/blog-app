import React, { useState } from 'react';

const TestC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      TestC
      <div>
        {counter}
      </div>
      <button onClick={()=> setCounter(counter+1)}> Click me </button>
    </div>
  )
}

export default TestC