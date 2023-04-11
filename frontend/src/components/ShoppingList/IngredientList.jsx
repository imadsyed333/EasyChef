import {useContext, useEffect, useState} from "react";
import AccountContext from "../../contexts/AccountContext";


const IngredientList = () => {
    const {token} = useContext(AccountContext)
    const [list, setList] = useState({})


    useEffect(() => {
        if (token) {
            fetch("http://localhost:8000/accounts/ind_list/",
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + token
                    }

                })
                .then(data => data.json())
                .then(d => {
                    setList(Object.assign(list, d))
                })

        }
    }, [token])


    return (
        <div>
            All Ingredients
            <br></br>
            {Object.keys(list)} : {list[Object.keys(list)[0]]}
        </div>
    )

}
export default IngredientList
