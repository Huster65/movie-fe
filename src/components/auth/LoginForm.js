import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Alert } from 'bootstrap';
import AlertMessage from '../layout/AlertMessage';
 

function LoginForm() {
    // context
    const {loginUser} = useContext(AuthContext)

    // router
    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm
    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        // tránh submit theo form html
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/dashboard')
            }else{
                setAlert({type: 'danger', message: loginData.message})
                setTimeout(() => setAlert(null), 3000)
            }
        } catch (error) {
            console.log(error);
        }

        
    }

    return ( <>
        <Form className='ny-4' onSubmit={login}>
        <AlertMessage info={alert} />
            <Form.Group>
                <Form.Control 
                    type='text' 
                    placeholder='username' 
                    name='username'
                    value={username}
                    onChange={onChangeLoginForm}
                    >
                </Form.Control>
            </Form.Group>

            <Form.Group className='password'>
                <Form.Control 
                    type='password' 
                    placeholder='password' 
                    name='password'
                    value={password}
                    onChange={onChangeLoginForm}
                    >
                </Form.Control>
            </Form.Group>

            <Button variant='success' type='submit'>Login</Button>

        </Form>
        <p>Bạn chưa có tài khoản ?
            <Link to='/register'>
                <Button variant='info' size='sm' className='ml-2 register-btn '>Register</Button>
            </Link>
        </p>
        </>
    );
}

export default LoginForm;