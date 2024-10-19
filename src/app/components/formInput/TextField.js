import React from 'react';
import { TextField as MUITextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Create a styled TextField component
const CustomTextField = styled(MUITextField)(({ theme }) => ({
    backgroundColor: theme.palette.background.default, // Use the theme's TextField background
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.divider, // Customize the border color if needed
        },
        '&:hover fieldset': {
            borderColor: theme.palette.divider, // Change border color on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.divider, // Change border color when focused
        },
    },
}));

const TextField = (props) => {
    return <CustomTextField size='small' {...props} />
}
export default TextField;
