import { useState } from "react";
import { ServiceStepOne, ServiceStepTwo } from '../../components/multi-parts/create-service';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createNewService } from "../../app/controllers/auth";





const CreateServicePage = () => {
    const navigate = useNavigate()
    const { username } = useParams();

    // interface IService {
    //     title: string,
    //     description: string,
    //     proposedPay: string,
    //     category: string,
    //     actualCost: string,
    //     username: string
    // }
    // const [userServices, setUserServices] = useState<IService[]>();
    const [currentStep, setCurrentStep] = useState(0);

    const [initialValue, setInitialValue] = useState({
        title: '',
        description: '',
        proposedPay: 0,
        category: '',
        actualCost: 0,
        username: username
    })

    const handleSubmit = async (data: any, lastPage: boolean) => {
        if (lastPage) {
            // console.log({ sending: data })
            const res = await createNewService(data);
            if (res.data) {
                toast.success('Service created succesfully')
                navigate(-1)
            } else if(res.code == 400) {
                toast.error('Error creating service')
            } else if(res.code == 401) {
                toast.error('Unauthorised user!');
                navigate('/')
            }
            return
        } else {
            setInitialValue(prevData => ({ ...prevData, ...data }));
            setCurrentStep(prevStep => (prevStep + 1))
        }

    }

    const handlePrevious = (data: any) => {
        setInitialValue(prevData => ({ ...prevData, ...data }));
        setCurrentStep(prevStep => (prevStep - 1))

    }


    const creationSteps = [
        <ServiceStepOne data={initialValue} handleStepDataSubmit={handleSubmit} />,
        <ServiceStepTwo data={initialValue} gotoPrev={handlePrevious} handleStepDataSubmit={handleSubmit} finalPage={true} />,
        // <ServiceStepThree data={initialValue}/>
    ]

    return (
        <div className="container-fluid min-vh-100">

            <div className="mt-3">
                {
                    creationSteps[currentStep]
                }
            </div>
        </div>
    )

}

export default CreateServicePage