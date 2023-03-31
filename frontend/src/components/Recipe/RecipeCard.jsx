import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const RecipeCard = ({id, name, cooking_time}) => {

    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" alt={''}/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              Cooking time: {cooking_time}
            </Card.Text>
            <Button as={Link} to={"/recipe/" + id} variant="primary">See Recipe</Button>
          </Card.Body>
    </Card>
    )
}

export default RecipeCard