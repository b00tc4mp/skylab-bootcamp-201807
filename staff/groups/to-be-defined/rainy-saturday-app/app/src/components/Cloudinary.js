import React, {Component} from 'react';
import logic from '../logic'
class Cloudinary extends Component {

  state = {url: ""}
  doSubmit = (e) => {
    e.preventDefault()
    const fileName = document.getElementById("rainysaturday-cloudinary-fileinput").value
    logic.uploadCloudinaryImage(fileName)
    /*  .then(res => console.log(res))
      .catch(err => console.error(err))*/
  }

  /*
  
    doup = () => {
      window.cloudinary.openUploadWidget(
        {cloud_name: 'rainysaturdayprojectskylab', upload_preset: 'uizumwux', tags: ['xmas']},
        (error, result) => {
          if (error) console.error(error)
            else this.setState({url:result[0].secure_url})
        }
      )
    }
  */


  render() {
    return <div>

      <form onSubmit={this.doSubmit}>
        <input type="file" id="rainysaturday-cloudinary-fileinput"/>
        <button type="submit">Submit</button>
      </form>


    </div>


  }

}

export default Cloudinary