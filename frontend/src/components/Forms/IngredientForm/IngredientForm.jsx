import {useState} from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const IngredientForm = ({ingredients, setIngredients}) => {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    const handleAdd = () => {
        const ingredient = {
            name: name,
            amount: amount
        }

        setIngredients([...ingredients, ingredient])
    }

    return (
        <div>
            <label>
                Enter ingredient:
                <input type={"text"} name={"name"} value={name} onChange={e => setName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Enter amount:
                <input type={"number"} min={0} value={amount} onChange={e => setAmount(e.target.value)}/>
            </label>
            <br/>
            <Button onClick={handleAdd}>Add Ingredient</Button>
            <br/>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    {ingredient.name}
                    <br/>
                    {ingredient.amount}
                </div>
            ))}
        </div>
    )
}
export default IngredientForm