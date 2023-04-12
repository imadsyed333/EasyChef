import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const ShoppingCard = ({index, recipe, shoppingList, setShoppingList}) => {
    const [serving, setServing] = useState(recipe.servings)

    const navigate = useNavigate()

    useEffect(() => {
        let temp = [...shoppingList]
        temp[index].servings = serving
        setShoppingList(temp)
    }, [serving])

    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea onClick={() => navigate('/recipe/' + recipe.id)}>
                <CardMedia
                    component="img"
                    height="140"
                    alt={recipe.name}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Servings: <input type={"number"} min={1} onChange={e => setServing(e.target.value)}
                                     value={serving}></input>
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
}

export default ShoppingCard
