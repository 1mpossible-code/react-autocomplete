import './App.css';
import './custom.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get('https://reqres.in/api/users');
            setUsers(response.data.data);
        }
        loadUsers();
    }, []);

    const onSuggestHandler = (suggestionText) => {
        setText(suggestionText);
        setSuggestions([]);
    };

    const clearSuggestions = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 200);
    };

    const onChangeHandler = (event) => {
        const inputText = event.target.value;
        let matches = [];
        if (inputText.length > 0) {
            matches = users.filter(usr => {
                const regex = new RegExp(`${inputText}`, "gi");
                return usr.email.match(regex);
            })
        }
        setText(inputText);
        setSuggestions(matches);
    };

    return (
        <div className="container">
            <input type="text"
                   onChange={onChangeHandler}
                   className="col input mt-3"
                   value={text}
                   onBlur={clearSuggestions}
            />
            {suggestions && suggestions.map((suggestion, i) =>
                <div className="col border-right border-left border-bottom pointer suggestion"
                     key={i}
                     style={{cursor: 'pointer'}}
                     onClick={() => onSuggestHandler(suggestion.email)}
                >{suggestion.email}</div>
            )}
        </div>
    );
}

export default App;
