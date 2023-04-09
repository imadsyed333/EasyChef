import {useState} from "react";
import Button from "react-bootstrap/Button";

const CuisineDietForm = ({type, items, setItems}) => {
    const [item, setItem] = useState("")

    const handleAdd = () => {
        const data = {"name": item}
        setItems([...items, data])
    }

    const handleDelete = (id) => {
        const new_items = [...items]
        new_items.splice(id, 1)
        setItems(new_items)
    }

    return (
        <div>
            <label>Enter {type}:
                <input type={"text"} name={"item"} value={item} onChange={e => setItem(e.target.value)}/>
            </label>
            <Button onClick={() => {
                handleAdd()
            }}>Add {type}</Button>
            {items.map((item, index) => (
                <div key={index}>
                    {item.name}
                    <Button onClick={() => handleDelete(index)}>Delete Me</Button>
                </div>
            ))}
        </div>
    )
}

export default CuisineDietForm