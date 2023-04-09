import {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import CuisineDietForm from "../CuisineDietForm/CuisineDietForm";
import IngredientForm from "../IngredientForm/IngredientForm";
import AccountContext from "../../../contexts/AccountContext";
import StepForm from "../StepForm/StepForm";

const RecipeForm = () => {
    const {token} = useContext(AccountContext)

    const [name, setName] = useState("")
    const [prepTime, setPrepTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const [servings, setServings] = useState(0)

    const [cuisines, setCuisines] = useState([])
    const [diets, setDiets] = useState([])
    const [ingredients, setIngredients] = useState([])

    const [steps, setSteps] = useState([])

    const handleAdd = () => {
        const recipe = {
            name: name,
            prep_time: prepTime,
            diets: diets,
            cuisines: cuisines,
            ingredients: ingredients,
            cooking_time: cookingTime,
            servings: servings,
            steps: steps
        }
        fetch("http://localhost:8000/recipes/create/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(recipe)
        }).then(response => response.json()).then(json => console.log(json))
    }

    return (
        <div>
            <label>Name:
                <input type={"text"} name={"name"} value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <br/>
            <label>Prep Time:
                <input type={"number"} min={"0"} name={"prep_time"} value={prepTime}
                       onChange={e => setPrepTime(e.target.value)}/>
            </label>
            <br/>
            <label>Cooking Time:
                <input type={"number"} min={"0"} name={"cooking_time"} value={cookingTime}
                       onChange={e => setCookingTime(e.target.value)}/>
            </label>
            <br/>
            <label>Servings:
                <input type={"number"} min={"1"} name={"servings"} value={servings}
                       onChange={e => setServings(e.target.value)}/>
            </label>
            <br/>

            <CuisineDietForm type={"cuisine"} items={cuisines} setItems={setCuisines}/>
            <br/>
            <CuisineDietForm type={"diets"} items={diets} setItems={setDiets}/>
            <br/>
            <IngredientForm ingredients={ingredients} setIngredients={setIngredients}/>
            <br/>
            <StepForm steps={steps} setSteps={setSteps}/>
            <br/>
            <Button onClick={handleAdd}>Add Recipe</Button>
        </div>
    )

}

export default RecipeForm