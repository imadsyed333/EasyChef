import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";

const HomePage = () => {
    return (
        <div>
            <MenuBar/>
            <h1>Welcome to EasyChef</h1>
            <RecipeList/>
        </div>
    )
}

export default HomePage