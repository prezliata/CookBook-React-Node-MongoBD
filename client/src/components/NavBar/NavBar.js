import React from 'react';
import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const NavBar = (props) => {
    const { classes} = props;
    return (
        <div>
            <AppBar position="static" >
                <Toolbar variant="dense">
                    <Typography className={classes.title} variant="h6" color="inherit">
                        Cookbook
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default withStyles(styles)(NavBar);