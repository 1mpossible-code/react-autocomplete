/**
 * Return styled suggestion div.
 *
 * In props 'specify' value and
 * 'onSuggest' event handler
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Suggestion = props => {
    return (
        <div className="col border-right border-left border-bottom pointer suggestion"
             style={{cursor: 'pointer'}}
             onClick={() => props.onSuggest(props.value)}
        >{props.value}</div>
    )
}

export default Suggestion;