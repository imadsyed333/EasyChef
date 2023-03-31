import {useParams} from "react-router-dom";


const RecipeDetailsPage = () => {

    let {id} = useParams()


    return (
        <h1>this is where recipe {id} will be</h1>
    )
}
export default RecipeDetailsPage