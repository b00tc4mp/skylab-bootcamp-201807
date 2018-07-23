'use strict'

const TOKEN = 'BQC26fLgeSRmKewUOyrD5hiJKFp8nk75lU1BwamrGYsoELPmlP84-HztKAl8baFnbdifhQPNTo2tXg9h9ABwJM6RfXOK9NHbN0mc82jDbH3Lyx5P8cGNfai715LziO3D0ugZmBgEq3vYgD8IMlsEjLJsrE3z2v4'

function _callApi(path) {
    let headers = new Headers({ "Authorization": 'Bearer ' + TOKEN, }),
      url = 'https://api.spotify.com/v1' + path;

    return fetch(url, {
                method: "get",
                credentials: 'omit',
                headers,
            }).then((response) => {
                    return response.json()
                })
}

class ResultList extends React.Component {
    constructor(props) {
        super(props)
        let {path, category} = props
        this.state = {
            path: path,
            category: category,
            results: []
        }
    }

    /*componentDidMount() { //https://stackoverflow.com/questions/48946833/how-to-force-render-to-wait-for-promise-to-finish
        updateResultsFromAPI()
    }
    updateResultsFromAPI() {
        _callApi(this.state.path)
        .then((results) => {
            this.setState({ results: results })
        })
    }*/
    componentDidMount() { //https://stackoverflow.com/questions/48946833/how-to-force-render-to-wait-for-promise-to-finish
        let {path, category, results} = this.state
        _callApi(path)
        .then((newResults) => {
            if (category === 'artists') {
                results = newResults.artists.items
            } else {
                results = newResults.items
            }

            this.updateResults(results)
        })
    }

    updateResults = (results) => {
        let filteredResults = results.map(function (result) {
            return {
                id: result.id,
                text: result.name,
                img: result.images && result.images[1]? result.images[1].url : false,
            };
        })

        this.setState({ results: filteredResults })
    }

    render() {
        let {category, results} = this.state,
            listResultItem = results.map((result) => 
                                    <ResultItem 
                                        key={result.id} 
                                        name={result.text} 
                                        img={result.img}
                                    /> );

        return (
            <section className="results-container">
                <CategoryTitle category={category}/>
                <ul className={`${category}-container list-group`}>
                    {listResultItem}
                </ul>
            </section>
        )
    }
    
}

class MainTitle extends React.Component {

    render() {
        return (
            <h1>
                <span>Main  title!</span>
            </h1>
        )
    }
    
}

class CategoryTitle extends React.Component {
    render() {
        return (
            <h2 className="list-title">
                <span>{this.props.category}</span>
            </h2>
        )
    }
    
}

class ResultItem extends React.Component {

    render() {
        const {key, name, img} = this.props
        const image = img? <img src={img}/> : <div className="empty-img"></div>
        return (
            <li className="list-group-item list-group-item-action">
                <a href={'#/' + key}>
                    {image}
                    <span className="result-text">{name}</span>
                </a>
            </li>
        )
    }
    
}

class SearchNavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let imgLogo = './images/spotifyLogo.png';

        return(
            <nav className="navbar navbar-dark">
                <img className="navbar-brand" src={imgLogo}/>
                <SearchBox onSubmit={this.props.onSubmit}/>
            </nav>
        )
    }
}

function SearchBox(props) {

    return (
        <form 
            className="form-inline"
            onSubmit={props.onSubmit}>
            <input type="search" placheholder="Search..." className="form-control mb-2 mr-sm-2"/>
            <button 
                type="submit" 
                className="btn btn-outline-info mb-2">
                Search
            </button>
        </form>
    )
}


class FilterableResultList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    

    handleSearchSubmit = (event) => {
        event.preventDefault()
        const inputVal = event.target.getElementsByTagName('input')[0].value
        this.setState({query: inputVal});
    }

    render() {
        const {query} = this.state,
            path = '/search?type=artist&query=' + query,
            categoryTitle = 'artists',
            resultList = query? <ResultList path={path} category={categoryTitle}/> : '';

        return (
            <div>
                <SearchNavBar onSubmit={this.handleSearchSubmit}/>
                {resultList}
            </div>
        )
    }
}

//////////////////////////

ReactDOM.render(
    <FilterableResultList/>, 
    document.getElementById('root')
);