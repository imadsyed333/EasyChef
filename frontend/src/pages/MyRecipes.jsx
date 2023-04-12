import MenuBar from "../components/MenuBar/MenuBar";
import AccountContext from "../contexts/AccountContext";
import {useContext, useEffect, useState} from "react";
import RecipeList from "../components/Recipe/RecipeList";
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const MyRecipes = () => {
    const {token, setToken} = useContext(AccountContext)

    const navigate = useNavigate()

    const [myrecipes, setMyRecipes] = useState([])
    const [myinteractions, setMyInteractions] = useState([])
    const [myfavourites, setMyFavourites] = useState([])

    useEffect(() => {
        // i want to fetch all my recipes and display them as cards.
        // have 3 fetch calls for each endpoint, set each state and render separately
        if (token.length > 0) {
            Promise.all([
            
                fetch("http://localhost:8000/recipes/recipes/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyRecipes(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                }),

                fetch("http://localhost:8000/recipes/interactions/", 
                {method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyInteractions(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                }),

                fetch("http://localhost:8000/recipes/favourites/", 
                    {method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                }})
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(json => {
                            console.log(json)
                            setMyFavourites(json)
                        })
                    } else {
                        setToken("")
                        navigate("/login")
                    }
                })
            ]).catch(errors => {
                console.log(errors)
                setToken("")
                navigate("/")
            })
        }

    }, [token])


    // HELPER CODE FOR TABS FROM THIS SOURCE:
    // https://mui.com/material-ui/react-tabs/#LabTabs.js
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

      const [value, setValue] = useState(0);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    
    return (
        <div>
            <h1 style={{display: "flex", justifyContent: "center"}}>Recipes I've Interacted With:</h1>

            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>

                <Tabs centered onChange={handleChange}>
                    <Tab label="My Interactions" {...a11yProps(0)}/>
                    <Tab label="My Favourites" {...a11yProps(1)}/>
                    <Tab label="My Recipes" {...a11yProps(2)}/>
                </Tabs>

                <TabPanel value={value} index={0}>
                    {myinteractions.length?(<RecipeList recipes={myinteractions}/>):
                    (<div style={{display: "flex", justifyContent: "center"}}>I HAVE NO INTERACTIONS</div>)}
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {myfavourites.length?(<RecipeList recipes={myfavourites}/>):
                    (<div style={{display: "flex", justifyContent: "center"}}>I HAVE NO FAVOURITES</div>)}
                </TabPanel>

                <TabPanel value={value} index={2}>
                    {/* <h4 style={{display: "flex", justifyContent: "center"}}>MY RECIPES</h4> */}
                    {myrecipes.length?(<RecipeList recipes={myrecipes} setRecipes={setMyRecipes} isOwner={true}/>):
                    (<div style={{display: "flex", justifyContent: "center"}}>I HAVE NO RECIPES</div>)}
                </TabPanel>


                {/* <Paper variant="outlined" >
                    {displayMyRecipes?(<RecipeList recipes={myrecipes} setRecipes={setMyRecipes} isOwner={true}/>):
                    displayMyInteractions?(<RecipeList recipes={myinteractions}/>):
                    (<RecipeList recipes={myfavourites}/>)}
                </Paper> */}

            </Box>

        </div>
    )
}
export default MyRecipes

