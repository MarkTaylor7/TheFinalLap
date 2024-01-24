import React from 'react';

export const ChildComponent = ({ count, onIncrement }) => {
    return (
      <div>
        <p>Count in Child: {count}</p>
        <button onClick={onIncrement}>Increment in Parent</button>
      </div>
    );
  };
  
  export default ChildComponent;