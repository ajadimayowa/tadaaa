import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { KycStepOne, KycStepTwo } from "../../components/multi-parts/kyc-steps";
import { doUserKyc } from "../../app/controllers/user";





const KycPage = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
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
        idType: '',
        idNumber: '',
        idDoc:'',
        profilePic:null,
        secondaryAddress:'',
        primaryAddress: '',
        username: username
    })

    const handleSubmit = async (data: any, lastPage: boolean) => {
        if (lastPage) {
            try {
                setLoading(true);
            console.log({ sending: data })
            const formData = new FormData()
            formData.append('idDoc',data.idDoc)
            formData.append('idNumber',data.idNumber)
            formData.append('idType',data.idType)
            formData.append('primaryAddress',data.primaryAddress)
            formData.append('secondaryAddress',data.secondaryAddress)
            formData.append('profilePic',data.profilePic)
            formData.append('username',data.username)
            const res = await doUserKyc(formData);
            if (res.success) {
                setLoading(false);
                toast.success('KYC completed succesfully')
                navigate(-1)
            }else {
                toast.error('Unauthorised user!');
                navigate('/');
                setLoading(false);
            }
            return
            } catch (error:any) {
                setLoading(false)
                console.log(error.message)
                toast.error('Network error!');
            }
        } else {
            setInitialValue(prevData => ({ ...prevData, ...data }));
            setCurrentStep(prevStep => (prevStep + 1))
        }

    }

    const handlePrevious = (data: any) => {
        setInitialValue(prevData => ({...data, ...prevData }));
        setCurrentStep(prevStep => (prevStep - 1))

    }


    const creationSteps = [
        <KycStepOne data={initialValue} handleStepDataSubmit={handleSubmit} />,
        <KycStepTwo data={initialValue} 
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

export default KycPage