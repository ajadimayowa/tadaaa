import { useState } from "react";
import { ServiceStepOne, ServiceStepTwo } from '../../components/multi-parts/create-service';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createNewGig} from "../../app/controllers/auth";





const CreateServicePage = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const { userId } = useParams();
    


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
        userId: userId
    })

    const handleSubmit = async (data: any, lastPage: boolean) => {
        if (lastPage) {
           try {
            setLoading(true);
            // console.log({ sending: data })
            const res = await createNewGig(data);
            if (res.data.success) {
                setLoading(false);
                toast.success('Service created succesfully')
                navigate(-1)
            } else {
                toast.error('Error creating gig');
                navigate('/');
                setLoading(false);
            }
           } catch (error) {
            console.log(error);
            setLoading(false);
           }
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
        <ServiceStepTwo data={initialValue} 
        gotoPrev={handlePrevious} 
        loading={loading}
        handleStepDataSubmit={handleSubmit} finalPage={true} />,
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