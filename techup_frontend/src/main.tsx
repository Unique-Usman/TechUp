import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "./ui/ErrorFallback";

import store from './store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ErrorBoundary */}
    {/*   FallbackComponent={ErrorFallback} */}
    {/*   onReset={() => window.location.replace("/")} */}
    {/* > */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
)
