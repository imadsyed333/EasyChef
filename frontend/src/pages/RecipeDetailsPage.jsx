import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";
import ReactStars from "react-rating-stars-component";


const RecipeDetailsPage = () => {

    const {token, refreshToken} = useContext(AccountContext)

    let {id} = useParams()
    const [recipe, setRecipe] = useState({
        // overall_rating: undefined,
        diets: [],
        cooking_time: 0,
        cuisines: [],
        prep_time: 0,
        servings: 1,
        steps: [],
        comments: []
    })

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(undefined)
    const [overallrating, setOverallRating] = useState(undefined)
    const [favourited, setFavourited] = useState(false)

    useEffect(() => {
        fetchRecipeDetails()
        fetchRating()
        fetchOverallRating()
        isFavourited()
        // if(favourited){

        // }
        updateFavourite()
        console.log("recipe name: ", recipe.name)
        console.log("CURRENT RATING: ", newRating.value)
        console.log('recipe media: ', recipe.media)

    }, [])

    const fetchRecipeDetails = () => {
        fetch("http://localhost:8000/recipes/" + id + "/view/").then(response => response.json()).then(json => {
            console.log(json)
            setRecipe(json)
        })
    }

    const sendComment = () => {
        console.log("token:", token)
        const data = {
            poster: 1,
            content: comment,
            recipe: parseInt(id)
        }
        console.log("I am being called")
        fetch("http://localhost:8000/recipes/comments/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(data)}).then(response => response.json()).then(data => {console.log("Success:", data)
        fetchRecipeDetails()}).catch(error => {
            console.error("Error:", error)
        })
    }

    const fetchRating = () => {
        fetch("http://localhost:8000/recipes/ratings/" + id + "/view/").then(response => response.json()).then(json => {
            console.log("RECIPE DATA TO GET RATING", json.value)
            setRating(json.value)
            // sendRating(json.value)
        })

    }

    const fetchOverallRating = () => {
        fetch("http://localhost:8000/recipes/overallratings/" + id + "/view/").then(response => response.json()).then(json => {
            console.log("OVERALL RATING", json.overall_rating)
            setOverallRating(json.overall_rating)
        })

    }

    // using package: react-rating-stars-component
    // https://www.npmjs.com/package/react-rating-stars-component
    // https://codesandbox.io/s/elegant-mountain-w3ngk?file=/src/App.js
    const newRating = {
        size: 40,
        count: 5,
        isHalf: false,
        value: rating,
        color: "grey",
        activeColor: "gold",
        onChange: newValue => {
            console.log(`New Rating: new value is ${newValue}`);
            // SEND RATING TO SERVER
            setRating(newValue)
            sendRating(newValue)
        }
      };

    const sendRating = (newVal) => {
        console.log(`Sending new rating to server: ${newVal}`);
        const data = {
            poster: 1,
            value: newVal,
            recipe: parseInt(id)
        }
        fetch("http://localhost:8000/recipes/ratings/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {console.log("yeye:", data)
        fetchRecipeDetails(); fetchOverallRating()}).catch(error => {
            console.error("Error:", error)
        })
    }

    // favouriting
    const isFavourited = () => {
        fetch("http://localhost:8000/recipes/favourites/" + id + "/view/").then(response => response.json()).then(json => {
            console.log("FAVOURITED? ", json.favourite)
            setFavourited(json.favourite)
            // sendRating(json.value)
        })

    }

    const updateFavourite = () => {
        console.log(`Sending new rating to server: ${favourited}`);
        const data = {
            poster: 1,
            favourite: favourited,
            recipe: parseInt(id)
        }
        fetch("http://localhost:8000/recipes/favourites/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {console.log("fav:", data)
        fetchRecipeDetails(); }).catch(error => {
            console.error("Error:", error)
        })
    }

    const switchFavourited = () => {
        setFavourited(!favourited)
    }

    // liking



    return (
        // <>        
        <div>
            {/* {console.log("recipe name: ", recipe.name)} */}
            <h1>{recipe.name}</h1>
            {/* {console.log('recipe media: ', recipe.media)} */}
            {recipe.media?.map(img => (<embed src={img.media} width="130px"></embed>))}

            <ReactStars {...newRating} />
            {/* {console.log("CURRENT RATING: ", newRating.value)} */}

            {/* <div>{recipe.overall_rating}</div> */}
            <div>Current Rating: {rating}</div>
            {/* {fetchRating()} */}

            <div>Overall Rating: {overallrating}</div>
            {/* {fetchOverallRating()} */}

            {favourited? (
            <div>MY FAVOURITE</div>
            ): (
                <div>NOT MY FAVOURITE</div>
            )}

            <button onClick={switchFavourited}>Favourite/Unfavourite</button>

            <h2>Diets</h2>
            <ul>

            {recipe.diets?.map(diet => (
                <li key={diet.id}>{diet.name}</li>
                )
            )}
            </ul>
            <h2>Cuisines</h2>
            <ul>
                {recipe.cuisines?.map(cuisine => (
                    <li key={cuisine.id}>{cuisine.name}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {recipe.steps?.map(step => (
                    // <li key={step.id}>{step.content}</li>
                    <div key={step.id}>
                    {/* {console.log("step " + step.id + " media: ", step.media)} */}
                    {step.media?.map(img => (<embed src={img.media} width="130px"></embed>))}
                    <br></br>
                    <li>{step.content}</li>
                </div>

                ))}
            </ol>
            <h2>Comments Section</h2>
            {recipe.comments?.map(comment => (
                <div key={comment.id}>
                    {/* {console.log("comment " + comment.id + " media: ", comment.media)} */}
                    {comment.media?.map(img => (<embed src={img.media} width="130px"></embed>))}
                    <br></br>
                    <li>{comment.content}</li>
                </div>
                // <li key={comment.id}>{comment.content}</li>
            ))}
            {/* {recipe.comments?.map((f) => {(<img key={f.id} src={f.media}></img>); console.log(f.id, f.media)})}   */}
            {/* {<img></img>} */}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)}/>
            <Button onClick={sendComment}>comment</Button>
        </div>
        // </>

    )
}
export default RecipeDetailsPage