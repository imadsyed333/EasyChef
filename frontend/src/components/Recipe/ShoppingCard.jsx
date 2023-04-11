import {Link} from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Button} from '@mui/material';

const RecipeCard = ({name, media, servings}) => {


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
            Servings: {servings}
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
