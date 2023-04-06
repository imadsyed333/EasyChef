import {useState} from "react";
import Button from "react-bootstrap/Button";

const CuisineDietForm = ({type, items, setItems}) => {
    const [item, setItem] = useState("")

    const handleAdd = () => {
        setItems([...items, item])
    }

    return (
        <div>
            <label>Enter {type}:
                <input type={"text"} name={"item"} value={item} onChange={e => setItem(e.target.value)}/>
            </label>
            <Button onClick={() => {
                handleAdd()
            }}>Add {type}</Button>
        </div>
    )
}

export default CuisineDietForm