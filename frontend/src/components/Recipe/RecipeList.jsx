import {Button} from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import {useState} from "react";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([])
    const getRecipes = () => {
        fetch("http://localhost:8000/recipes/all/").then(response => response.json()).then(json => {
            setRecipes(json.results)
        })
    }
    return (
        <div>
            <Button onClick={getRecipes}> Get Recipes </Button>
            <h2> Here are your recipes! </h2>
            {recipes.map(recipe => (
                <RecipeCard name={recipe.name} cooking_time={recipe.cooking_time} id={recipe.id}/>
            ))}
        </div>
    )
}
export default RecipeList