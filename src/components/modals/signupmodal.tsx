import React from "react";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import style from '../modals/signupmodal.module.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup';
import { createUser,verifyUser } from "../../app/controllers/auth";
import { toast } from "react-toastify";
import { generateVerificationLink, otpGenerator } from "../../helpers";



const SignupModal: React.FC<any> = ({ on, off, onLogin }) => {
 
    const [loading, setLoading] = useState(false);
    const [verify, setVerify] = useState(false);
    const [userEmail,setUserEmail]= useState('');




    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        userName: ''
    });

    const stepOneValSchema = yup.object({
        fullName: yup.string().min(3).required().label('Fullname'),
        email: yup.string().email().required('Email is required').label('Email'),
        password: yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
            .matches(/[a-z]/, 'Password must have at least one lowercase letter')
            .matches(/[0-9]/, 'Password must have at least one number')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must have at least one special character')
            .required('Password is required'),
    })

    const stepTwoValSchema = yup.object({
        userName: yup.string().min(3).required('Username is required').label('Username'),
        phoneNumber: yup.string().length(10).required().label('Phone Number'),
    })

    
        const stepOtpValSchema = yup.object({
            otp: yup.number()
                .typeError('OTP must be a number')
                .test(
                    'len',
                    'OTP must be exactly 6 digits',
                    (val:any) => val && val.toString().length === 6
                )
                .required('OTP is required'),
        });
        


    const [currentStep, setCurrentStep] = useState(0);

    const handleCreateUser = async (userCred: any) => {
        const otp=otpGenerator();
       const verifyLink = generateVerificationLink(userCred.email,otp)
        try {
            const res = await createUser({...userCred, otpCode:otp,verificationLink:verifyLink});
            console.log({seeUs:res});
            if (res.data?.success) {
                setLoading(false);
                toast.success('User created! Check your mail!! or login and verify later')
                setVerify(true)
            } 
            else {
                toast.error(res.data.message);
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false);
            toast.error('Network error, kindly retry')
            // console.error('Operation failed:', error.message);
        }
    }

    const handleNextStep = (newData: any, final: boolean) => {
        console.log(newData)
        if (final) {

            setLoading(true);
            setUserEmail(newData.email);
            handleCreateUser(newData)
            // console.log({ sending: newData })
            setUserData(prevData => ({ ...prevData, ...newData }));
        } else {
            setUserData(prevData => ({ ...prevData, ...newData }));
            setCurrentStep(prevStep => (prevStep + 1))
        }
    }

    const handlePrev = (newData: any) => {
        setUserData(prevData => ({ ...prevData, ...newData }));
        setCurrentStep(curr => curr - 1);
    }



    const StepOne: React.FC<any> = ({ data, next, offModal }) => {
        const [secure, setSecure] = useState(false);
        const handleSubmit = (val: any) => {
            next(val)
        }
        return (
            <div className="d-flex flex-column gap-5 justify-content-between">
                <Formik
                    initialValues={data}
                    validationSchema={stepOneValSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, handleSubmit }) => (
                            <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                                {
                                    <>



                                        <p
                                            className="fw-bold"
                                            role="button"
                                            onClick={() => {
                                                offModal();
                                                 setUserData({
                                                    fullName: '',
                                                    email: '',
                                                    password: '',
                                                    phoneNumber: '',
                                                    userName: '',
                                                })
                                            }}
                                        >
                                            <i className="bi bi-arrow-left"></i>
                                            Back
                                        </p>


                                        <h5 className="fw-bold">
                                            Continue with your email
                                        </h5>

                                        <label className="mt-3 fw-bold" htmlFor="userEmail">
                                            Fullname
                                        </label>
                                        <div>
                                            <Field
                                                value={values.fullName}

                                                className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                                id='fullName' name='fullName' />
                                            <ErrorMessage
                                                name="fullName"
                                                component="div"
                                                className="text-danger fw-medium" />
                                        </div>

                                        <label className="mt-3 fw-bold" htmlFor="userEmail">
                                            Email
                                        </label>
                                        <div>
                                            <Field
                                                value={values.email}
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
                                                id='password' name='password' type={secure ? 'password' : 'text'} />

                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-danger fw-medium" />
                                        </div>

                                        <div className="mt-3 w-100 text-center">
                                            <Button
                                                type='submit'
                                                className="outline-0 w-100 border border-0 p-2  bg-dark text-light"
                                            >Continue</Button>
                                        </div>


                                    </>
                                }
                            </Form>

                        )
                    }
                </Formik>

                <p>
                    By joining, you agree to Our Terms of Service and to occasionally receive emails from us.
                    Please read our Privacy Policy to learn how we use your personal data.
                </p>
            </div>
        )

    }

    const StepTwo: React.FC<any> = ({ data, next, prev, finalPage }) => {
        const handleSubmit = (val: any) => {
            next(val, finalPage)
        }
        return (
            <div className="d-flex flex-column gap-5 justify-content-between">


                <Formik
                    initialValues={data}
                    validationSchema={stepTwoValSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ handleSubmit, values }) => (
                            <Form onSubmit={handleSubmit} className="slide-form">
                                {
                                    <>
                                        <p className="fw-bold" role="button" onClick={() => prev(values)}>Back</p>
                                        <h5 className="fw-bold">
                                            Get your profile started
                                        </h5>
                                        <p>
                                            Add a username that's unique to you, this is how you'll appear to others.
                                            You can't change your username, so choose wisely.
                                        </p>
                                        <label className="mt-3 fw-bold" htmlFor="userEmail">
                                            Choose a username
                                        </label>
                                        <div>
                                            <Field
                                                value={values.userName}
                                                name='userName'
                                                id='userName'
                                                className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                            />

                                            <ErrorMessage
                                                name="userName"
                                                component="div"
                                                className="text-danger fw-medium" />
                                        </div>

                                        <label className="mt-3 fw-bold" htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <div>
                                            <Field
                                                value={values.phoneNumber}
                                                placeholder='E.g: 08166064166'
                                                type='number'
                                                name='phoneNumber'
                                                id='phoneNumber'
                                                className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                            />

                                            <ErrorMessage
                                                name='phoneNumber'
                                                component="div"
                                                className="text-danger fw-medium" />
                                        </div>
                                        {/* <Form.Label className="mt-4" htmlFor="email">
                                        Username
                                    </Form.Label>
                                    <Form.Control className="rounded rounded-1 py-2" id="email" /> */}

                                        <div className="mt-3 w-100 text-center">
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                className="outline-0 w-100 border border-0  bg-dark text-light"
                                            >{
                                                    loading ? <Spinner size="sm" /> : 'Submit'
                                                }</Button>
                                        </div>
                                    </>
                                }
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }

   
    const StepOtp: React.FC<any> = ({offModal}) => {
        const handleVerify = async (body:any)=>{
            setLoading(true)
            // console.log(body);
            let payload = {url:'verify-otp',body:{email:userEmail,otpCode:+body.otp}}
            const res = await verifyUser(payload)
            // console.log({verifying:res})
            if(res.success){
                toast.success('Account verified! You can login now.');
                setLoading(false)
                off()
                onLogin()
            } else {
                toast.error(res.message)
                setLoading(false)
            }
                }
        return (
            <div className="d-flex flex-column gap-5 justify-content-between">


                <Formik
                    initialValues={{ otp: null }}
                    validationSchema={stepOtpValSchema}
                    onSubmit={handleVerify}
                >
                    {
                        ({ handleSubmit, values }) => (
                            <Form onSubmit={handleSubmit} className="slide-form">
                                {
                                    <>
                                        <p className="fw-bold" role="button" onClick={() => {offModal(); onLogin()}}>Back</p>
                                        <h5 className="fw-bold">
                                            Verify your OTP
                                        </h5>
                                        <p>
                                            Enter the otp sent to your email.
                                        </p>
                                        <label className="mt-3 fw-bold" htmlFor="otp">
                                            Enter OTP
                                        </label>
                                        <div className="d-flex flex-column gap-2">
                                           
                                                    <>
                                                    <Field
                                               value={values.otp}
                                                type='number'
                                                name="otp"
                                                id="otp"
                                                className="rounded text-center rounded-1 p-2 outline form-control-outline border border-1 border-grey"
                                            />

                                            <ErrorMessage
                                                name="otp"
                                                component="div"
                                                className="text-danger fw-medium" />
                                                    </>
                                        </div>
                                        {/* <Form.Label className="mt-4" htmlFor="email">
                                        Username
                                    </Form.Label>
                                    <Form.Control className="rounded rounded-1 py-2" id="email" /> */}

                                        <div className="mt-3 w-100 text-center">
                                            <Button
                                                disabled={loading}
                                                type="submit"
                                                className="outline-0 w-100 border border-0  bg-dark text-light"
                                            >{
                                                    loading ? <Spinner size="sm" /> : 'Submit'
                                                }</Button>
                                        </div>
                                    </>
                                }
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }

    const steps: JSX.Element[] = [
        <StepOne data={userData} next={handleNextStep} offModal={off} />,
        <StepTwo data={userData} next={handleNextStep} prev={handlePrev} finalPage={true} />
    ]


    return (
        <div>
            <Modal show={on} centered size="lg">
                {/* <Modal.Header>
                    <div className="d-flex justify-content-between w-100">
                        <h5>Tada!</h5>
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                </Modal.Header> */}

                <Modal.Body className="p-0 m-0 rounded-4">
                    <div className="d-flex  w-100 p-0 m-0  ">
                        <div
                            className={`rounded-start  p-0 m-0 justify-content-center align-items-center ${style.left}`}

                        >

                        </div>
                        <div

                            className={`p-4 m-0 ${style.right}`}
                        >

                            {verify ? <StepOtp /> :
                                steps[currentStep] 
                                
                            }

                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}
export default SignupModal;