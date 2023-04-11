import MenuBar from "../components/MenuBar/MenuBar";
import RecipeCard from "../components/Recipe/RecipeCard";

import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";

const ShoppingList = () => {

    const {token} = useContext(AccountContext)
    // I need to get the name, media, servings
    const [rname, setRname] = useState([]);
    const [media, setMedia] = useState([]);
    const [servings, setServings] = useState([]);





    useEffect(() => {
        if (token) {
            fetch("http://localhost:8000/accounts/shopping_list/",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }

                })
                .then(data => data.json())
                .then(a => {
                    let n = []
                    let m = []
                    let s = []
                    for (let i = 0; i < a.length; i++){
                        let recipe = a[i]
                        n.push(recipe.name)
                        m.push(recipe.media[0]['media'])
                        s.push(recipe.servings)
                    }

                    setRname(n)
                    setMedia(m)

                    setServings(s)
                })

        }
    }, [token])


    return (
        <div>

        </div>
    )
}

export default ShoppingList
