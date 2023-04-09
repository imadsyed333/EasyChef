import RecipeCard from "./RecipeCard";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";

const RecipeList = ({recipes, setRecipes, isOwner}) => {

    const token = localStorage.getItem("token")
    const delete_recipe = (id) => {
        fetch("http://localhost:8000/recipes/" + id + "/delete/", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(response => {
            if (response.status === 204) {
                const new_recipes = [...recipes]
                const prevIndex = recipes.findIndex(item => item.id === id)
                new_recipes.splice(prevIndex, 1)
                setRecipes(new_recipes)
            }
        })
    }
    return (
        <div>
            {/* <h2> Here are your recipes! </h2> */}
            {recipes.map((recipe, i) => (
                <div key={i}>
                    <RecipeCard name={recipe.name} cooking_time={recipe.cooking_time} id={recipe.id}/>
                    {isOwner ? (
                        <div>
                            <Button as={Link} to={"/recipe/edit/" + recipe.id}>Edit</Button>
                            <Button onClick={() => {
                                delete_recipe(recipe.id)
                            }
                            }>Delete</Button>
                        </div>
                    ) : <></>}
                </div>
            ))}
        </div>
    )
}
export default RecipeList