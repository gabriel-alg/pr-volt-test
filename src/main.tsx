import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

import store from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
