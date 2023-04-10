import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [topratedrecipes, setTopRatedRecipes] = useState([])
    const [mostfavouritedrecipes, setmostfavouritedrecipes] = useState([])

    let [search, setSearch] = useState("")
    // var [cuisines, setCuisine] = useState(1)
    // var [diets, setDiet] = useState('')
    // var [cooking_time, setCookingTime] = useState('')

    useEffect(() => {
        Promise.all([fetch("http://localhost:8000/recipes/overallratings/all/").then(response => response.json()).then(json => {
            setTopRatedRecipes(json.results)
        }),
        fetch("http://localhost:8000/recipes/mostfavourited/all/").then(response => response.json()).then(json => {
            setmostfavouritedrecipes(json.results)
        })])
    }, [])

    // useEffect(() => {
    //     fetch(`http://localhost:8000/recipes/find/?search=${search}`)
    //                 .then(response => response.json())
    //                 .then(json => {
    //                     // console.log(json.results)
    //                     setRecipes(json.results)
    //                 })
    //     // console.log(result)
    // }, [search])
    
    // let all_cuisines = []
    // const addCuisines = () => {
    //     fetch(`http://localhost:8000/recipes/cuisines/all/`)
    //         .then(response => response.json())
    //         .then(json => json.results.forEach(function(result){
    //             all_cuisines.push(result)
    //         }))
    // }
    // addCuisines()

    
    // all_cuisines.forEach(t => console.log(t))
    // console.log(all_cuisines)

    // map((key, i) => (
    //     <p key={i}>
    //       <span>Key Name: {key}</span>
    //       <span>Value: {sampleJSON[key]}</span>
    //     </p>
    //   ))
    // console.log(c)
    return (
        <div>
            <h1>Welcome to EasyChef</h1>

            <h3>Popular Recipes</h3>
            <div>
                <h4>Highest Overall Rating: </h4>
                <RecipeList recipes={topratedrecipes}/>
            </div>

            <div>
                <h4>Most Favourited: </h4>
                <RecipeList recipes={mostfavouritedrecipes}/>
            </div>

        </div>
    )
}

export default HomePage