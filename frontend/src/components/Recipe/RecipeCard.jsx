import {Link, useNavigate} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';

const RecipeCard = ({id, name, cooking_time}) => {
    const navigate = useNavigate()

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
        <Card variant="outlined" sx={{minWidth: 375, maxWidth: 455}} onClick={() => navigate("/recipe/" + id)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image=""
                    alt="Image not found!"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cooking time: {cooking_time}
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