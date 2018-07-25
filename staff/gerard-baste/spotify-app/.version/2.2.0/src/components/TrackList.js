import React from 'react'

// class TrackList extends React.Component {

// constructor () {
// super()

// }

//     state = {
//         name: this.props.name,
//         image: this.props.image,
//         file: this.props.file,
//         link: this.props.link
//     }

//     render () {
//         return (
//     <section>
//             <h2>{this.state.name}</h2>
//             <img src={this.state.image}/>
//             <audio controls autoPlay>
//                  <source src={this.state.file} type="audio/mpeg"/>
//             </audio>
//             <a href={this.state.link} target='_blank'/>
//         </section>)
// }
// }



function TrackList(props) {
    return <section>
        <h2>{props.track.name}</h2>
        <img src={props.track.image}/>
        <audio controls autoPlay>
             <source src={props.track.file} type="audio/mpeg"/>
        </audio>
        <a href={props.track.link} target='_blank'/>
    </section>
}

export default TrackList