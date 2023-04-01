import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch("http://localhost:8000/recipes/all/").then(response => response.json()).then(json => {
            setRecipes(json.results)
        })
    }, [])

    return (
        <div>
            <h1>Welcome to EasyChef</h1>
            <RecipeList recipes={recipes}/>
        </div>
    )
}

export default HomePage