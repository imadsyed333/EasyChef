import {useState} from "react";
import Button from "react-bootstrap/Button";

const CuisineDietForm = ({type, items, setItems}) => {
    const [item, setItem] = useState("")

    const handleAdd = () => {
        const data = {"name": item}
        setItems([...items, data])
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
                </div>
            ))}
        </div>
    )
}

export default CuisineDietForm