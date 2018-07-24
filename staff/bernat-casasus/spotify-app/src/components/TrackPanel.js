import React from 'react'

function TrackPanel(props){
    const a = props
    console.log(a)
    return <iframe src={props.result.preview_url} width="100%" height="100%" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

}

export default TrackPanel