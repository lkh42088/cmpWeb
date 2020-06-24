import {withStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import React from "react";

/**
 * (16jun2020,bhjung)
 */
export const NubesButtonDefault = withStyles({
    root: {
        background: 'linear-gradient(45deg, #d0c6c6 30%, #e7e2e2 90%)',
        borderRadius: 3,
        border: 0,
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        color: 'white',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(181, 180, 176, .3)',
        margin: '0 8px 0 0',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        color: "#524d4d",
        width: '100%',
    },
})(Button);

export const NubesButtonPrimary = withStyles({
    root: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        margin: '0 8px 0 0',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        width: '100%',
    },
})(Button);

export const NubesButtonSecondary = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        boxSizing: 'content-box',
        minWidth: '5em',
        width: '5em',
        height: 35,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '0 0 0 8px',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
        width: '100%',
        // width: '5em',
    },
})(Button);

const NubesButton2 = withStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#1976d2',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: '0 0 0 8px',
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
    },
})(Button);

const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = {
    root: {
        background: styledBy('color', {
            default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
        borderRadius: 3,
        border: 0,
        margin: '0 0 0 8px',
        color: 'white',
        height: 35,
        padding: '0 30px',
        boxShadow: styledBy('color', {
            default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }),
    },
    label: {
        textTransform: 'capitalize',
        fontFamily: 'Nanum Square RoundR',
        fontSize: '12px',
    },
};

const NubesButtonColor = withStyles(styles)(({ classes, color, ...other }) => (
    <Button className={classes.root} {...other} />
));
