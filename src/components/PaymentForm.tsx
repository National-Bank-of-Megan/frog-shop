import {Alert, AlertTitle, Button, FormControl, InputAdornment, Paper, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import Decimal from "decimal.js";



const TITLE_MESSAGE = "Title"
const AMOUNT_MESSAGE = "Amount"
const KLIK_MESSAGE = "Klik code"
const KLIK_SERVICE_ERROR_MESSAGE = "Klik service unavailable!"

type ErrorType = {
    isOpen: boolean,
    message: string
}

const PaymentForm = () => {
    const [title, setTitle] = useState<string>('Frog Shop Inc');
    const [amount, setAmount] = useState<Decimal>(new Decimal(100.00));
    const [klik, setKlik] = useState<string>('');
    const [alertError, setAlertError] = useState<ErrorType>({
        isOpen: true,
        message: 'Klik service not connected!'
    })

    useEffect(() => {
        let ws = new WebSocket('ws://localhost:8081/payment/finalize', "Upgrade"
        );
        ws.onopen = () => {
            console.log('WEBSOCKET CONNECTION OPENED');
            setAlertError({
                ...alertError, isOpen: false
            })
        };
        ws.onmessage = (e) => {
            console.log('WEBSOCKET CONNECTION RECEIVED DATA');
            setKlik(e.data)
        };
        ws.onerror = (e) => {
            console.log('WEBSOCKET CONNECTION ERROR');
            console.log(e)
            setAlertError({
                isOpen: true,
                message: KLIK_SERVICE_ERROR_MESSAGE
            })
        };
        ws.onclose = (e) => {
            console.log('WEBSOCKET CONNECTION CLOSED');
        }
    },[])




    return (
        <Paper
            elevation={6}
            sx={{
                alignSelf: 'center',
                width: '30%',
                marginTop: '10%',
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 5
            }}>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5
                }}>
                <TextField
                    required
                    label={TITLE_MESSAGE}
                    variant="standard"
                    value={title}
                    onChange={(value) => setTitle(value.target.value)}
                />
                <TextField
                    required
                    type="number"
                    label={AMOUNT_MESSAGE}
                    variant="standard"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">USD</InputAdornment>
                    }}
                    inputProps={{step: "0.1", lang: "en-US"}}
                    value={amount}
                    onChange={(value) => setAmount(new Decimal(value.target.value).toDecimalPlaces(2))}
                />
                <TextField
                    required
                    type="number"
                    label={KLIK_MESSAGE}
                    variant="standard"
                    value={klik}
                    onChange={(value) => setKlik(value.target.value)}
                />
                <Button variant="contained"
                        disabled={alertError.isOpen}
                        onClick={
                            () => {
                                alert(title + " " + amount + " " + klik)
                                setKlik("")
                                setAmount(new Decimal(100.00))
                                setTitle('Frog Shop Inc')
                            }
                        }
                >Pay</Button>
            </FormControl>
            <Alert
                severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{alertError.message}</strong>
            </Alert>
            {/*<Button onClick={()=>c()}>dhdhd</Button>*/}
        </Paper>
    )
}

export default PaymentForm;