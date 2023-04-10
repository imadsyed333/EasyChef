import {Link} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';

const RecipeCard = ({id, name, cooking_time}) => {

    // return (
    //     <Card style={{ width: '18rem' }}>
    //       <Card.Img variant="top" src="holder.js/100px180" alt={''}/>
    //       <Card.Body>
    //         <Card.Title>{name}</Card.Title>
    //         <Card.Text>
    //           Cooking time: {cooking_time}
    //         </Card.Text>
    //         <Button as={Link} to={"/recipe/" + id} variant="primary">See Recipe</Button>
    //       </Card.Body>
    // </Card>
    // )

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
              {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cooking time: {cooking_time}
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