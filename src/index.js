import React, { useState, useEffect } from 'react';
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
import Loader from './components/Loader/Loader';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Logout from './components/LoginPage_Preet/Logout';
import ContactUs from './pages/ContactUs';
import TermsAndConditions from './pages/TermsCondition';

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloadComplete = () => {
    setTimeout(() => {
      setLoading(false); // Hide loader after images are preloaded
    }, 1000); // Optional delay for UX
  };

  if (loading) {
    return <Loader onPreloadComplete={handlePreloadComplete} />;
  }

  return <RouterProvider router={router} />;
};

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
      <Route path="/profile" element={<Profile />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/terms" element={<TermsAndConditions />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <AppWrapper />
  </>
);

reportWebVitals();
