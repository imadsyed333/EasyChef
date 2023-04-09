import RecipeForm from "../components/Forms/RecipeForm/RecipeForm";
import {useParams} from "react-router-dom";

const EditRecipePage = () => {
    let {id} = useParams()

    return (
        <RecipeForm edit={true} recipeId={id}/>
    )
}
export default EditRecipePage