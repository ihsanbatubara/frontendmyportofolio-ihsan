import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import axios from 'axios';

import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import store from "./store";
import { stables } from "./constants";

axios.defaults.baseURL = stables.API_BASE_URL;

const queryClient = new QueryClient ({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter> 
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </Provider>
  </BrowserRouter>
)