/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* for Redux */}
    <Provider store={store}>
      {/* for Router */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
