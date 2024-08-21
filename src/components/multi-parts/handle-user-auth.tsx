import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../app/controllers/auth";
import { setToken } from "../../app/controllers/api";
import { toast } from "react-toastify";

export const LoginUserComponent: React.FC<any> = ({ off, switchToPass }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(false);

    const initialValues = {

        email: '',
        password: '',

    }

    const stepOneValSchema = yup.object({
        email: yup.string().email().required('Email is required').label('Email'),
        password: yup.string().required('Password is required'),
    })

    const handleLogin = async (userCred: any) => {
        setLoading(true);
        try {
            const res = await loginUser(userCred);
            if (res.success) {
                let loggedInUser = JSON.stringify(res.data.payload)
                localStorage.setItem('loggedInUser', loggedInUser)
                localStorage.setItem('userToken', res.data.userToken)
                setToken(res.data.userToken);
                navigate('/dashboard', { replace: true });
                toast.success('Login successful');
                setLoading(false);
            }
            else {
                setLoading(false);
                toast.error('Invalid credentials!')
            }
        } catch (error: any) {
            console.log({ serverError: error })
            toast.error('Network error!')
            setLoading(false);
            console.error('Operation failed:', error);
        }
    }

    // const handleSubmit = (val: any) => {

    //     handleStepDataSubmit(val)
    // }

    // const valSchema = yup.object({
    //     title: yup.string().min(3).required().label('Title'),
    //     description: yup.string().min(10).required('Give a brief description').label('Description'),
    //     category: yup.string().min(10).required('Select a category').label('Category'),
    // })


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={stepOneValSchema}
            onSubmit={handleLogin}
        >
            {
                ({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                <p
                                    className="fw-bold"
                                    role="button"
                                onClick={() =>{off()}}
                                >Back</p>
                                <h5 className="fw-bold">
                                    Login with your email
                                </h5>
                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Email
                                </label>
                                <div>
                                    <Field

                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='email' name='email' />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>



                                <label className="d-flex justify-content-between mt-3 w-100 fw-bold" htmlFor="password">
                                    Password
                                    {
                                        secure ? < i className="bi bi-eye-slash-fill px-3" onClick={() => { setSecure(!secure) }}></i> :
                                            < i className="bi bi-eye-fill px-3" onClick={() => { setSecure(!secure) }}></i>
                                    }

                                </label>
                                <div className="mt-1">

                                    <Field
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='password'

                                        name='password' type={secure ? 'password' : 'text'} />
                                    <div className="d-flex  justify-content-between text-end">
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="text-danger fw-medium" />
                                        <label
                                        onClick={switchToPass}
                                         className="text-end" role="button" style={{ fontSize: '0.7em' }}>
                                            Forgot password?
                                        </label>

                                    </div>


                                </div>

                                <div className="mt-3 w-100 text-center">
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        className="outline-0 w-100 border border-0  bg-dark text-light"
                                    >{
                                            loading ? <Spinner size="sm" /> : 'Login'
                                        }</Button>
                                </div>


                            </>
                        }
                    </Form>

                )
            }
        </Formik>
    )

}

export const ForgotPasswordComponent: React.FC<any> = ({ gotoPrev }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    // const [secure, setSecure] = useState(false);

    const initialValues = {

        email: ''

    }

    const stepOneValSchema = yup.object({
        email: yup.string().email().required('Email is required').label('Email')
    })

    const handleLogin = async (userCred: any) => {
        setLoading(true);
        try {
            const res = await loginUser(userCred);
            if (res.success) {
                let loggedInUser = JSON.stringify(res.data.payload)
                localStorage.setItem('loggedInUser', loggedInUser)
                localStorage.setItem('userToken', res.data.userToken)
                setToken(res.data.userToken);
                navigate('/app', { replace: true });
                toast.success('Login successful');
                setLoading(false);
            }
            else {
                setLoading(false);
                toast.error('Invalid credentials!')
            }
        } catch (error: any) {
            console.log({ serverError: error })
            toast.error('Network error!')
            setLoading(false);
            console.error('Operation failed:', error);
        }
    }

    // const handleSubmit = (val: any) => {

    //     handleStepDataSubmit(val)
    // }

    // const valSchema = yup.object({
    //     title: yup.string().min(3).required().label('Title'),
    //     description: yup.string().min(10).required('Give a brief description').label('Description'),
    //     category: yup.string().min(10).required('Select a category').label('Category'),
    // })


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={stepOneValSchema}
            onSubmit={handleLogin}
        >
            {
                ({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                <p
                                    className="fw-bold"
                                    role="button"
                                onClick={gotoPrev}
                                >Back</p>
                                <h5 className="fw-bold">
                                Reset password
                                </h5>
                                <p>
                                Enter your email address and we'll send you a link to reset your password.
                                </p>
                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Email
                                </label>
                                <div>
                                    <Field

                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='email' name='email' />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <div className="mt-3 w-100 text-center">
                                    <Button
                                        disabled={loading}
                                        type="submit"
                                        className="outline-0 w-100 border border-0  bg-dark text-light"
                                    >{
                                            loading ? <Spinner size="sm" /> : 'Reset password'
                                        }</Button>
                                </div>


                            </>
                        }
                    </Form>

                )
            }
        </Formik>
    )

}

export default { LoginUserComponent, ForgotPasswordComponent}