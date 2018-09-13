import React, { Component } from 'react'
import './CreationPost.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreationPost extends Component {

  state = {
    image: undefined,
    caption: '',
    modalIsOpen: false
  }

  handleImage = event => {
    this.setState({ image: event.target.files[0] })
  }

  handleCaption = event => this.setState({ caption: event.target.value })

  handleSubmit = event => {
    event.preventDefault()

    const { image, caption } = this.state

    this.props.onSubmit(image, caption)
  }

  render() {
    return (
      <div className="CreationPost">
        <form className="CreationPost-form" onSubmit={this.handleSubmit}>
          <div className="CreationPost-imageWrapper">
            <label htmlFor="image">
              <input type="file" name="image" id="image" onChange={this.handleImage} style={{ display: 'none' }} />
              <span className="CreationPost-uploadButton button" type="button">
                <FontAwesomeIcon
                  icon={['fas', 'upload']}
                  className="" />
                <span className="CreationPost-uploadButtonLabel"> Choose a file</span>
              </span>
            </label>
          </div>
          <div className="CreationPost-fieldsWrapper">
            <div className="CreationPost-field">
              <label htmlFor="caption" className="CreationPost-label">Caption</label>
              <textarea
                id="caption"
                className="CreationPost-textarea"
                onChange={this.handleCaption}
              ></textarea>
            </div>
            <div>
              <button className="button is-primary" type="submit" >Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default CreationPost