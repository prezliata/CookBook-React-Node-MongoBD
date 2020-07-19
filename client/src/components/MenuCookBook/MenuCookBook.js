import React from 'react';
import { withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InputBase from '@material-ui/core/InputBase';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import styles from './styles';

const MenuCookBook = (props) => {
    const { classes, onRecipesSort, sortBy, onRecipeFind, onFormOpen} = props;
    return (
        <div className={classes.menuStyle}>
            <Fab 
                size="small" 
                title="Add new recipe"
                color="primary" 
                onClick={onFormOpen}
                aria-label="Add new recipe">
                <AddIcon />
            </Fab>
            <FormControl className={classes.select}>
                <NativeSelect onChange={(e) => onRecipesSort(e)} value={sortBy}>
                    <option value="" disabled >
                        Sort by
                    </option>
                    <option value="Newest">Newest</option>
                    <option value="Oldest">Oldest</option>
                </NativeSelect>
            </FormControl>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => onRecipeFind(e)}
            />

        </div>
    )
}
export default withStyles(styles)(MenuCookBook);