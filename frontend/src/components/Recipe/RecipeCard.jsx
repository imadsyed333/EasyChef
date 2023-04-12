import {Link, useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';
import {useEffect, useState} from "react";

const RecipeCard = ({id, name, cooking_time, media}) => {
    const navigate = useNavigate()

    const [image, setImage] = useState("")
    const [cookingTime, setCookingTime] = useState(cooking_time ? cooking_time : 0)

    useEffect(() => {
        getMedia()
    }, [])
    const getMedia = () => {
        console.log("look its the media", media)
        if (media) {
            console.log("wee look media", media[0]?.media)
            setImage("http://localhost:8000" + media[0]?.media)
        } else {
            retrieveImage()
        }
    }

    const retrieveImage = () => {
        fetch("http://localhost:8000/recipes/" + id + "/view/").then(response => response.json()).then(json => {
            setCookingTime(json.cooking_time)
            if (json.media) {
                console.log("media", json.media)
                setImage(json.media[0]?.media)
            }
        })
    }

    return (
        <Card variant="outlined" sx={{minWidth: 375, maxWidth: 455}} onClick={() => navigate("/recipe/" + id)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="Image not found!"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cooking time: {cookingTime}
                    </Typography>
                </CardContent>
                <Link to={'/recipe/' + id}/>
            </CardActionArea>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default RecipeCard