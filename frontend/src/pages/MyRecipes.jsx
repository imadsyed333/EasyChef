import MenuBar from "../components/MenuBar/MenuBar";
import AccountContext from "../contexts/AccountContext";
import {useContext, useEffect, useState} from "react";
import RecipeList from "../components/Recipe/RecipeList";

const MyRecipes = () => {

    let {token, refreshToken} = useContext(AccountContext)
    
    const [myrecipes, setMyRecipes] = useState([])
    const [myinteractions, setMyInteractions] = useState([])
    const [myfavourites, setMyFavourites] = useState([])

    useEffect(() => {
        // i want to fetch all my recipes and display them as cards.
        // have 3 fetch calls for each endpoint, set each state and render separately 
        Promise.all([
            
            fetch("http://localhost:8000/recipes/recipes/", 
            {method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }})
            .then(recipes => recipes.json())
            .then(r => {
                console.log(r)
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
                console.log(i)
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
                console.log(f)
                setMyFavourites(f)
            })
        ])

    }, [])

    return (
        <div>
            <h1>Recipes I've Interacted With:</h1>
            <RecipeList recipes={myrecipes}/>
            <RecipeList recipes={myinteractions}/>
            <RecipeList recipes={myfavourites}/>
        </div>
    )
}
export default MyRecipes

