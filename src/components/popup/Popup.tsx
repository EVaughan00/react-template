import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { FunctionComponent } from 'react';
import styles from './styles/Popup.css'

interface Props {
    visible?: boolean,
    onDismiss?: () => void,
    title?: string,
    subtitle?: string
}

const Popup: FunctionComponent<Props> = props => {

    const handleDismiss = () => {
        props.onDismiss?.();
    }

    return (
            <Dialog 
                open={props.visible ?? true}
                onClose={handleDismiss}
                PaperProps={{className: styles.container}}
            >                
              <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {props.subtitle}
                </DialogContentText>
                    {props.children}
                </DialogContent>
            </Dialog>
    );
}

export default Popup