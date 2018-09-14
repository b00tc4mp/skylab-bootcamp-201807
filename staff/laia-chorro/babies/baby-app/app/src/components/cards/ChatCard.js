import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
});

function ChatCard(props) {
  const { classes, title, photo, prodOwner, onGoToChat, chatId } = props;

  const onOpenChat = event => {
    event.preventDefault()

    onGoToChat(chatId)
  }

  return (
    <Card>
      <CardActionArea onClick={onOpenChat} className={classes.card}>
        <CardMedia
            className={classes.cover}
            image={photo}
            title="Live from space album cover"
          />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">{title}</Typography>
            <Typography variant="subheading" color="textSecondary">
              {prodOwner}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}

ChatCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChatCard);