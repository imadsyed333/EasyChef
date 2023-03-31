import './App.css';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import ShoppingList from "./pages/ShoppingList";
import LoginPage from "./pages/LoginPage";
import MyRecipes from "./pages/MyRecipes";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import MenuBar from "./components/MenuBar/MenuBar";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MenuBar/>}>
                <Route path={"recipe/"}>
                    <Route path={":id"} element={<RecipeDetailsPage/>}/>
                </Route>
                <Route path="myrecipes" element={<MyRecipes/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="cart" element={<ShoppingList/>}/>
                <Route path="account" element={<AccountPage/>}/>
                <Route index element={<HomePage/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App/>)

export default App;
