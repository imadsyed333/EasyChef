import {Link} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';
import {useContext} from "react";
import AccountContext from "../../contexts/AccountContext";

const RecipeCard = ({id, name, media, servings}) => {
    const {token} = useContext(AccountContext)
    const updateServings = () =>{
        const postdata = {
            recipe: id,
            servings: servings,
        }

        if (token) {
            fetch("http://localhost:8000/recipes/cart/update/",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(postdata)
                })
            console.log("Servings Updated")
        }


    }


    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={media}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Servings: <input type={"number"} min={1} onChange={updateServings} defaultValue={servings}></input>
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

export default RecipeCard
