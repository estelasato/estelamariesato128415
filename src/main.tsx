import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {App} from './App'
import { markAppAsAlive } from './app/health/liveness'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App onAppMounted={markAppAsAlive}/>
  </StrictMode>,
)
