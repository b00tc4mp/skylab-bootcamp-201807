/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import Alert from 'react-s-alert'
import logic from '../../logic'


const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
}

class UsersDialog extends React.Component {

    state = {
        prodBuyers: []
    }

    componentDidMount() {
        const productId = this.props.idprod
        this.getUsersFromChatsByProduct(productId)
    }

    getUsersFromChatsByProduct = productId => {
        return logic.listChatsByProductId(productId)
            .then(chats => Promise.all(chats.map(chat => {
                const userId = logic._userId
                const receiver = chat.users.find(item => item !== userId)
                return logic.getPublicUser(receiver)
            })) )
            .then(values => this.setState({ prodBuyers: values }) )
            .catch(({ message }) => Alert.error(message, { position: 'bottom-right', effect: 'slide', timeout: 3000 }))
    }


    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;
        const { prodBuyers } = this.state

        return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">Who is buying your product?</DialogTitle>
            <div>
            <List>
                {prodBuyers && prodBuyers.map((buyer, index) => (
                <ListItem button onClick={() => this.handleListItemClick(buyer.id)} key={index}>
                    <ListItemAvatar>
                    {buyer.photo?
                        <Avatar style={{display: 'inline-block', marginRight: '5px'}} alt="profile photo" style={{ height: '48px', width: '48px', margin: '10px auto' }} src={buyer.photo} className={classes.avatar} /> : 
                        <i className="material-icons md-48">face</i>
                    }
                    </ListItemAvatar>
                    <ListItemText primary={buyer.public_name} />
                </ListItem>
                ) )}
            </List>
            </div>
        </Dialog>
        );
    }
}

UsersDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};
  
export default withStyles(styles)(UsersDialog);