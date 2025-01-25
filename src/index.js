import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter as Router,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import PageNotFound from './pages/PageNotFound';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Intro from './pages/Intro';
import EventRegistrationForm from './components/RegistrationForm/EventRegistrationForm';
import Login from './components/LoginPage_Preet/Login';
import SignUp from './components/LoginPage_Preet/SignUp';
import Profile from './components/Profile/Profile';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Logout from './components/LoginPage_Preet/Logout';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsCondition';

const router = new Router(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/register/:eventID" element={<EventRegistrationForm />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/logout" element={<Logout />} />
      {/* <Route path="/intro" element={<Intro />} /> */}
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/terms" element={<TermsAndConditions />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer /> {/* Move this outside of RouterProvider */}
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
