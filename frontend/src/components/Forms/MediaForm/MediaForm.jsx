import {useState} from "react";
import Button from "react-bootstrap/Button";

const MediaForm = ({media, setMedia}) => {

    return (
        <div>
            <label>
                Upload files:
                <input type={"file"} name={"file"} accept={"image/*,video/*"} multiple
                       onChange={event => setMedia(event.target.files)}/>
            </label>
            <br/>
        </div>
    )
}

export default MediaForm