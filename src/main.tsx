import { createRoot } from 'react-dom/client'

import "./css/reset.css"
import "./css/common.css"

import App from './App'

createRoot(document.getElementById('root')!).render(
  <App />,
)
