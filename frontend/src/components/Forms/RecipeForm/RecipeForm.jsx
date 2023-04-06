import {useState} from "react";
import Button from "react-bootstrap/Button";
import CuisineDietForm from "../CuisineDietForm/CuisineDietForm";

const RecipeForm = () => {
    const [name, setName] = useState("")
    const [prepTime, setPrepTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)
    const [servings, setServings] = useState(0)

    const [cuisines, setCuisines] = useState([])
    const [diets, setDiets] = useState([])
    const [ingredients, setIngredients] = useState([])

    return (
        <div>
            <label>Name:
                <input type={"text"} name={"name"} value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <label>Prep Time:
                <input type={"number"} min={"0"} name={"prep_time"} value={prepTime}
                       onChange={e => setPrepTime(e.target.value)}/>
            </label>
            <label>Cooking Time:
                <input type={"number"} min={"0"} name={"cooking_time"} value={cookingTime}
                       onChange={e => setCookingTime(e.target.value)}/>
            </label>
            <label>Servings:
                <input type={"number"} min={"1"} name={"servings"} value={servings}
                       onChange={e => setServings(e.target.value)}/>
            </label>

            <CuisineDietForm type={"cuisine"} items={cuisines} setItems={setCuisines}/>
            <CuisineDietForm type={"diets"} items={diets} setItems={setDiets}/>

            <Button>Add Recipe</Button>
        </div>
    )

}

export default RecipeForm