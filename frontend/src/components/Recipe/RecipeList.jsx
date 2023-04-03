import {Button} from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import {useEffect, useState} from "react";

const RecipeList = (props) => {

    return (
        <div>
            <h2> Here are your recipes! </h2>
            {props.recipes.map(recipe => (
                <RecipeCard key={recipe.id} name={recipe.name} cooking_time={recipe.cooking_time} id={recipe.id}/>
            ))}
        </div>
    )
}
export default RecipeList