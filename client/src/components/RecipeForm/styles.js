export default (theme) => ({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    recipeImage: {
        margin: '0px auto',
        maxWidth: 210,
        borderRadius: 5
    },
    dialogTitle: {
        textAlign: 'center'
    },
});