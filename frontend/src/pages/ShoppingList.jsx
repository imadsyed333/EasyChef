import MenuBar from "../components/MenuBar/MenuBar";

import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";
import ShoppingCard from "../components/ShoppingList/ShoppingCard";
import IngredientList from "../components/ShoppingList/IngredientList";
import shoppingCard from "../components/ShoppingList/ShoppingCard";

const ShoppingList = () => {

    const {token} = useContext(AccountContext)
    // I need to get the name, media, servings
    const [rname, setRname] = useState([]);
    const [media, setMedia] = useState([]);
    const [servings, setServings] = useState([]);
    const [ids, setIds] = useState([])




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
                    let id = []
                    for (let i = 0; i < a.length; i++){
                        let recipe = a[i]
                        n.push(recipe.name)
                        m.push(recipe.media[0]['media'])
                        s.push(recipe.servings)
                        id.push(recipe.id)
                    }

                    setRname(n)
                    setMedia(m)
                    setServings(s)
                    setIds(id)
                })

        }
    }, [token])


    return (
        <div>
            <ShoppingCard id={ids[0]} name={rname[0]} media={media[0]} servings={servings[0]}/>
            <IngredientList/>

        </div>
    )
}

export default ShoppingList
