import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/**
 * <StarRating className='test' defaultRating={1} maxRating={6} messages={['1 one star rating', '2 two star rating', 'three 3 star rating', '4 four star rating', '5 star rating', '']} />
 */
