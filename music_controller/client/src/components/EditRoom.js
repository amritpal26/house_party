import React, { useState, useEffect } from 'react';
import Configs from "../configs";
import { useHistory } from 'react-router';
import { createRoom } from '../actions/room';
import { connect } from 'react-redux';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {
    makeStyles,
    Box,
    Card,
    Divider,
    Button,
    CircularProgress,
    Typography,
    FormControl,
    Switch,
    FormControlLabel
} from "@material-ui/core";


const DEFAULT_VOTES_TO_SKIP = Configs.constants.DEFAULT_VOTES_TO_SKIP;
const DEFAULT_GUEST_CAN_PAUSE = Configs.constants.DEFAULT_GUEST_CAN_PAUSE;

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '420px',
        minHeight: '420px',
        maxWidth: '720px',
        maxHeight: '720px',
        padding: theme.spacing(2),
    },
    paper: {
        flex: '1 1 auto',
        minHeight: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '100%',
        flexGrow: 1,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
    },
    buttonsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(1)
    },
    votesLabel: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(2)
    }
}));

const EditRoom = ({ createRoom }) => {
    const classes = useStyles();
    const history = useHistory();
    const [isCreatingRoom, setIsCreatingRoom] = useState(false);
    const [formData, setFormData] = useState({
        roomName: '',
        votesToSkip: DEFAULT_VOTES_TO_SKIP,
        guestCanPause: DEFAULT_GUEST_CAN_PAUSE
    });

    useEffect(() => {
        ValidatorForm.addValidationRule('isStrictPositive', (value) => {
            return value > 0;
        });

        return () => {
            ValidatorForm.removeValidationRule('isStrictPositive');
        }
    });

    const onGuestCanPauseChange = (e) => setFormData({
        ...formData,
        guestCanPause: e.target.checked
    });

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onCancel = (e) => {
        console.log('onCancel');
        history.replace('/login');
    };

    const onCreateRoom = (e) => {
        console.log('create Room: ', formData);
        setIsCreatingRoom(true);

        const onSuccess = (res) => {
            setIsCreatingRoom(false);
            console.log('room created', res);
        }

        const onFailure = (err) => {
            setIsCreatingRoom(false);
            console.log('Failed to create room: ', err);
        }

        createRoom(formData.roomName, formData.votesToSkip, formData.guestCanPause, onSuccess, onFailure);
    };

    return (
        <Box className={classes.box}>
            <Card className={classes.card} >
                <div className={classes.paper}>
                    <Typography component='h1' variant='h4'>
                        Create A Room
                    </Typography>
                    <Divider></Divider>

                    {isCreatingRoom && <CircularProgress style={{ position: 'absolute', top: '50%' }} />}
                    <ValidatorForm
                        className={classes.form}
                        onSubmit={onCreateRoom}>
                        <div className={classes.contentContainer}>
                            <TextValidator
                                fullWidth
                                label='Room name'
                                name='roomName'
                                disabled={isCreatingRoom}
                                onChange={onChange}
                                value={formData.roomName}
                                validators={['required']}
                                errorMessages={['Name is required']}
                                style={{ width: '100%' }}
                            />
                            <TextValidator
                                type='number'
                                label='Votes to skip'
                                name='votesToSkip'
                                disabled={isCreatingRoom}
                                value={formData.votesToSkip}
                                helperText='Votes required to skip a song'
                                validators={['required', 'isStrictPositive']}
                                errorMessages={['This field is required', 'Votes to skip should be greater than 0']}
                                style={{ marginTop: '8px', width: '100%' }}
                            />
                            <FormControl component="fieldset">
                                <FormControlLabel
                                    className={classes.votesLabel}
                                    control={
                                        <Switch color="primary"
                                            defaultChecked={DEFAULT_GUEST_CAN_PAUSE}
                                            disabled={isCreatingRoom}
                                            onChange={onGuestCanPauseChange}
                                        />}
                                    label="Guest can pause/play music"
                                    labelPlacement="start"
                                />
                            </FormControl>
                        </div>
                            
                        <div className={classes.buttonsContainer}>
                            <Button
                                variant='outlined'
                                disabled={isCreatingRoom}
                                onClick={onCancel}
                            >Cancel
                        </Button>
                            <Button
                                variant='outlined'
                                disabled={isCreatingRoom}
                                type='submit'
                            >Create
                        </Button>
                        </div>
                    </ValidatorForm>
                </div>
            </Card>
        </Box>
    );
}

export default connect(null, { createRoom })(EditRoom);