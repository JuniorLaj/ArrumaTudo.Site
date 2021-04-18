import React from 'react'
import { DialogContent, Box,Grid, Button } from '@material-ui/core'


export default function ModelOk(props) {
    return (
        <>
        <DialogContent>
            <Grid>
                <Box display="flex" alignItems="center" >
                    <h3>{props.message}</h3>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => props.closeModel()}
                >
                    OK!
                </Button>
            </Grid>
        </DialogContent>
        </>
    )
}