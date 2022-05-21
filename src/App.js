import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import AuthContext from './store/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navigator />
//         <SideNavigator />

//         <Routes>
//           <Route path="/personal" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {authCtx.isLoggedIn && <Route path="/Home" element={<Home />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
