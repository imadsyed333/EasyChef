import {useState} from "react";
import Button from "react-bootstrap/Button";

const StepForm = ({steps, setSteps}) => {
    const [content, setContent] = useState("")
    const [prepTime, setPrepTime] = useState(0)
    const [cookingTime, setCookingTime] = useState(0)

    const handleAdd = () => {
        const step = {
            content: content,
            prep_time: prepTime,
            cooking_time: cookingTime
        }

        setSteps([...steps, step])
    }

    const handleDelete = (id) => {
        const new_steps = [...steps]
        new_steps.splice(id, 1)
        setSteps(new_steps)
    }

    return (
        <div>
            <label>
                Enter step:
                <input type={"text"} name={"content"} value={content} onChange={e => setContent(e.target.value)}/>
            </label>
            <br/>
            <label>
                Enter prep time:
                <input type={"number"} name={"prep_time"} value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
            </label>
            <br/>
            <label>
                Enter cooking time:
                <input type={"number"} name={"cooking_time"} value={cookingTime}
                       onChange={e => setCookingTime(e.target.value)}/>
            </label>
            <br/>
            <Button onClick={handleAdd}>Add Step</Button>
            <br/>
            {steps.map((step, index) => (
                <div key={index}>
                    {index + 1}.{step.content}
                    {step.prep_time}
                    {step.cooking_time}
                    <Button onClick={() => handleDelete(index)}>Delete Me</Button>
                </div>
            ))}
        </div>
    )
}
export default StepForm