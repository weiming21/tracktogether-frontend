import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';

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
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
