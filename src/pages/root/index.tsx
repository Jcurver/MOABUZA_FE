import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import reportWebVitals from '../../reportWebVitals'
import GlobalStyle from '../../styles/GlobalStyle'

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
