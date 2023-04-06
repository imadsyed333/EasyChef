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
        comments: [],
        total_likes: 0
    })

    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(undefined)
    const [overallrating, setOverallRating] = useState(undefined)
    const [favourited, setFavourited] = useState(false)
    const [liked, setLiked] = useState(false)
    const [totallikes, setTotalLikes] = useState(0)
    
    useEffect(() => {
        fetchRecipeDetails()
        fetchRating()
        fetchTotalLikes()
        fetchOverallRating()
        isFavourited()
        fetchRecipes()
        isLiked()
        // if(favourited){

        // }
        console.log("favourited: ", favourited)
        // updateFavourite()
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

    const fetchRecipes = () => {
        fetch("http://localhost:8000/recipes/all/").then(response => response.json()).then(json => {
            console.log("ALLLLL", json.results.find(item => item.id === parseInt(id)))
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


    const fetchTotalLikes = () => {
        fetch("http://localhost:8000/recipes/totallikes/")
        .then(response => response.json())
        // .then(json => console.log('jkdfhkjfahf ', json))
        .then(json => json.find(item => item.id === parseInt(id)))
        .then(curr_recipe => {
            console.log("FETCH THIS RECIPE'S LIKES", curr_recipe)
            console.log("TOTAL LIKES", curr_recipe.total_likes)
            setTotalLikes(curr_recipe.total_likes)
        })
    }

    

    // fetch all rating objects of this user
    // if the user has a rating object for this current recipe, 
    //     display it by doing setRating(curr_recipe.value) 
    // if user does not have rating object for this current recipe,
    //     
    const fetchRating = () => {
        fetch("http://localhost:8000/recipes/ratings/", {method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }})
        .then(response => response.json())
        .then(json => json.find(item => item.recipe === parseInt(id)))
        .then(curr_recipe => {
            console.log("THIS USER'S INFO FOR THIS RECIPE: ", curr_recipe)
            if(curr_recipe){
                console.log("USER'S RATING FOR THIS RECIPE: ", curr_recipe.value)
                setRating(curr_recipe.value)
            }
            else{
                console.log("USER'S DOESN'T HAVE RATING FOR THIS RECIPE")
                // console.log("SET NEW RECIPE RATING FOR THIS USER")
                // setRating()
            }
            // console.log("RECIPE DATA TO GET RATING", json.value)
            // setRating(json.value)
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

    const isLiked = () => {

        const url = "http://localhost:8000/recipes/likes/"
        
        fetch(url, {method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }}).then(response => response.json())
        .then(json => json.find(item => item.id === parseInt(id)))
        .then(c => {
            console.log("LIKE EXISTS? ", c)
            if(c){
                console.log("LIKED")
                setLiked(true)
            }
            else{
                console.log("NOT LIKED")
                setLiked(false)
            }
        })
    }

    const addLike = () => {
        setLiked(true)
        const data = {
            liker: 1,
            like: true,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/likes/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {
                console.log("added like:", data); 
                isLiked();
                fetchTotalLikes();
            }).catch(error => {
            console.error("Error:", error)
        })
    }

    const removeLike = () => {
        setLiked(false)
        const data = {
            liker: 1,
            like: false,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/likes/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {
            console.log("removed like:", data)
            isLiked();
            fetchTotalLikes();
            }).catch(error => {
            console.error("Error:", error)
        })
    }



    // favouriting
    const isFavourited = () => {
        // get all favourite objects
        // find this recipe+user. if doesnt exist, it is not favourited. if found, check if favourited
        const url = "http://localhost:8000/recipes/favourites/"
        
        fetch(url, {method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }}).then(response => response.json())
        .then(json => json.find(item => item.id === parseInt(id)))
        .then(c => {
            console.log("FAVOURITE EXISTS? ", c)
            if(c){
                console.log("FAVOURITED")
                setFavourited(true)
            }
            else{
                console.log("NOT FAVOURITED")
                setFavourited(false)
            }
        })
    }

    // FAVOURITES THIS RECIPE
    const addFavourite = () => {
        // switchFavourited()
        // setFavourited(!favourited)
        setFavourited(true)
        // console.log(`Sending new rating to server: ${favourited}`);
        const data = {
            poster: 1,
            favourite: true,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/favourites/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {
                console.log("added favorite:", data); 
                isFavourited();
            }).catch(error => {
            console.error("Error:", error)
        })
    }

    // FAVOURITES THIS RECIPE
    const removeFavourite = () => {
        // switchFavourited()
        // setFavourited(!favourited)
        setFavourited(false)
        // console.log(`Sending new rating to server: ${favourited}`);
        const data = {
            poster: 1,
            favourite: false,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/favourites/add/", {method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify(data)}).then(response => response.json()).then(data => {
            console.log("removed favorite:", data)
            isFavourited();
            }).catch(error => {
            console.error("Error:", error)
        })
    }



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

            {/* if rating exists, display it. otherwise, display 'no rating exists' */}
            <div>Current Rating: {rating? (rating):("no rating yet")}</div>
            {/* {fetchRating()} */}

            <div>Overall Rating: {overallrating? (overallrating):("no overall rating yet")}</div>
            {/* {fetchOverallRating()} */}

            {favourited? (
            <div>MY FAVOURITE</div>
            ): (
                <div>NOT MY FAVOURITE</div>
            )}

            <button onClick={addFavourite}>Favourite</button>
            {/* {console.log(favourited)} */}


            <button onClick={removeFavourite}>UnFavourite</button>
            {/* {console.log(favourited)} */}

            <br></br>


            <div>TOTAL LIKES: {totallikes}</div>


            {liked? (
            <div>LIKED</div>
            ): (
                <div>NOT LIKED</div>
            )}


            <button onClick={addLike}>Like</button>
            {/* {console.log(favourited)} */}


            <button onClick={removeLike}>UnLike</button>
            {/* {console.log(favourited)} */}


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