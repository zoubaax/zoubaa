import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// 🕵️‍♂️ Developer Easter Egg
if (typeof window !== 'undefined') {
  // Fetch the gif asynchronously so it doesn't block the initial JS bundle!
  fetch('/surprise.gif')
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log(
          "%c ",
          `font-size: 1px; padding: 180px; background-image: url('${base64data}'); background-size: contain; background-repeat: no-repeat;`
        );
        console.log(
          "%cWhat are you doing in the console? Get out! 🚪💨",
          "font-size: 18px; font-weight: bold; color: #00d2ff; font-family: sans-serif;"
        );
      };
      reader.readAsDataURL(blob);
    })
    .catch(err => {
      // Ignore errors silently so things don't break
    });
}
