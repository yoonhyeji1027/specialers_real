import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage  from "./pages/MainPage.js";
import S_info from "./pages/S_info.js";
import Salmon from "./pages/Salmon.js";
import P_info from "./pages/P_info.js";
import Inquiry from "./pages/Inquiry.js";
import Maps from "./pages/Maps.js";


function Routing() {
  return (
    <div className='App'>
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='Salmon.js' element={<Salmon />} />
            <Route path='/P_info.js' element={<P_info />} />
            <Route path='/MainPage.js' element={<MainPage />} />
            <Route path='/S_info.js' element={<S_info />} />
            <Route path='/Inquiry.js' element={<Inquiry />} />
            <Route path='/Maps.js' element={<Maps />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
