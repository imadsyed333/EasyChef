import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

const HomePage = () => {
    const [recipes, setRecipes] = useState([])


    let [search, setSearch] = useState("")
    // var [cuisines, setCuisine] = useState(1)
    // var [diets, setDiet] = useState('')
    // var [cooking_time, setCookingTime] = useState('')

    // useEffect(() => {
    //     fetch("http://localhost:8000/recipes/find/").then(response => response.json()).then(json => {
    //         setRecipes(json.results)
    //     })
    // }, [recipes])

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
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Welcome to EasyChef</h1>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
               
                <h3 style={{display: "flex", justifyContent: "center"}}>Search Recipes</h3>

                <input style={{display: "flex", textAlign: "center", width: "100%"}}
                 type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>

                <RecipeList recipes={recipes}/>

            </Box>

            

        </div>
    )
}

export default HomePage