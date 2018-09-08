
import React, { Component } from 'react'

class InputPhotoPreview extends Component {
    /*constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }*/

    state = {
        file: '',
        imagePreviewUrl: ''
    }
  
    _handleSubmit(e) {
      e.preventDefault();

      debugger;
      // TODO: do something with -> this.state.file
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  debugger;
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      }

      debugger;
  
      return (
        <div>
          <form onSubmit={this._handleSubmit}>
            <input type="file" onChange={this._handleImageChange} />
            <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
          </form>
          {$imagePreview}
        </div>
      )
    }
  
  }

  export default InputPhotoPreview