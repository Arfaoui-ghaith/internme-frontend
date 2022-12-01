import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Intern from './pages/Intern';
import Forget from './pages/Forget';
import Verify from './pages/Verify';
import Reset from './pages/Reset';
import Profile from './pages/Profile';
import DynamicRoutes from './utils/DynamicRoutes';
import { AuthProvider } from './context/auth';
import { InternProvider } from './context/intern';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
        <AuthProvider>
            <InternProvider>
                      <Router>
                              <Routes>
                                  <Route exact path='/' element={<Home/>}/>
                                  <Route exact path='/register' element={<Register/>}/>
                                  <Route exact path='/login' element={<Login/>}/>
                                  <Route exact path='/forget' element={<Forget/>}/>

                                  <Route exact path='/profile' element={<DynamicRoutes authenticated/>}>
                                      <Route exact path='/profile' element={<Profile/>}/>
                                  </Route>
                                  <Route exact path='/intern' element={<DynamicRoutes authenticated/>}>
                                      <Route exact path='/intern' element={<Intern/>}/>
                                  </Route>
                                  <Route exact path='/verify' element={<DynamicRoutes verification/>}>
                                      <Route exact path='/verify'  element={<Verify verification/>}/>
                                  </Route>
                                  <Route exact path='/reset' element={<DynamicRoutes reset/>}>
                                      <Route exact path='/reset'  element={<Reset reset/>}/>
                                  </Route>
                              </Routes>
                      </Router>
            </InternProvider>
        </AuthProvider>
  );
}

export default App;
