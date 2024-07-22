import React from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import style from '../modals/signupmodal.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { loginUser } from "../../app/controllers/auth";
import { setToken } from "../../app/controllers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const LoginModal: React.FC<any> = ({ on, off }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);




    const [userData, setUserData] = useState({

        email: '',
        password: '',

    });

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
                navigate('/app', { replace: true });
                toast.success('Login successful');
                setLoading(false);
            }
             else {
                setLoading(false);
                toast.error('Invalid credentials!')
            }
        } catch (error: any) {
            console.log({serverError:error})
            toast.error('Network error!')
            setLoading(false);
            console.error('Operation failed:', error);
        }
    }


    const [secure, setSecure] = useState(false);

    return (
        <div>
            <Modal show={on} centered size="lg">

                <Modal.Body className="p-0 m-0 rounded-4">
                    <div className="d-flex  w-100 p-0 m-0  ">
                        <div
                            className={`rounded-start  p-0 m-0 justify-content-center align-items-center ${style.left}`}

                        >

                        </div>
                        <div

                            className={`p-4 m-0 ${style.right}`}
                        >

                            <div className="d-flex w-100 flex-column gap-5 justify-content-between">
                                <Formik
                                    initialValues={userData}
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
                                                            onClick={() => {
                                                                off(); setUserData({
                                                                    email: '',
                                                                    password: '',
                                                                })
                                                            }}
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
                                                                <label className="text-end" role="button" style={{ fontSize: '0.7em' }}>
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

                                <p className="text-center">
                                    We need funding. <br/>
                                   Kindly Click <a href="https://wa.me/2348166064166" target="_blank">here</a> to support us.
                                </p>
                            </div>

                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
export default LoginModal;