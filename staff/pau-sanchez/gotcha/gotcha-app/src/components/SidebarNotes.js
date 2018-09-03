import React from 'react'


class SidebarNotes extends React.Component {
    componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(null)
      }
      method() {
        console.log('do stuff')
      }
      render() {
        return <h1>Hello World!</h1>
      }
    }
    

export default SidebarNotes;