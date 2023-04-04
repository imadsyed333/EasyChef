import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";


const RecipeDetailsPage = () => {

    const {token, refreshToken} = useContext(AccountContext)

    let {id} = useParams()
    const [recipe, setRecipe] = useState({
        diets: [],
        cooking_time: 0,
        cuisines: [],
        prep_time: 0,
        servings: 1,
        steps: [],
        comments: []
    })

    const [comment, setComment] = useState("")

    useEffect(() => {
        fetchRecipeDetails()
    }, [])

    const fetchRecipeDetails = () => {
        fetch("http://localhost:8000/recipes/" + id + "/view/").then(response => response.json()).then(json => {
            console.log(json)
            setRecipe(json)
        })
    }

    const sendComment = () => {
        console.log("token:", refreshToken)
        const data = {
            poster: 1,
            content: comment,
            recipe: parseInt(id)
        }
        console.log("I am being called")
        fetch("http://localhost:8000/recipes/comments/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + refreshToken
        },
        body: JSON.stringify(data)}).then(response => response.json()).then(data => {console.log("Success:", data)
        fetchRecipeDetails()}).catch(error => {
            console.error("Error:", error)
        })
    }

    return (
        // <>        
        <div>
            <h1>{recipe.name}</h1>
            {console.log('recipe media: ', recipe.media)}
            {recipe.media.map(img => (<embed src={img.media} width="130px"></embed>))}

            <h2>Diets</h2>
            <ul>

            {recipe.diets.map(diet => (
                <li key={diet.id}>{diet.name}</li>
                )
            )}
            </ul>
            <h2>Cuisines</h2>
            <ul>
                {recipe.cuisines.map(cuisine => (
                    <li key={cuisine.id}>{cuisine.name}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {recipe.steps.map(step => (
                    // <li key={step.id}>{step.content}</li>
                    <div key={step.id}>
                    {console.log("step " + step.id + " media: ", step.media)}
                    {step.media.map(img => (<embed src={img.media} width="130px"></embed>))}
                    <br></br>
                    {step.content}
                </div>

                ))}
            </ol>
            <h2>Comments Section</h2>
            {recipe.comments.map(comment => (
                <div key={comment.id}>
                    {console.log("comment " + comment.id + " media: ", comment.media)}
                    {comment.media.map(img => (<embed src={img.media} width="130px"></embed>))}
                    <br></br>
                    {comment.content}
                </div>
                // <li key={comment.id}>{comment.content}</li>
            ))}
            {/* {recipe.comments.map((f) => {(<img key={f.id} src={f.media}></img>); console.log(f.id, f.media)})}   */}
            {/* {<img></img>} */}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Button onClick={sendComment}>comment</Button>
        </div>
        // </>

    )
}
export default RecipeDetailsPage