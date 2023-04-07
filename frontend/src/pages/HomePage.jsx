import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [topratedrecipes, setTopRatedRecipes] = useState([])
    const [mostfavouritedrecipes, setmostfavouritedrecipes] = useState([])

    useEffect(() => {
        Promise.all([fetch("http://localhost:8000/recipes/overallratings/all/").then(response => response.json()).then(json => {
            setTopRatedRecipes(json.results)
        }),
        fetch("http://localhost:8000/recipes/mostfavourited/all/").then(response => response.json()).then(json => {
            setmostfavouritedrecipes(json.results)
        })])
    }, [])

    return (
        <div>
            <h1>Welcome to EasyChef</h1>

            <h3>Popular Recipes:</h3>
            <div>
                <h4>Highest Overall Rating: </h4>
                <RecipeList recipes={topratedrecipes}/>
            </div>

            <div>
                <h4>Most Favourited: </h4>
                <RecipeList recipes={mostfavouritedrecipes}/>
            </div>

        </div>
    )
}

export default HomePage