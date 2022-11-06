import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Intern from './pages/Intern';
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
                                  <Route exact path='/intern' element={<DynamicRoutes/>}>
                                      <Route exact path='/intern' element={<Intern/>}/>
                                  </Route>
                              </Routes>
                      </Router>
            </InternProvider>
        </AuthProvider>
  );
}

export default App;
