import React, { useEffect, useState } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProfileNavbar from './components/Navbar/ProfileNavbar';
import SignInForm from '../auth/components/SignInForm/SignInForm';
import SignUpForm from '../auth/components/SignUpForm/SignUpForm';
import './styles/fonts.css';
import './styles/css-reset.css';
import './App.css';
import ApiProvider from '../../context/ApiContext';
import AddTemplate from '../template/components/AddTemplate';
import EditTemplate from '../template/components/EditTemplate';
import TemplateList from '../template/components/TemplateList';
import EditDefaultConfig from '../config/components/EditDefaultConfig';
import API from './Api';
import DefaultTemplateConfigs from '../template/components/DefaultTemplateConfigs';

const handleGetUserRoles = async (
  token: string,
  navigate: (a: string) => void,
) => {
  const response = await API.makeRequest({
    endpoint: 'user',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  const { roles } = response.data;

  if (roles.includes('admin')) {
    navigate('admin');
  } else {
    navigate('signin');
  }
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleGetUserRoles(token, navigate);
    } else {
      localStorage.setItem('userRole', 'guest');
    }
  }, []);

  return (
    <ApiProvider>
      <div className="app">
        <Routes>
          <Route
            path="/default-template-configs"
            element={(
              <div>
                <ProfileNavbar />
                <DefaultTemplateConfigs />
              </div>
                        )}
          />
          <Route
            path="/edit-default-configuration"
            element={(
              <div>
                <ProfileNavbar />
                <EditDefaultConfig />
              </div>
                        )}
          />
          <Route
            path="/templates"
            element={(
              <div>
                <ProfileNavbar />
                <TemplateList />
              </div>
                        )}
          />
          <Route
            path="/add-template"
            element={(
              <div>
                <Navbar navType="signin" />
                {/* TODO: Props? */}
                <AddTemplate />
              </div>
                        )}
          />
          <Route
            path="/edit-template"
            element={(
              <div>
                <Navbar navType="signin" />
                {/* TODO: Props? */}
                <EditTemplate />
              </div>
                        )}
          />
          <Route
            path="/signup"
            element={(
              <div>
                <Navbar navType="signup" />
                <SignUpForm />
              </div>
                        )}
          />
          <Route
            path="/signin"
            element={(
              <div>
                <Navbar navType="signin" />
                <SignInForm />
              </div>
                        )}
          />
          <Route
            path="/"
            element={(
              <div>
                <Navbar navType="signin" />
                <SignInForm />
              </div>
                        )}
          />

        </Routes>
      </div>
    </ApiProvider>
  );
}

export default App;
