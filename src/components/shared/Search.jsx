import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import '../../css/search.css';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.doSearchRedirect = this.doSearchRedirect.bind(this);
    }

    state = {
        value: '',
        suggestions: []
    }

    componentWillMount() {
        this.onSuggestionsFetchRequested = debounce(
            500,
            this.onSuggestionsFetchRequested
        )
    }

    renderSuggestion = suggestion => {
        return (
            <div className="result" style={{wordWrap: "break-word", maxWidth: 400}}>
                {suggestion.name}
            </div>
        )
    }

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        axios
            .post('http://localhost:9200/products/products/_search', {
                query: {
                    multi_match: {
                        query: value,
                        fields: ['name', 'description']
                    }
                },
                sort: ['_score']
            })
            .then(res => {
                const results = res.data.hits.hits.map(h => h._source)
                this.setState({ suggestions: results })
                console.log(results);
            })
    }

    doSearchRedirect() {
        // event.preventDefault();
        this.props.history.replace(`/products/search/${this.state.value}`);
        console.log(this.state.value);
        // alert(this.state.value);
    }

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] })
    }

    render() {
        const { value, suggestions } = this.state

        const inputProps = {
            placeholder: 'Saya mau belanja...',
            value,
            onChange: this.onChange
        }

        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.fullName}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    style={{display: "inline-block"}}
                />
                <button type="submit" style={{width: 40, float: "right"}} onClick={this.doSearchRedirect}><i className="fa fa-search"></i></button>
            </div>
        )
    }
}

export default Search;