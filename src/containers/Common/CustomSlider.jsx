import React, {useState} from "react";
import Slider from '@material-ui/core/Slider';
import ReactTooltip from "react-tooltip";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const CustomSlider = withStyles({
    root: {
        color: '#527ba0',
        height: 3,
    },
    thumb: {
        height: 10,
        width: 10,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -4,
        marginLeft: -5,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% - 10px)',
    },
    track: {
        height: 3,
        borderRadius: 4,
    },
    rail: {
        height: 3,
        borderRadius: 4,
    },
})(Slider);

export default CustomSlider;
