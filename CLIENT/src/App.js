import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './PAGES/Home';
import { CreatePost } from './PAGES/CreatePost';
import { Posts } from './PAGES/Posts';
import { Login } from './PAGES/Login';
import { Registration } from './PAGES/Registration';
import { Profile } from './PAGES/Profile';
import { AuthContext } from './Helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PageNotFound } from './PAGES/PageNotFound';
import { ChangePswd } from './PAGES/ChangePswd';


function App() {

  const [authState, setAuthState] = useState({
    username: '',
    id: 0,
    status: false
  })

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.get('http://localhost:3003/auth/auth', {
        headers: { accessToken: accessToken }
      }).then((resp) => {
        if (resp.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: resp.data.username,
            id: resp.data.id,
            status: true
          });
        }
      });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken")
    setAuthState({
      username: '',
      id: 0,
      status: false
    });
  };

  return (
    <div className="App">
      {/* To change state from any of the component */}
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>

          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/register"> Register</Link>
                </>
              ) : (
                <>
                  <Link to="/"> Home</Link>
                  <Link to="/createpost"> Create Post</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h2 className='user'>
                {/* {authState.username} */}
                <Link to={`/profile/${authState.id}`} className="link-no-underline">{authState.username}</Link>
              </h2>
              {authState.status && <Link to={'/login'} className='logout' onClick={logout}> Logout </Link>}
            </div>
          </div>

          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/createpost' exact element={<CreatePost />} />
            <Route path='/post/:id' exact element={<Posts />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Registration />} />
            <Route path='/profile/:id' exact element={<Profile />} />
            <Route path='/changePswd' exact element={<ChangePswd />} />
            <Route path='*' exact element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
