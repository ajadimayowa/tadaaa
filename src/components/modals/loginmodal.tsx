import React from "react";
import { useState } from "react";
import { Modal} from "react-bootstrap";
import style from '../modals/signupmodal.module.css'
import { ForgotPasswordComponent, LoginUserComponent } from "../multi-parts/handle-user-auth";



const LoginModal: React.FC<any> = ({ on, off }) => {

    const [step,setStep] = useState(0);


    const pages :JSX.Element[]=[
    <LoginUserComponent off={()=>off()} switchToPass={()=>setStep(1)}/>,
    <ForgotPasswordComponent gotoPrev={()=>setStep(0)}/>
]


    // const navigate = useNavigate()
    // const [loading, setLoading] = useState(false);




    // const [userData, setUserData] = useState({

    //     email: '',
    //     password: '',

    // });

    // const stepOneValSchema = yup.object({
    //     email: yup.string().email().required('Email is required').label('Email'),
    //     password: yup.string().required('Password is required'),
    // })




    // const handleLogin = async (userCred: any) => {
    //     setLoading(true);
    //     try {
    //         const res = await loginUser(userCred);
    //         if (res.success) {
    //             let loggedInUser = JSON.stringify(res.data.payload)
    //             localStorage.setItem('loggedInUser', loggedInUser)
    //             localStorage.setItem('userToken', res.data.userToken)
    //             setToken(res.data.userToken);
    //             navigate('/app', { replace: true });
    //             toast.success('Login successful');
    //             setLoading(false);
    //         }
    //          else {
    //             setLoading(false);
    //             toast.error('Invalid credentials!')
    //         }
    //     } catch (error: any) {
    //         console.log({serverError:error})
    //         toast.error('Network error!')
    //         setLoading(false);
    //         console.error('Operation failed:', error);
    //     }
    // }


    // const [secure, setSecure] = useState(false);

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
                                {
                                    pages[step]
                                }

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