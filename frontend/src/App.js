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
import AccountContext, {useAccountContext} from "./contexts/AccountContext";
import RegisterPage from "./pages/RegisterPage";
import RecipeForm from "./components/Forms/RecipeForm/RecipeForm";
import AddRecipePage from "./pages/AddRecipePage";

function App() {
    return (
        <BrowserRouter>
            <AccountContext.Provider value={useAccountContext()}>
                <Routes>
                    <Route path="/" element={<MenuBar/>}>
                        <Route path={"recipe/"}>
                            <Route path={":id"} element={<RecipeDetailsPage/>}/>
                            <Route path={"add"} element={<AddRecipePage/>}/>
                        </Route>
                        <Route path="myrecipes" element={<MyRecipes/>}/>
                        <Route path={"signup"} element={<RegisterPage/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="cart" element={<ShoppingList/>}/>
                        <Route path="account" element={<AccountPage/>}/>
                        <Route index element={<HomePage/>}/>
                    </Route>
                </Routes>
            </AccountContext.Provider>
        </BrowserRouter>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'))
//
// root.render(<App/>)

export default App;
