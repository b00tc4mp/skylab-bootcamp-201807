import React, { Component } from "react"
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Button
} from "reactstrap"
import logic from '../logic'
class FavCard extends Component {

    state = {
        info: ""
    }


    componentDidMount(){
        logic.getGamesById(this.props.id)
        .then(res => this.setState({
            info:res[0]
        }))
    }

  render() {
      return <Card>
      <CardBody>
        <CardTitle><a target="_blank" rel="noopener noreferrer" href={`https://store.steampowered.com/app/${this.state.info.id}/`}>{this.state.info.title}</a></CardTitle>
        <CardImg src={this.state.info.src}/>
      </CardBody>
    <CardFooter>
            <Button color="danger" onClick={() => this.props.deleteFavorites(Number(this.state.info.id))} > DELETE ME</Button>
        </CardFooter>
    </Card>

      }
    }

    export default FavCard