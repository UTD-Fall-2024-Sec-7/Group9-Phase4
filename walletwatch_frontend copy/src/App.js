import React,  { useState } from 'react';
import './App.css';
import Header from './HomeHeader';
import Footer from './HomeFooter';

function App() {
  return (
    <div>
     <Header/>
     <h2 style={{ textAlign: 'center' }}> Welcome to WalletWatch!</h2>
     <body style={{ textAlign: 'center' }}>
      Your personal budget management app <br></br><br></br>
      Get started today! <br></br><br></br>
      <button>Create an Account</button>
      
     </body>
    <Footer/>
  </div>
 
  //  <div className="App">
   //   <header className="App-header">

     //  {/*<img src={logo} className="App-logo" alt="logo" />*/}

     //   <p>
     //     Welcome to WalletWatch!
     //   </p>
        /*  <a
          className="App-link"
         href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/
     // </header>
  //  </div>
  );
}

export default App;
