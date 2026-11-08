import './layout.css';
import React, { useState, useEffect } from 'react';

const Layout = () => {
  
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [realResult, setRealResult] = useState(0);
  const [guessResult, setGuessResult] = useState('');
  const [Count, setCount] = useState(() => {
    // Retrieve Count from localStorage if available, or default to 1
    const storedCount = localStorage.getItem('Count');
    return storedCount ? parseInt(storedCount) : 1;
  });

  useEffect(() => {
    firstRandom();
  }, []);

  useEffect(() => {
    // Update localStorage whenever Count changes
    localStorage.setItem('Count', Count.toString());
  }, [Count]);

  const firstRandom = () => {
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 10);
    setNum1(n1);
    setNum2(n2);
    setRealResult(n1 + n2);
  };

  const addFunction = () => {
    const guessNumber = parseInt(guessResult);
    if (isNaN(guessNumber)) {
      alert('Please enter a valid number.');
      firstRandom();
      return;
    }
    if (realResult === guessNumber) {
      alert('Your answer is correct!');
      setCount(Count + 1);
    } else {
      alert('Your answer is wrong!');
      setCount(Count - 1);
    }

    // Clear input field and generate new numbers
    setGuessResult('');
  };

  return (
    <div>
      <form>
        <h2>Score : {Count}</h2>
        <h1 style={{ textAlign: 'center', fontSize: '90px' }}>
          {num1} + {num2}
        </h1>

        <input
          className='inputField'
          type='text'
          value={guessResult}
          onChange={(e) => setGuessResult(e.target.value)}
        />
        <button onClick={addFunction}>Check Answer</button>
      </form>
    </div>
  );
};

export default Layout;