import './App.css';
import './custom.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get('https://reqres.in/api/users');
            setUsers(response.data.data);
        }
        loadUsers();
    }, []);

    const onChangeHandler = (event) => {
        const text = event.target.value;
        let matches = [];
        if (text.length > 0) {
            matches = users.filter(usr => {
                const regex = new RegExp(`${text}`, "gi");
                return usr.email.match(regex);
            })
        }
        setSuggestions(matches);
    }

    return (
        <div className="container">
            <input type="text"
                   onChange={onChangeHandler}
                   className="col input mt-3"
            />
            {suggestions && suggestions.map((suggestion, i) =>
                <div className="col border-right border-left border-bottom pointer suggestion"
                     key={i}
                     style={{cursor: 'pointer'}}
                >{suggestion.email}</div>
            )}
        </div>
    );
}

export default App;
