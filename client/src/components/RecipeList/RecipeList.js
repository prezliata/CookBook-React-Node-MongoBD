import React from 'react';
import { withStyles } from '@material-ui/core';
import RecipeItem from '../RecipreItem/RecipeItem'
import styles from './styles';

const RecipeList = (props) => {
    const { classes, recipe, onDelete, onEdit} = props;
    return (
        <div className={classes.wrapper}>
            {recipe.map((recipe) => (
                <div key={recipe._id}>
                    <RecipeItem 
                        recipe={recipe}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </div>
            ))}
        </div>
    )
}
export default withStyles(styles)(RecipeList);