import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

export const KycStepOne: React.FC<any> = ({ handleStepDataSubmit, data }) => {
   
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    // const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (event: any, setFieldValue: any) => {
        console.log(event)
        const file = event.currentTarget.files[0];

        if (file) {
            // let path = URL.createObjectURL(file)
            setFileName(file.name);
            // setFileUrl(path);
            setFieldValue('idDoc', file);
        }
    };

    const handleSubmit = (val: any) => {
        
        handleStepDataSubmit(val)
    }

    const valSchema = yup.object({
        idType : yup.string().required('Select an ID Type').label('ID Type'),
        idNumber: yup.string().min(3).required('Cannot be empty').label('ID Number'),
        // idDoc: yup.string().min(3).required('Upload a Doc').label('ID Doc'),
        // description : yup.string().min(10).required('Give a brief description').label('Description'),
        
    })


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={data}
        validationSchema={valSchema}
        >
            {
                ({ handleSubmit, values,setFieldValue }) => (
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                 <p
                                            className="fw-bold d-flex gap-2"
                                            role="button"
                                            onClick={() => 
                                            navigate(-1)
                                            }
                                        >
                                            <i className="bi bi-arrow-left"></i>
                                            Back
                                        </p>
                                <h5 className="fw-bold">
                                    Complete your KYC
                                </h5>
                                <p>Step 1 of 2</p>

                                <label className="d-flex justify-content-between mt-3 w-100 fw-bold" htmlFor="password">
                                   Select ID Type
                                </label>
                                <div className="mt-1">

                                    <Field
                                        as="select"
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='idType' name='idType'>
                                        <option value={''}>Select</option>
                                        <option value={'nin'}>NIN</option>
                                        <option value={'votersCard'}>Voters card</option>
                                        <option value={'passport'}>Passport</option>
                                        
                                    </Field>

                                    <ErrorMessage
                                        name="idType"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    ID Number
                                </label>
                                <p>Type in selected ID type number</p>
                                <div>
                                    <Field
                                        value={values.title}
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='idNumber' name='idNumber' />
                                    <ErrorMessage
                                        name="idNumber"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Upload ID Document(optional)
                                </label>
                                <p>Should be a jpg,jpeg or png.</p>
                                 <div>
                                   <div className="d-flex align-items-center gap-2">
                                        <label htmlFor="idDoc" className="p-3 rounded bg-light border border-primary w-25 text-center text-primary fs-1">+</label>
                                        <p>{fileName}</p>
                                        </div>
                                        <input 
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                        type="file" name="idDoc" id="idDoc" style={{display:"none"}}/>
                                    <ErrorMessage
                                        name="docUpload"
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
    )

}

export const KycStepTwo: React.FC<any> = ({ handleStepDataSubmit, data, finalPage, gotoPrev, loading }) => {
    const [fileName, setFileName] = useState('');
    // const [fileUrl, setFileUrl] = useState('');
   
    const handleSubmit = (val: any) => {
      
        handleStepDataSubmit(val, finalPage)
    }

    const handlePrev = (val: any) => {
        gotoPrev(val)
    }
    const handleFileChange = (event: any, setFieldValue: any) => {
        console.log(event)
        const file = event.currentTarget.files[0];

        if (file) {
            // let path = URL.createObjectURL(file)
            setFileName(file.name);
            // setFileUrl(path);
            setFieldValue('profilePic', file);
        }
    };


    const valSchema = yup.object({
        primaryAddress: yup.string().min(10, 'Cannot be less than 10').required('Cannot be empty').label('Primary Address'),
        secondaryAddress: yup.string().min(10, 'Cannot be less than 10').required('Cannot be empty').label('Secondary Address'),
        profilePic: yup.mixed()
            .required('A file is required')
            .test('fileType', 'Only Jpegs and  files are accepted', (value: any) => {
                return value ;
            }),
    })


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={data}
        validationSchema={valSchema}
        >
            {
                ({ handleSubmit, values,setFieldValue }) => (
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                {/* <p
                                    className="fw-bold"
                                    role="button"
                                    onClick={() => { handleResetData }}
                                >Back</p> */}
                                <div className="d-flex w-100 justify-content-between">
                                    <div>
                                    <p
                                            className="fw-bold d-flex gap-2"
                                            role="button"
                                            onClick={handlePrev}
                                        >
                                            <i className="bi bi-arrow-left"></i>
                                            Prev
                                        </p>
                                    </div>
                                    <div>
                                        <>
                                        <h5 className="fw-bold">
                                    Complete your KYC
                                </h5>
                                <p>Step 2 of 2</p>
                                        </>
                                    </div>
                                </div>
                                

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Upload Profile Pic.
                                </label>
                                <p>Should be a jpg,jpeg or png.</p>
                                <div>
                                   <div className="d-flex align-items-center gap-2">
                                        <label htmlFor="profilePic" className="p-3 rounded bg-light border border-priamry w-25 text-center text-primary fs-1">+</label>
                                        <p>{fileName}</p>
                                        </div>
                                        <input 
                                        onChange={(event) => handleFileChange(event, setFieldValue)}
                                        type="file" name="profilePic" id="profilePic" style={{display:"none"}}/>
                                    <ErrorMessage
                                        name="profilePic"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Primary Address
                                </label>
                                <p>Kindly tell us your primary address i.e Office address</p>
                                <div>
                                 <Field
                                        value={values.description}
                                        as="textarea"
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='primaryAddress' name='primaryAddress' />
                                        
                                    <ErrorMessage
                                        name="primaryAddress"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Secondary Address
                                </label>
                                <p>Kindly tell us your seconday address i.e address for pickups</p>
                                <div>
                                 <Field
                                        value={values.description}
                                        as="textarea"
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='secondaryAddress' name='secondaryAddress' />
                                        
                                    <ErrorMessage
                                        name="secondaryAddress"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>
                                <p className="w-75 mt-2">
                                    As soon as this service is submitted, we will verify it and then connect you to people who need your services
                                </p>

                                <div className="mt-3 w-100 text-center">
                                    <Button
                                        type='submit'
                                        disabled={loading}
                                        className="outline-0 w-100 border border-0 p-2  bg-dark text-light mt-3"
                                    >{loading?<Spinner size="sm"/> : 'Submit'}</Button>
                                </div>


                            </>
                        }
                    </Form>
                )
            }
        </Formik>
    )

}

export const KycStepThree: React.FC<any> = ({ handleStepDataSubmite, data, handleResetData }) => {
    // const [secure, setSecure] = useState(false);


    return (
        <Formik
            onSubmit={handleStepDataSubmite}
            initialValues={data}
        >
            {
                ({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                <p
                                    className="fw-bold"
                                    role="button"
                                    onClick={() => { handleResetData }}
                                >Back</p>
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
    )

}

export default { KycStepOne, KycStepTwo, KycStepThree }