import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import styles from './styles';

const RecipeForm = (props) => {
	const { classes, onAddNewRecipe, formIsOpen, onFormClose, onChangeTitle, onChangeDescription, title, description } = props;

	return (
		<Fragment>
			<Dialog
				open={formIsOpen}
				onClose={onFormClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle className={classes.dialogTitle} id="alert-dialog-title">{'Add new recipe'}</DialogTitle>
				<DialogContent>
					<form className={classes.modal} noValidate autoComplete="off">
						<img className={classes.recipeImage} src='https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Choc-Fudge-Cake-b2d1909.jpg?quality=45&resize=768,574'alt='img'/>
						<Input
							value={title}
							onChange={(e) => onChangeTitle(e)}
							placeholder="Title"
							inputProps={{ 'aria-label': 'description' }}
						/>
						<TextField
							value={description}
							onChange={(e) => onChangeDescription(e)}
							id="outlined-multiline-static"
							label="Recipe description"
							multiline
							rows="4"
							placeholder="description"
							variant="outlined"
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onFormClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => onAddNewRecipe()} color="primary" autoFocus>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default withStyles(styles)(RecipeForm);