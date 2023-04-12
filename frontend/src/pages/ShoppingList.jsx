import MenuBar from "../components/MenuBar/MenuBar";

import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";
import ShoppingCard from "../components/ShoppingList/ShoppingCard";
import IngredientList from "../components/ShoppingList/IngredientList";
import {Button} from "@mui/material";

const ShoppingList = () => {

    const {token} = useContext(AccountContext)
    const [shoppingList, setShoppingList] = useState([])

    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        if (token) {
            fetch("http://localhost:8000/accounts/shopping_list/",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }

                }).then(response => {
                if (response.status === 200) {
                    response.json().then(json => {
                        setShoppingList(json)
                    })
                } else {
                    console.log(response.json())
                }
            }).catch(errors => console.log(errors))
        }
    }, [token])

    useEffect(() => {
        let temp = []
        for (let i = 0; i < shoppingList.length; i++) {
            let recipe = shoppingList[i]
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j]
                let item = {name: ingredient.name, amount: recipe.servings * ingredient.amount}
                temp.push(item)
            }
        }
        setIngredients(temp)
    }, [shoppingList])

    const deleteItem = (index, id) => {
        const temp = [...shoppingList]
        temp.splice(index, 1)
        setShoppingList(temp)

        const data = new FormData()
        data.append("recipe", id)
        fetch("http://localhost:8000/recipes/cart/remove/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: data
        }).then(response => response.json()).then(json => console.log(json))
    }


    return (
        <div>
            <h1>Ingredients</h1>
            {ingredients.map((ingredient, i) => (
                <div key={i}>
                    {ingredient.amount} of {ingredient.name}
                </div>
            ))}
            <h1>My Items</h1>
            {shoppingList.map((recipe, index) => (
                <div key={index}>

                    <ShoppingCard key={index} recipe={recipe} shoppingList={shoppingList}
                                  setShoppingList={setShoppingList} index={index}/>
                    <Button onClick={() => deleteItem(index, recipe.id)}>Delete Me</Button>
                </div>

            ))}
        </div>
    )
}

export default ShoppingList
