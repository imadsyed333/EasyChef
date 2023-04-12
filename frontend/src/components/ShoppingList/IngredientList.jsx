import {useContext, useEffect, useState} from "react";
import AccountContext from "../../contexts/AccountContext";


const IngredientList = () => {
    const {token} = useContext(AccountContext)
    const [ingredients, setIngredients] = useState({})


    useEffect(() => {
        if (token) {
            fetch("http://localhost:8000/accounts/ind_list/",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }

                }).then(response => {
                if (response.status === 200) {
                    response.json().then(json => setIngredients(json))
                } else {
                    console.log(response.json())
                }
            }).catch(errors => console.log(errors))
        }
    }, [token])


    return (
        <div>
           
        </div>
    )

}
export default IngredientList
