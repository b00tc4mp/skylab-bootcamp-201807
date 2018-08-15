import React, { Component } from 'react';
import logic from '../logic';

class Files extends Component {

    onListFile = (event) =>
        logic.listFiles(this.props.name)
            .then(() => {
            // this.setState({ justRegistered: true })

            // this.props.history.push('/registered')

                console.log('Entra')
                console.log(this.props.name)
            })
            .catch(({ message }) => console.log('errorcito'))
    
    onSaveFile = (username, file) =>
        logic.saveFile(this.props.name, file)
            .then(() => {
                // this.setState({ justRegistered: true })

                // this.props.history.push('/registered')

                console.log('Entra')
            })
            .catch(({ message }) => console.log('errorcito'))

    onDownloadFile = (username, file) =>
        logic.retrieveFile(this.props.name, file)
            .then(() => {
            // this.setState({ justRegistered: true })
    
            // this.props.history.push('/registered')
    
            console.log('Entra')
            })
            .catch(({ message }) => console.log('errorcito'))

    onDeleteFile = (username, file) =>
        logic.removeFile(this.props.name, file)
            .then(() => {
            // this.setState({ justRegistered: true })

            // this.props.history.push('/registered')

            console.log('Entra')
            })
            .catch(({ message }) => console.log('errorcito'))

    
    






    render() {
        return <div className="screen">
            <h1>FILES</h1> <img className="image" src="images/default-image.png" />
            <nav>
                > <a href="/#">profile</a> <a href="/#">logout</a> <span className="blink">_</span>
            </nav>
            <ul>
                <li>file 1</li>
                <li>file 2</li>
                <li>file 3</li>
            </ul>
            <button><label for="upload">Choose a file</label></button>
            <form action="/files" method="post">
                <input id="upload" type="file" name="upload" placeholder="" />
                <button type="submit">upload</button>
            </form>
        </div>
    }
}

export default Files