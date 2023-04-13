import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Button from "react-bootstrap/Button";

const HomePage = () => {
    const [recipes, setRecipes] = useState([])

    let [search, setSearch] = useState("")

    let [cuisines, setCuisines] = useState([])
    let [diets, setDiets] = useState([])
    let [cookingTimes, setCookingTimes] = useState([])

    useEffect(() => {
        searchRecipes()
        fetchCuisines()
        fetchDiets()
        fetchCookingTimes()
        // console.log('OUR RECIPES: ', recipes[1])
        console.log('OUR CUISINES: ', cuisines)

    }, [search])

    const searchRecipes = () => {
        fetch(`http://localhost:8000/recipes/find/?search=${search}`)
            .then(response => response.json())
            .then(json => {
                // console.log(json.results)
                setRecipes(json.results)
            })
    }
    // http://localhost:8000/recipes/find/?cuisines={}&diets={}&cooking_time={}


    // all_cuisines stores all recipe cuisines that currently exist.
    // use these for the cuisine filter

    //https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
    const fetchCuisines = () => {
        fetch(`http://localhost:8000/recipes/cuisines/all/`).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    let temp = json.results.filter((value, index, self) =>
                            index === self.findIndex((item) => (
                                item.name === value.name
                            ))
                    )
                    setCuisines(temp)
                })
            } else {
                console.log(response.json())
            }
        }).catch(errors => console.log(errors))
    }


    const fetchDiets = () => {
        fetch(`http://localhost:8000/recipes/diets/all/`).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    let temp = json.results.filter((value, index, self) =>
                            index === self.findIndex((item) => (
                                item.name === value.name
                            ))
                    )
                    setDiets(temp)
                })
            } else {
                console.log(response.json())
            }
        }).catch(errors => console.log(errors))
    }

    const fetchCookingTimes = () => {
        fetch(`http://localhost:8000/recipes/find/?cooking_time=`).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    let temp = json.results.filter((value, index, self) =>
                            index === self.findIndex((item) => (
                                item.cooking_time === value.cooking_time
                            ))
                    )
                    setCookingTimes(temp)
                })
            } else {
                console.log(response.json())
            }
        }).catch(errors => console.log(errors))
    }


    const handleCuisineSelect = (cui_id) => {

        console.log('CURR CUISINE: ', cui_id)
        fetch(`http://localhost:8000/recipes/find/?cuisines=${cui_id}`)
            .then(response => response.json())
            .then(json => {
                console.log('FRESHH', json.results)
                setRecipes(json.results)
            })

    }


    const handleDietSelect = (diet_id) => {

        console.log('CURR DIET: ', diet_id)
        fetch(`http://localhost:8000/recipes/find/?diets=${diet_id}`)
            .then(response => response.json())
            .then(json => {
                console.log('FRESHH', json.results)
                setRecipes(json.results)
            })

    }


    const handleTimeSelect = (ct) => {

        console.log('CURR DIET: ', ct)
        fetch(`http://localhost:8000/recipes/find/?cooking_time=${ct}`)
            .then(response => response.json())
            .then(json => {
                console.log('FRESHH', json.results)
                setRecipes(json.results)
            })

    }


    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Welcome to EasyChef</h1>
            <Box sx={{width: '100%', bgcolor: 'background.paper'}}>

                <h3 style={{display: "flex", justifyContent: "center"}}>Search Recipes</h3>

                <div style={{display: "flex", justifyContent: "center"}}>

                    <h4>Cuisine Filters:</h4>
                    <br></br>
                    <div>
                        {cuisines?.map(cui => (<Button key={cui.id} value={cui.id} onClick={() => {
                            console.log(cui.id, "CUISINE")
                            handleCuisineSelect(cui.id)
                        }}>{cui.name}</Button>))}
                    </div>

                </div>

                <br></br>

                <div style={{display: "flex", justifyContent: "center"}}>

                    <h4>Diet Filters:</h4>
                    <br></br>
                    <div>
                        {diets?.map(diet => (<Button key={diet.id} value={diet.id} onClick={() => {
                            console.log(diet.id, " DIET")
                            handleDietSelect(diet.id)
                        }}>{diet.name}</Button>))}
                    </div>

                </div>

                <br></br>


                <div style={{display: "flex", justifyContent: "center"}}>

                    <h4>Cooking Time Filters:</h4>
                    <br></br>
                    <div>
                        {cookingTimes?.map(ct =>

                            ct.cooking_time != null ? (<Button key={ct.id} value={ct.id}
                                                               onClick={() => {
                                                                   console.log(ct.cooking_time, " COOK");
                                                                   handleTimeSelect(ct.cooking_time)
                                                               }}>
                                {ct.cooking_time + " Minutes"}
                            </Button>) : (<></>)
                        )}
                    </div>

                </div>

                <br></br>

                <input style={{display: "flex", textAlign: "center", width: "100%"}}
                       type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>

                {recipes.length ? (<RecipeList recipes={recipes}/>) : <div>No Recipes</div>}

            </Box>


        </div>
    )
}

export default HomePage