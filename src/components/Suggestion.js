const Suggestion = props => {
    return (
        <div className="col border-right border-left border-bottom pointer suggestion"
             style={{cursor: 'pointer'}}
             onClick={() => props.onSuggest(props.value)}
        >{props.value}</div>
    )
}

export default Suggestion;