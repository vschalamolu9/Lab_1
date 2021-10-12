import React, {useState, useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register }  from '../actions/userActions'
import Select from "react-select";
import countryList from "react-select-country-list";



const RegisterUserScreen = ({ location, history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [message,  setMessage] = useState(null)
    const [value, setValue] = useState('');
    const options = useMemo(()=>countryList().getData(), []);


    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const validateName = (enteredName) => {
        let re = /^[a-zA-Z ]{2,30}$/;
        return re.test(enteredName);
    }

    const validatePhoneNumber = (phoneNumber) => {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const changeHandler = value => {
        console.log(value.label)
        setValue(value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!validateName(firstName) || !validateName(lastName)){
            setMessage('Please enter a valid name')
        }
        if(!validateEmail(email)){
            setMessage('Please enter a valid email')
        }
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        if(password.length < 10){
            setMessage('Your password should contain atleast 10 characters')
        }
        if(!validatePhoneNumber(phoneNumber)){
            setMessage('Please enter a valid phone number')
        } else{
            dispatch(register(firstName, lastName, email, password, phoneNumber, street, city, province, value.label, zipCode))
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstname'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='lastname'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group controlId='street'>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Street'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Province or State'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Select options={options} value={value} onChange={changeHandler}/>
                </Form.Group>
                <br/>
                <Form.Group controlId='zipCode'>
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='ZIP Code'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterUserScreen