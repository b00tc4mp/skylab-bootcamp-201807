import React, { Component } from 'react'
import Search from '../components/Search';
import logic from '../logic'
import Block from '../components/Block';
import Header from '../components/Header';

logic.unsplashAccessKey = '1cb96dfdb0925fb516e37123f0c906d5fbaadf2669fb3b9c5f0f833539476627'

class HomePage extends Component {

    state = {
        popularsPhotos: []
    }

    componentDidMount() {
        logic.retrievePopularPhotos()
            .then(results => {
                this.setState({ popularsPhotos: results })
            })
    }

    handleSearchSubmit = query => {
        this.props.history.push(`/search/photos/${query}`)
    }

    render() {
        return (
            <div>
                <Header visibleSearch={false} />
                <main>
                    <section className="showcase-container" style={{ backgroundImage: "url('images/man.jpg')" }}>
                        <div className="showcase">
                            <Block
                                title="INSPIRE"
                                description="Beautiful, free photos. Gifted by the world’s most generous community of photographers."
                            />
                            <Search
                                inputPlaceholder="Insert a word to inspire your mind..."
                                inputHelp="Trending searches: business, computer, nature, love, house,..."
                                onSearch={this.handleSearchSubmit}
                            />
                        </div>
                    </section>
                    <section>
                        <ul className="tabs">
                            <li className="tabs__item">
                                <a href="#/" className="tabs__link tabs__link--active">Populars</a>
                            </li>
                        </ul>
                    </section>
                    <section className="content">
                        <div className="photo-list">
                            {
                                this.state.popularsPhotos.map(photo => {
                                    return (
                                        <div className="photo-list-item" key={photo.id}>
                                            <img className="photo-list-item__image" src={photo.urls.regular} alt="" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

export default HomePage