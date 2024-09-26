import { useState } from 'react';
import { decentralized_backend } from 'declarations/decentralized_backend';
// import { decentralized_backend } from '../../declarations/decentralized_backend/index';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    decentralized_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  // const dd = decentralized_backend

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
        <div className='bg-red-400 py-5'>some test data here </div>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
