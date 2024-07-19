import React from "react";
import { Button } from "react-bootstrap";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';

export const ServiceStepOne: React.FC<any> = ({ handleStepDataSubmit, data }) => {
    const handleSubmit = (val: any) => {
        handleStepDataSubmit(val)
    }

    const valSchema = yup.object({
        title: yup.string().min(3).required().label('Title'),
        description : yup.string().min(10).required('Give a brief description').label('Description'),
        category : yup.string().min(10).required('Select a category').label('Category'),
    })


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={data}
        validationSchema={valSchema}
        >
            {
                ({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit} className="gap-0">
                        {
                            <>
                                {/* <p
                                    className="fw-bold"
                                    role="button"
                                    onClick={() => { handleResetData }}
                                >Back</p> */}
                                <h5 className="fw-bold">
                                    Create a new service
                                </h5>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Title
                                </label>
                                <div>
                                    <Field
                                        value={values.title}
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='title' name='title' />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Description
                                </label>
                                <div>
                                    <Field
                                        value={values.description}
                                        placeholder='Brief description max 100 words'
                                        as="textarea"
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='description' name='description' />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>



                                <label className="d-flex justify-content-between mt-3 w-100 fw-bold" htmlFor="password">
                                    Category

                                </label>
                                <div className="mt-1">

                                    <Field
                                        as="select"
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='category' name='category'>
                                        <option value={''}>Select</option>
                                        <option value={'Fashion & Tailoring'}>Fashion & Tailoring</option>
                                        <option value={'Resumee & Article Writting'}>Resumee & Article Writting</option>
                                        <option value={'Programing & Tech'}>Programing & Tech</option>
                                        <option value={'Delivery Business'}>Delivery Business</option>
                                        <option value={'Virtual Assistant'}>Virtual Assistant</option>
                                        <option value={'Presentation Design'}>Presentation Design</option>
                                        <option value={'Skit & Marketing Content'}>Skit & Marketing Content</option>
                                        <option value={'Other Services'}>Other Services</option>
                                    </Field>

                                    <ErrorMessage
                                        name="category"
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

export const ServiceStepTwo: React.FC<any> = ({ handleStepDataSubmit, data, finalPage, gotoPrev }) => {
   
    const handleSubmit = (val: any) => {
        handleStepDataSubmit(val, finalPage)
    }

    const handlePrev = (val: any) => {
        gotoPrev(val)
    }



    const valSchema = yup.object({
        proposedPay: yup.number().min(1000, 'Cannot be less than N1000').required('Tell us your price').label('Your price'),
        actualCost: yup.number().min(1000, 'Cannot be less than N1000').required('A rough estimation is fine').label('Market price'),
    })


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={data}
        validationSchema={valSchema}
        >
            {
                ({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit} className="gap-0">
                        {
                            <>
                                {/* <p
                                    className="fw-bold"
                                    role="button"
                                    onClick={() => { handleResetData }}
                                >Back</p> */}
                                <h5 onClick={handlePrev} className="fw-bold d-flex gap-2">
                                <i className="bi bi-arrow-left"></i>
                                    Prev
                                </h5>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    How much will you charge?
                                </label>
                                <div>
                                    <Field
                                    value={values.proposedPay}
                                        placeholder="(N)"
                                        type='number'
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='proposedPay' name='proposedPay' />
                                    <ErrorMessage
                                        name="proposedPay"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>

                                <label className="d-flex justify-content-between mt-3 w-100 fw-bold" htmlFor="password">
                                    How much is the market price?

                                </label>
                                <div className="mt-1">

                                    <Field
                                        placeholder="(N)"
                                        value={values.actualCost}
                                        type='number'
                                        className="rounded rounded-1 p-2 outline form-control-outline w-100 border border-1 border-grey"
                                        id='actualCost' name='actualCost' />

                                    <ErrorMessage
                                        name="actualCost"
                                        component="div"
                                        className="text-danger fw-medium" />
                                </div>
                                <p className="w-75 mt-5">
                                    As soon as this service is submitted, we will verify it and then connect you to people who need your services
                                </p>

                                <div className="mt-3 w-100 text-center">
                                    <Button
                                        type='submit'
                                        className="outline-0 w-100 border border-0 p-2  bg-dark text-light mt-3"
                                    >Submit</Button>
                                </div>


                            </>
                        }
                    </Form>
                )
            }
        </Formik>
    )

}

export const ServiceStepThree: React.FC<any> = ({ handleStepDataSubmite, data, handleResetData }) => {
    // const [secure, setSecure] = useState(false);


    return (
        <Formik
            onSubmit={handleStepDataSubmite}
            initialValues={data}
        >
            {
                ({ handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit} className="gap-0">
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

export default { ServiceStepOne, ServiceStepTwo, ServiceStepThree }