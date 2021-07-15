import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [users, setUsers] = useState([]);
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            const response = await axios.get('https://reqres.in/api/users');
            setUsers(response.data.data);
        }
        loadUsers();
    }, []);

    const onChangeHandler = (event) => {
        let matches = [];
        if (text.length > 0) {
            matches = users.filter(usr => {
                const regex = new RegExp(`${text}`, "gi");
                return usr.email.match(regex);
            })
        }
        console.log('matches', matches)
        setSuggestions(matches);
        setText(event.target.value);
    }

    return (
        <div className="container">
            <input type="text"
                   onChange={onChangeHandler}
                   className="col input mt-3"
            />
        </div>
    );
}

export default App;
