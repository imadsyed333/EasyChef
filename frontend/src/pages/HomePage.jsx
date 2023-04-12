import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

const HomePage = () => {
    const [topratedrecipes, setTopRatedRecipes] = useState([])
    const [mostfavouritedrecipes, setmostfavouritedrecipes] = useState([])

    const [topRated, setTopRated] = useState(true)
    const [mostFavourited, setMostFavourited] = useState(false)

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
    }, [topRated, mostFavourited])

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


    const showOverallRating = () => {
        setMostFavourited(false)
        setTopRated(true)    
    }

    const showMostFavourited = () => {
        setTopRated(false)
        setMostFavourited(true)
    }

    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Welcome to EasyChef</h1>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <h3 style={{display: "flex", justifyContent: "center"}}>Popular Recipes</h3>

                <Tabs centered>
                    <Tab label="Top Rated" value={topRated} onClick={showOverallRating}/>
                    <Tab label="Most Favourited" value={mostFavourited} onClick={showMostFavourited}/>
                </Tabs>

                <Paper variant="outlined" >
                    {mostFavourited?
                        (<RecipeList recipes={mostfavouritedrecipes}/>):
                        (<RecipeList recipes={topratedrecipes}/>)
                    }
                </Paper>

            </Box>

            

        </div>
    )
}

export default HomePage