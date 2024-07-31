import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import AlertMessage from '../layout/AlertMessage';
import { AuthContext } from '../../contexts/AuthContext';

function RegisterForm() {
    // context
    const {registerUser} = useContext(AuthContext)

    // router
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        passwordConfirm: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password, passwordConfirm} = registerForm
    const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

    const register = async event => {
        // tránh submit theo form html
        event.preventDefault()

        if (password !== passwordConfirm){
            setAlert({type: 'danger', message: 'Password không khớp'})
            setTimeout(() => setAlert(null), 3000)
            return 
        }

        try {
            const registerData = await registerUser(registerForm)
            if (registerData.success){
                navigate('/login')
            }else{
                setAlert({type: 'danger', message: registerData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( <>
        <Form className='ny-4' onSubmit={register}>
        <AlertMessage info={alert} />
            <Form.Group>
                <Form.Control 
                type='text' 
                placeholder='Username' 
                name='username'
                value={username}
                onChange={onChangeRegisterForm}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className='password'>
                <Form.Control 
                type='password' 
                placeholder='Password' 
                name='password'
                onChange={onChangeRegisterForm}
                value={password}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group className='passwordConfirm'>
                <Form.Control 
                type='password' 
                placeholder='passwordConfirm' 
                name='passwordConfirm'
                onChange={onChangeRegisterForm}
                value={passwordConfirm}
                >
                </Form.Control>
            </Form.Group>
            <Button variant='success' type='submit' className='register-btn-1'>Register</Button>
        </Form>
        <p>Đã có tài khoản ?
            <Link to='/login'>
                <Button variant='info' size='sm' className='ml-2 register-btn'>Login</Button>
            </Link>
        </p>
        </>
    );
}

export default RegisterForm;