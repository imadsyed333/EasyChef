import MenuBar from "../components/MenuBar/MenuBar";
import AccountContext from "../contexts/AccountContext";
import {useContext, useEffect, useState} from "react";
import RecipeList from "../components/Recipe/RecipeList";
import {useNavigate} from "react-router-dom";

const MyRecipes = () => {
    const {token, setToken} = useContext(AccountContext)

    const navigate = useNavigate()

    const [myrecipes, setMyRecipes] = useState([])
    const [myinteractions, setMyInteractions] = useState([])
    const [myfavourites, setMyFavourites] = useState([])

    useEffect(() => {
        // i want to fetch all my recipes and display them as cards.
        // have 3 fetch calls for each endpoint, set each state and render separately
        if (token.length > 0) {
            Promise.all([
            
                fetch("http://localhost:8000/recipes/recipes/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyRecipes(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                }),

                fetch("http://localhost:8000/recipes/interactions/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyInteractions(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                }),

                fetch("http://localhost:8000/recipes/favourites/", 
                    {method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyFavourites(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                })
            ]).catch(errors => {
                console.log(errors)
                setToken("")
                navigate("/")
            })
        }

    }, [token])

    return (
        <div>
            <h1>Recipes I've Interacted With:</h1>
            <h2>My Recipes</h2>
            <RecipeList recipes={myrecipes} setRecipes={setMyRecipes} isOwner={true}/>
            <h2>My Interactions</h2>
            <RecipeList recipes={myinteractions}/>
            <h2>My Favourites</h2>
            <RecipeList recipes={myfavourites}/>
        </div>
    )
}
export default MyRecipes

