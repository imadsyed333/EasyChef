import {useParams} from "react-router-dom";
import RecipeForm from "../components/Forms/RecipeForm/RecipeForm";

const BaseRecipePage = () => {
    let {id} = useParams()

    return (
        <RecipeForm base={true} recipeId={id}/>
    )
}

export default BaseRecipePage