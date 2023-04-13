import {useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {useContext, useEffect, useState} from "react";
import AccountContext from "../contexts/AccountContext";
import ReactStars from "react-rating-stars-component";

const RecipeDetailsPage = () => {

    const token = localStorage.getItem("token")

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
        total_likes: 0,
        media: []
    })

    const [comment, setComment] = useState("")
    const [comm_media, setCommentMedia] = useState([])
    const [rating, setRating] = useState(undefined)
    const [overallrating, setOverallRating] = useState(undefined)
    const [favourited, setFavourited] = useState(false)
    const [liked, setLiked] = useState(false)
    const [totallikes, setTotalLikes] = useState(0)
    // const [comments, setComments] = useState([])
    const [allusers, setAllUsers] = useState([])


    useEffect(() => {
        fetchRecipeDetails()
        // fetchAllComments()
        fetchRating()
        fetchTotalLikes()
        fetchOverallRating()
        isFavourited()
        fetchRecipes()
        isLiked()
        fetchAllUsers()
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


    const fetchAllUsers = () => {
        fetch("http://localhost:8000/accounts/profiles/all/")
            .then(response => response.json())
            .then(json => {
                console.log("Users: ", json.results)
                setAllUsers(json.results)
            })

    }

    const fetchTotalLikes = () => {
        fetch("http://localhost:8000/recipes/totallikes/")
            .then(response => response.json())
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
        fetch("http://localhost:8000/recipes/ratings/", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(json => json.find(item => item.recipe === parseInt(id)))
            .then(curr_recipe => {
                console.log("THIS USER'S INFO FOR THIS RECIPE: ", curr_recipe)
                if (curr_recipe) {
                    console.log("USER'S RATING FOR THIS RECIPE: ", curr_recipe.value)
                    setRating(curr_recipe.value)
                } else {
                    console.log("USER'S DOESN'T HAVE RATING FOR THIS RECIPE")
                }
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
        fetch("http://localhost:8000/recipes/ratings/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }, body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("yeye:", data)
            fetchRecipeDetails();
            fetchOverallRating()
        }).catch(error => {
            console.error("Error:", error)
        })
    }

    const isLiked = () => {

        const url = "http://localhost:8000/recipes/likes/"

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
            .then(json => json.find(item => item.id === parseInt(id)))
            .then(c => {
                console.log("LIKE EXISTS? ", c)
                if (c) {
                    console.log("LIKED")
                    setLiked(true)
                } else {
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

        fetch("http://localhost:8000/recipes/likes/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }, body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
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

        fetch("http://localhost:8000/recipes/likes/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }, body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
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

        fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }
        }).then(response => response.json())
            .then(json => json.find(item => item.id === parseInt(id)))
            .then(c => {
                console.log("FAVOURITE EXISTS? ", c)
                if (c) {
                    console.log("FAVOURITED")
                    setFavourited(true)
                } else {
                    console.log("NOT FAVOURITED")
                    setFavourited(false)
                }
            })
    }

    // FAVOURITES THIS RECIPE
    const addFavourite = () => {
        setFavourited(true)
        const data = {
            poster: 1,
            favourite: true,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/favourites/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }, body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("added favorite:", data);
            isFavourited();
        }).catch(error => {
            console.error("Error:", error)
        })
    }

    const removeFavourite = () => {
        setFavourited(false)
        const data = {
            poster: 1,
            favourite: false,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/favourites/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            }, body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("removed favorite:", data)
            isFavourited();
        }).catch(error => {
            console.error("Error:", error)
        })
    }

    // bruh why'd i think we needed to get the comments :sob:
    // const fetchAllComments = () => {
    //     fetch("http://localhost:8000/recipes/comments/all/")
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log("This recipes's comments: ", json.results)
    //         setComments(json.results)
    //     })

    // }


    const sendComment = () => {

        // clear the comment
        setComment("")
        console.log("token:", token)

        const data = {
            poster: 1,
            content: comment,
            // media: comm_media,
            recipe: parseInt(id)
        }

        fetch("http://localhost:8000/recipes/comments/add/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => {
            console.log("Success:", data)

            if (comm_media) {
                sendCommentMedia(comm_media, data.id);
            }

            fetchRecipeDetails()
        }).catch(error => {
            console.error("Error:", error)
        })

    }


    const sendCommentMedia = (comment_med, comm_id) => {
        console.log("MEDIA TO SEND TO RECIPE " + parseInt(id) + ": ", comment_med, " total media items: ", comment_med.length)
        console.log("COMMENT ID: ", comm_id)

        // loop through each item, and send it one by one to the server

        // convert filelist to array
        let comm_media_array = [...comment_med]
        console.log("Comment's Media Array: ", comm_media_array)

        comm_media_array.map(curr_comm_media => {
            const formData = new FormData();

            formData.append('media', curr_comm_media);
            formData.append("comment", comm_id);

            fetch('http://localhost:8000/recipes/comments/media/add/', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: formData
            }).then(response => response.json())
                .then(data => {
                    console.log("Success:", data)
                    fetchRecipeDetails()
                }).catch(error => {
                console.error("Error:", error)
            })

        })
    }

    const addToCart = () => {
        const data = new FormData()
        data.append("recipe", id)
        fetch("http://localhost:8000/recipes/cart/add/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            },
            body: data
        }).then(response => response.json()).then(json => console.log(json))
    }

    const removeFromCart = () => {
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


    let initialOverallRating = {
        size: 30,
        value: overallrating,
        edit: false,
        isHalf: true
    };
      


    return (
        <div>
            <h1>{recipe.name}</h1>
            {
                recipe.media?.map(recipe_media => 
                    ((recipe_media?.media?.split(".")[1] === "mp4") ||
                    (recipe_media?.media?.split(".")[1] === "avi") ||
                    (recipe_media?.media?.split(".")[1] === "MOV") ||
                    (recipe_media?.media?.split(".")[1] === "webm")) ?
                    (<video width="150" controls>
                        <source src={recipe_media.media}/>
                    </video>) :
                    (<embed src={recipe_media.media} width="130px"></embed>))}

            <Button onClick={addToCart}>Add to Shopping List</Button>
            <Button onClick={removeFromCart}> Remove from Shopping List </Button>

            <div> Original Overall Rating: 
                {overallrating ? 
                (<ReactStars {...initialOverallRating}/> ):
                ("no overall rating yet")}</div>


            <div>Overall Rating:  
                {overallrating ? 
                (overallrating):
                ("no overall rating yet")}</div>

            <div>Total Likes: {totallikes}</div>


            {token?(<ReactStars {...newRating} />):(<div></div>)}


            {/* if rating exists, display it. otherwise, display 'no rating exists' */}
            {token?(<div>My Current Rating: {rating ? (rating) : ("no rating yet")}</div>):(<div></div>)}



            {token?
                (favourited ? 
                    (<div>MY FAVOURITE</div>):(<div>NOT MY FAVOURITE</div>)):
                    (<div></div>)}

            {token?(<button onClick={addFavourite}>Favourite</button>):(<div></div>)}
            {token?(<button onClick={removeFavourite}>UnFavourite</button>):(<div></div>)}

            <br></br>


            {token?
                (liked?
                    (<div>LIKED</div>):(<div>NOT LIKED</div>)):
                    (<div></div>)}

            {token?(<button onClick={addLike}>Like</button>):(<div></div>)}
                
            {token?(<button onClick={removeLike}>UnLike</button>):(<div></div>)}


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
            <h2>Ingredients</h2>
            <ul>
                {recipe.ingredients?.map((ingredient, i) => (
                    <li key={i}>{ingredient.amount} of {ingredient.name}</li>
                ))}
            </ul>
            <h2>Steps</h2>
            <ol>
                {recipe.steps?.map(step => (

                    <div key={step.id}>
                        {console.log("step " + step.id + " media: ", step.media)}
                        {step.media?.map(img => (<embed src={img.media} width="130px"></embed>))}
                        <br></br>
                        <li>{step.content}</li>
                    </div>

                ))}
            </ol>
            <h2>Comments Section</h2>
            <hr></hr>

            
            {token?(
            <form>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>

                <input type="file" accept="image/*,video/*" multiple onChange={(e) => {
                    console.log("ALL FILES: ", e.target.files);
                    setCommentMedia(e.target.files);
                    console.log(comm_media)
                }}/>

                <Button onClick={sendComment}>comment</Button>

            </form>):(<div></div>)}


            <hr></hr>

            {recipe.comments?.slice(0).reverse().map(comment => (
                <div key={comment.id}>

                    <div>{allusers.find(item => item.id === parseInt(comment.poster))?.avatar ? (
                        <img src={allusers.find(item => item.id === parseInt(comment.poster))?.avatar}
                             width="75px"></img>) : ("")}</div>
                    <div>{"Commenter: " + allusers.find(item => item.id === parseInt(comment.poster))?.email}</div>
                    {/* {console.log("NEW COMMENT: ", comment)} */}
                    <div>{"Comment: " + comment.content}</div>

                    {/* Conditional rendering: if media is video, render as video. otherwise, render as image. */}
                    {comment.media?.map(comment_media =>
                        ((comment_media?.media?.split(".")[1] === "mp4") ||
                            (comment_media?.media?.split(".")[1] === "avi") ||
                            (comment_media?.media?.split(".")[1] === "MOV") ||
                            (comment_media?.media?.split(".")[1] === "webm")) ?
                            (<video width="150" controls>
                                <source src={comment_media.media}/>
                            </video>) :
                            (<embed src={comment_media.media} width="130px"></embed>))}

                    <hr></hr>

                </div>

            ))}

            {/* might not need this */}
            {/* <div>{(comments !== [])?(comments[0].content):('no comments yet')}</div> */}

        </div>
        // </>

    )
}
export default RecipeDetailsPage
