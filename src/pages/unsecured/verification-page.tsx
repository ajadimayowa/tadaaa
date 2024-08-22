import { Button, Spinner } from "react-bootstrap";
// import manSit from '../../assets/pngs/man-sit.png';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "../../app/controllers/auth";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
const OtpVerificationPage = () => {
    const [searchParams]=useSearchParams();
    const email = searchParams.get('email')
    const otpCode = searchParams.get('otpCode');

    console.log({em:email,otp:otpCode});
    const[loading,setLoading] = useState(false)
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


    const navigate = useNavigate();


    const handleVerify = async ()=>{
            setLoading(true)
            // console.log(body);
            let payload = {url:'verify-otp',body:{email:email,otpCode:otpCode}}
            const res = await verifyUser(payload)
            // console.log({verifying:res})
            if(res.success){
                toast.success('Account verified! toggle side nav to login');
                setLoading(false)
                navigate('/')
            } else {
                toast.error(res.message)
                setLoading(false)
            }
                }

    useEffect(()=>{
        handleVerify()
    },[])
        return (
            <div className="d-flex flex-column gap-5 px-3 justify-content-between">


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
                                        <p className="fw-bold" role="button" onClick={() => navigate('/')}>Back</p>
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

export default OtpVerificationPage;