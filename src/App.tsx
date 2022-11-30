import React from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentForm from "./components/PaymentForm";

function App() {
    return (
        <Box sx={{
            flexGrow: 1,
            height : '90vh',
            display : 'flex',
            flexDirection : 'column'}}>
            <AppBar position="static">
                <Toolbar>
                    <ShoppingCartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Frog Shop
                    </Typography>
                </Toolbar>

            </AppBar>
            <PaymentForm/>
        </Box>
    );
}

export default App;
