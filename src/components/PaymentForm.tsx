import {Button, FormControl, InputAdornment, TextField} from "@mui/material";

const TITLE_MESSAGE = "Title"
const AMOUNT_MESSAGE = "Amount"
const KLIK_MESSAGE = "Klik code"

const PaymentForm = () => {
    return (
        <FormControl sx={{
            width: '30%', gap: 3,
            alignSelf: 'center',
            marginTop: '10%'
        }}>
            <TextField
                required
                label={TITLE_MESSAGE}
                defaultValue="Frog Shop Inc."
                variant="standard"
            />
            <TextField
                required
                type="decimal"
                label={AMOUNT_MESSAGE}
                defaultValue={500.99}
                variant="standard"
                InputProps={{
                    endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                }}
            />
            <TextField
                required
                label={KLIK_MESSAGE}
                variant="standard"
            />
            <Button variant="contained">Pay</Button>
        </FormControl>
    )
}

export default PaymentForm;