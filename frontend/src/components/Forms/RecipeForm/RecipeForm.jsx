import {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import CuisineDietForm from "../CuisineDietForm/CuisineDietForm";
import IngredientForm from "../IngredientForm/IngredientForm";
import AccountContext from "../../../contexts/AccountContext";
import StepForm from "../StepForm/StepForm";
import {useNavigate} from "react-router-dom";
import MediaForm from "../MediaForm/MediaForm";
import Form from "react-bootstrap/Form";

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

    const [recipeMedia, setRecipeMedia] = useState([])

    const [stepMedia, setStepMedia] = useState()

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
                console.log("steps, coming in", json.steps)
            })
        }
    }, [])

    const handleAction = () => {
        let bare_steps = []
        for (let i = 0; i < steps.length; i++) {
            let step = steps[i]
            bare_steps.push({
                content: step.content,
                prep_time: step.prep_time,
                cooking_time: step.cooking_time
            })
        }
        console.log("steps", steps)
        const recipe = {
            name: name,
            prep_time: prepTime,
            diets: diets,
            cuisines: cuisines,
            ingredients: ingredients,
            cooking_time: cookingTime,
            servings: servings,
            steps: bare_steps
        }
        console.log(recipe)
        fetch(edit ? "http://localhost:8000/recipes/" + recipeId + "/update/" : "http://localhost:8000/recipes/create/", {
            method: edit ? "PUT" : "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(recipe)
        }).then(response => {
            console.log("status", response.status)
            if (response.status === 201 || response.status === 200) {
                response.json().then(json => {
                    sendRecipeMedia(json.id)
                    sendStepMedia(json.steps)
                    navigate("/recipe/" + json.id)
                })
            } else {
                console.log(response.json())
            }
        }).catch(errors => console.log(errors))
    }
    const sendStepMedia = (virtualSteps) => {
        console.log("steps in media", steps)
        console.log("virutalSteps", virtualSteps)
        steps.map((step, index) => {
            let media_array = []
            if (step.media) {
                media_array = [...step.media]
            }
            const virtualStep = virtualSteps[index]
            media_array?.map((file) => {
                const data = new FormData()
                data.append("media", file)
                data.append("step", virtualStep.id)
                fetch("http://localhost:8000/recipes/steps/media/add/", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    body: data
                }).then(response => {
                    if (response.status === 201) {
                        console.log("Success, imadge created")
                    } else {
                        console.log(response.json())
                    }
                }).catch(errors => console.log(errors))
            })
        })
    }

    const sendRecipeMedia = (id) => {
        const media_array = [...recipeMedia]
        media_array?.map((file) => {
            const data = new FormData()
            data.append("media", file)
            data.append("recipe", id)
            fetch("http://localhost:8000/recipes/media/add/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: data
            }).then(response => {
                if (response.status === 201) {
                    console.log("Success")
                } else {
                    console.log(response.json())
                }
            }).catch(errors => console.log(errors))
        })
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Form>
                <h1>{edit ? "Edit Recipe" : "Add Recipe"}</h1>
                <Form.Group>
                    <Form.Label>
                        Name:
                    </Form.Label>
                    <Form.Control type={"text"} name={"name"} value={name} onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Label>
                    Prep Time:
                </Form.Label>
                <Form.Control type={"number"} min={"0"} name={"prep_time"} value={prepTime}
                              onChange={e => setPrepTime(e.target.value)}/>
                <Form.Label>
                    Cooking Time:
                </Form.Label>
                <Form.Control type={"number"} min={"0"} name={"cooking_time"} value={cookingTime}
                              onChange={e => setCookingTime(e.target.value)}/>
                <Form.Label>
                    Servings:
                </Form.Label>
                <Form.Control type={"number"} min={"1"} name={"servings"} value={servings}
                              onChange={e => setServings(e.target.value)}/>

                <MediaForm media={recipeMedia} setMedia={setRecipeMedia}/>

                <CuisineDietForm type={"cuisine"} items={cuisines} setItems={setCuisines}/>
                <br/>
                <CuisineDietForm type={"diets"} items={diets} setItems={setDiets}/>
                <br/>
                <IngredientForm ingredients={ingredients} setIngredients={setIngredients}/>
                <br/>
                <StepForm steps={steps} setSteps={setSteps}/>
                <br/>
                <Button onClick={handleAction}>{edit ? "Save Changes" : "Add Recipe"}</Button>
            </Form>
        </div>
    )

}

export default RecipeForm