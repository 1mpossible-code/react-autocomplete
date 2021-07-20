import './App.css';
import './custom.css'
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    // Initialize state variables
    const [users, setUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        // Define asynchronous function that fetches users from
        // the api and loads them into 'users' state variable
        const loadUsers = async () => {
            // Fetch data
            const response = await axios.get('https://reqres.in/api/users');
            // Set 'users' state
            setUsers(response.data.data);
        }
        // Call function with catching errors
        loadUsers().catch(err => console.error(err));
    }, []);

    /**
     * Handle suggest action
     * (click on the suggestion)
     * @param suggestionText
     */
    const onSuggestHandler = (suggestionText) => {
        setText(suggestionText);
        setSuggestions([]);
    };

    /**
     * Clear suggestions on
     * blur the input form
     */
    const clearSuggestions = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 200);
    };

    /**
     * Handle input value changes. On change match
     * suggestions and update state variables
     * @param event
     */
    const onChangeHandler = (event) => {
        // Get input text
        const inputText = event.target.value;
        // Init matches array
        let matches = [];
        // Match users' emails with regexp
        // if input is not empty
        if (inputText.length > 0) {
            // Update matches array
            matches = users.filter(usr => {
                const regex = new RegExp(`${inputText}`, "gi");
                return usr.email.match(regex);
            })
        }
        // Update state 'variables'
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
