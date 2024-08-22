import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { IService } from "../../interfaces/service";
import api from "../../app/controllers/api";
import { toast } from "react-toastify";

export const ServiceStepOne: React.FC<any> = ({ handleStepDataSubmit, data }) => {

    const navigate = useNavigate();
    const [services, setServices] = useState<IService[]>([]);
    const [refData, setRefData] = useState(false);

    const getServices = async (limit: number, page: number) => {
        const res = await api.get(`services?limit=${limit}&page=${page}`);
        if (res.data) {
            return { success: true, loading: false, data: res.data }
        } else {
            return { success: false, loading: false, error: res.statusText }
        }

    }

    const handleGetServices = async () => {
        const res = await getServices(10, 1)
        console.log(res)
        if (res.success) {
            setServices(res.data?.services);
            // setAllServicePageNumber(res.data.totalPages);
        } else {
            toast.error(res.error)
        }
    }

    useEffect(() => {
        handleGetServices()
    }, [refData])

    const handleSubmit = (val: any) => {
        handleStepDataSubmit(val);
        setRefData(!refData)
    }

    const valSchema = yup.object({
        title: yup.string().min(3).required().label('Title'),
        description: yup.string().min(10).required('Give a brief description').label('Description'),
        category: yup.string().required('Select a category').label('Category'),
    })


    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={data}
            validationSchema={valSchema}
        >
            {
                ({ handleSubmit, values }) => (
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
                                    Create a new Gig
                                </h5>

                                <label className="mt-3 fw-bold" htmlFor="userEmail">
                                    Title
                                </label>
                                <p>Give your gig a befiting title. i.e I will do graphics design.</p>
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
                                <p>Briefly description of your gig. max 100 words.</p>
                                <div>
                                    <Field
                                        value={values.description}
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
                                        {
                                            services.map((service: IService) => (
                                                <option value={service._id}>{service.title}</option>
                                            ))
                                        }
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

export const ServiceStepTwo: React.FC<any> = ({ handleStepDataSubmit, data, finalPage, gotoPrev, loading }) => {

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
                    <Form onSubmit={handleSubmit} className="gap-0 slide-form">
                        {
                            <>
                                {/* <p
                                    className="fw-bold"
                                    role="button"
                                    onClick={() => { handleResetData }}
                                >Back</p> */}
                                {/* <h5 onClick={handlePrev} className="fw-bold d-flex gap-2">
                                <i className="bi bi-arrow-left"></i>
                                    Prev
                                </h5> */}

                                <p
                                    className="fw-bold d-flex gap-2"
                                    role="button"
                                    onClick={handlePrev}
                                >
                                    <i className="bi bi-arrow-left"></i>
                                    Prev
                                </p>

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
                                        disabled={loading}
                                        className="outline-0 w-100 border border-0 p-2  bg-dark text-light mt-3"
                                    >{loading ? <Spinner size="sm" /> : 'Submit'}</Button>
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

export default { ServiceStepOne, ServiceStepTwo, ServiceStepThree }