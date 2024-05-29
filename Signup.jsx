import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Container, Paper } from '@material-ui/core';
import axios from 'axios';

function Signup({ classes }) {
    const [RegistrationNo, setRegistrationNo] = useState('');
    const [Branch, setBranch] = useState('');
    const [password, setPassword] = useState('');
    const [Year, setYear] = useState('');
    const [Hostel, setHostel] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        const RegistrationNo = 20216002; // Replace with actual value
        const Password = "Somu@1236"; // Replace with actual value
        const Branch = "Pie"; // Replace with actual value
        const Year = "3"; // Replace with actual value
        const Hostel = "malviya"; // Replace with actual value
    
        try {
            // Check if the registration number already exists
            const checkResponse = await axios.get(`http://localhost:5000/api/users/${RegistrationNo}`);
            console.log(checkResponse);
            if (checkResponse.data) {
                setErrorMessage('Registration number already exists');
            } else {
                // If registration number doesn't exist, proceed with signup
                const response = await axios.post("http://localhost:5000/api/users/signup", {
                    RegistrationNo,
                    Password,
                    Branch,
                    Year,
                    Hostel,
                });
                console.log(response.data);
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred during signup. Please try again.');
        }
    };
    

    return (
        <Container style={{ backgroundColor: 'skyblue', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper className={classes.SignupBox}>
                <Typography variant="h5" align="center">SignUp</Typography>
                {errorMessage && <Typography variant="body2" color="error" align="center">{errorMessage}</Typography>}
                <div className={classes.inputGroup}>
                    <TextField
                        type="number"
                        id="RegistrationNo"
                        value={RegistrationNo}
                        onChange={(e) => setRegistrationNo(e.target.value)}
                        label="RegistrationNo"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your RegistrationNo"
                    />
                </div>
                <div className={classes.inputGroup}>
                    <TextField
                        type="password"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        variant="outlined"
                        fullWidth
                        placeholder="Create Your Login Password"
                    />
                </div>
                <div className={classes.inputGroup}>
                    <TextField
                        type="text"
                        id="Branch"
                        value={Branch}
                        onChange={(e) => setBranch(e.target.value)}
                        label="Branch"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your Branch"
                    />
                </div>
                <div className={classes.inputGroup}>
                    <TextField
                        type="text"
                        id="Year"
                        value={Year}
                        onChange={(e) => setYear(e.target.value)}
                        label="Year"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your Year"
                    />
                </div>
                <div className={classes.inputGroup}>
                    <TextField
                        type="text"
                        id="Hostel"
                        value={Hostel}
                        onChange={(e) => setHostel(e.target.value)}
                        label="Hostel"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter your Hostel"
                    />
                </div>
                <Button className={classes.button} onClick={handleSignup} fullWidth>
                    Signup
                </Button>
                <div className={classes.loginLink}> Already a User? Login <Link to="/auth">here</Link>
                </div>
            </Paper>
        </Container>
    );
}

const styles = theme => ({
    SignupBox: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        width: 'calc(100% - 20px)',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    loginLink: {
        marginTop: '10px',
        textAlign: 'center',
        '& a': {
            color: '#007bff',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
});

export default withStyles(styles)(Signup);
