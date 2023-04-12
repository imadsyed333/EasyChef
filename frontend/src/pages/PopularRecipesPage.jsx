import MenuBar from "../components/MenuBar/MenuBar";
import RecipeList from "../components/Recipe/RecipeList";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

const PopularRecipesPage = () => {
    const [topratedrecipes, setTopRatedRecipes] = useState([])
    const [mostfavouritedrecipes, setmostfavouritedrecipes] = useState([])

    const [topRated, setTopRated] = useState(true)
    const [mostFavourited, setMostFavourited] = useState(false)

    useEffect(() => {
        Promise.all([fetch("http://localhost:8000/recipes/overallratings/all/").then(response => response.json()).then(json => {
            setTopRatedRecipes(json.results)
        }),
        fetch("http://localhost:8000/recipes/mostfavourited/all/").then(response => response.json()).then(json => {
            setmostfavouritedrecipes(json.results)
        })])
    }, [topRated, mostFavourited])



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
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <h3 style={{display: "flex", justifyContent: "center"}}>Popular Recipes</h3>

                <Tabs centered>
                    <Tab label="Top Rated" value={topRated} onClick={showOverallRating}/>
                    <Tab label="Most Favourited" value={mostFavourited} onClick={showMostFavourited}/>
                </Tabs>

                <Paper variant="outlined" >
                    {mostFavourited?
                        (mostfavouritedrecipes.length?(<RecipeList recipes={mostfavouritedrecipes}/>):
                        (<div style={{display: "flex", justifyContent: "center"}}>NO FAVOURITED RECIPES</div>)):
                            (topratedrecipes.length?(<RecipeList recipes={topratedrecipes}/>):
                            (<div style={{display: "flex", justifyContent: "center"}}>NO RECIPE HAS BEEN RATED YET</div>))
                    }
                </Paper>

            </Box>

            

        </div>
    )
}

export default PopularRecipesPage