import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';
import {useContext, useEffect, useState} from "react";

const ShoppingCard = ({index, recipe, shoppingList, setShoppingList}) => {
    const [serving, setServing] = useState(recipe.servings)

    useEffect(() => {
        let temp = [...shoppingList]
        temp[index].servings = serving
        setShoppingList(temp)
    }, [serving])

    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    alt={recipe.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Servings: <input type={"number"} min={1} onChange={e => setServing(e.target.value)}
                                         value={serving}></input>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button>

                </Button>
            </CardActions>
        </Card>
    )
}

export default ShoppingCard
