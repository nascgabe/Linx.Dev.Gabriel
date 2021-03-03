import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        marginTop: '3%',
        marginBottom: '3%',
        width: '50%',
        color: 'white',
        backgroundColor: '#401e59',
    }
}));

export default function IconLabelButtons(props) {
    const classes = useStyles();
    return (
        <div>
            <Button
                variant="contained"
                className={classes.button}
                onClick={props.onClick}
            >
                {props.label}
                {props.sendIcon}
            </Button>
        </div>
    );
}
