import MenuBar from "../components/MenuBar/MenuBar";
import AccountContext from "../contexts/AccountContext";
import {useContext, useEffect, useState} from "react";
import RecipeList from "../components/Recipe/RecipeList";

const MyRecipes = () => {

    let {token, refreshToken} = useContext(AccountContext)
    // console.log("token:", localStorage.getItem("token"))

    const [myrecipes, setMyRecipes] = useState([])
    const [myinteractions, setMyInteractions] = useState([])
    const [myfavourites, setMyFavourites] = useState([])

    useEffect(() => {
        // i want to fetch all my recipes and display them as cards.
        // have 3 fetch calls for each endpoint, set each state and render separately 
        if (token) {
            Promise.all([
            
                fetch("http://localhost:8000/recipes/recipes/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(recipes => recipes.json())
                .then(r => {
                    console.log("recipes: ", r)
                    setMyRecipes(r)
                }),

                fetch("http://localhost:8000/recipes/interactions/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(interactions => interactions.json())
                .then(i => {
                    console.log("interactions: ", i)
                    setMyInteractions(i)
                }),

                fetch("http://localhost:8000/recipes/favourites/", 
                    {method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                }})
                .then(favourites => favourites.json())
                .then(f => {
                    console.log("favourites: ", f)
                    setMyFavourites(f)
                })
            ])
        }

    }, [])

    return (
        <div>
            <h1>Recipes I've Interacted With:</h1>
            <h2>My Favourite Recipes:</h2>
            <RecipeList recipes={myfavourites}/>
            <h2>My Recipes:</h2>
            <RecipeList recipes={myrecipes}/>
            <h2>My Interactions:</h2>
            <RecipeList recipes={myinteractions}/>
        </div>
    )
}
export default MyRecipes

