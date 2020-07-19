import React from 'react';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import styles from './styles';

const RecipeItem = (props) => {
    const { classes, recipe, onDelete, onEdit } = props;

	return (
		<div className={classes.wrapper}>
			<Card className={classes.card}>
				<CardHeader title={recipe.title} />
				<CardActionArea>
					<CardMedia className={classes.media} image={recipe.image} title={recipe.title} />
					<CardContent>
						<Typography className={classes.description} variant="body2" color="textSecondary">
							{recipe.description}
						</Typography>
						<Typography variant="body2" color="textSecondary">
							{recipe.date.toLocaleString('en-US')}
						</Typography>
					</CardContent>
				</CardActionArea>
				{/* <CardActions className={classes.actions}> */}
				<div className={classes.actions}>
					<Button data-id={recipe._id} onClick={(e) => onEdit(e)} variant="contained" color="primary">
						Edit
					</Button>
					<Button data-id={recipe._id} onClick={(e) => onDelete(e)} variant="contained" color="secondary">
						Delete
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default withStyles(styles)(RecipeItem);