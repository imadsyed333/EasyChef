import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";

const HomePage = () => {
    const [recipes, setRecipes] = useState([])

    let [search, setSearch] = useState("")
    // var [cuisines, setCuisine] = useState(1)
    // var [diets, setDiet] = useState('')
    // var [cooking_time, setCookingTime] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8000/recipes/all/`).then(response => response.json()).then(json => {
            setRecipes(json.results)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8000/recipes/find/?search=${search}`)
                    .then(response => response.json())
                    .then(json => {
                        // console.log(json.results)
                        setRecipes(json.results)
                    })
        // console.log(result)
    }, [search])
    
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
        <>
            <div>
                <h1>Welcome to EasyChef</h1>
                {/* <ul>
                    {addCuisines()}
                </ul> */}
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>

                {/* <select name="Cuisines">
                    {all_cuisines.map((id, name) => {
                        // console.log("AAAAAAAA", id, name)
                        <option value={id}>{name}</option>
                    })}
                </select> */}

                {/* <button onClick={(e) => setCuisine(0)}>All</button> */}

                <RecipeList recipes={recipes}/>

            </div>
        </>

    )
}

export default HomePage