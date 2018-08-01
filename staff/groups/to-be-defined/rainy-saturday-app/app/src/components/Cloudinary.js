import React, {Component} from 'react';

class Cloudinary extends Component {

state = {url:""}
  fileupload = (e) => {
    e.preventDefault()
    console.log(document.getElementById("rainysaturday-cloudinary-fileinput").value)

  }

  doup = () => {
    window.cloudinary.openUploadWidget(
      {cloud_name: 'rainysaturdayprojectskylab', upload_preset: 'uizumwux', tags: ['xmas']},
      (error, result) => {
        if (error) console.error(error)
          else this.setState({url:result[0].secure_url})
      }
    )
  }


  render() {
    return <div>



      <button onClick={this.doup}>Upload</button>

      {(this.state.url !=="") && <img src={this.state.url} />}
    </div>


  }

}

export default Cloudinary