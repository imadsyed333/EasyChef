import {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import CuisineDietForm from "../CuisineDietForm/CuisineDietForm";
import IngredientForm from "../IngredientForm/IngredientForm";
import AccountContext from "../../../contexts/AccountContext";
import StepForm from "../StepForm/StepForm";
import {useNavigate} from "react-router-dom";

const RecipeForm = ({edit, recipeId}) => {
    const {token} = useContext(AccountContext)

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [prepTime, setPrepTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const [servings, setServings] = useState(0)

    const [cuisines, setCuisines] = useState([])
    const [diets, setDiets] = useState([])
    const [ingredients, setIngredients] = useState([])

    const [steps, setSteps] = useState([])

    useEffect(() => {
        if (edit) {
            fetch("http://localhost:8000/recipes/" + recipeId + "/view/").then(response => response.json()).then(json => {
                setName(json.name)
                setPrepTime(json.prep_time)
                setCookingTime(json.cooking_time)
                setServings(json.servings)
                setDiets(json.diets)
                setCuisines(json.cuisines)
                setIngredients(json.ingredients)
                setSteps(json.steps)
            })
        }
    }, [])

    const handleAction = () => {
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
        console.log(recipe)
        fetch(edit ? "http://localhost:8000/recipes/" + recipeId + "/update/" : "http://localhost:8000/recipes/create/", {
            method: edit ? "PUT" : "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(recipe)
        }).then(response => response.json()).then(json => {
            console.log(json)
            // navigate("/recipe/" + json.id)
        })
    }

    return (
        <div style={{width: "50%"}}>
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
            <Button onClick={handleAction}>{edit ? "Save Changes" : "Add Recipe"}</Button>
        </div>
    )

}

export default RecipeForm