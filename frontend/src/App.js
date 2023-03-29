import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="/account/" element={<AccountPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App/>)

export default App;
