import {withStyles} from "@material-ui/core/styles";
import {InputBase} from "@material-ui/core";

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: "transparent",
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '8px 20px 8px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default BootstrapInput;
