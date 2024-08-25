
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGigs } from "../../app/routes/gig";
import { IGig } from "../../interfaces/gig";
import { Button, Card, Spinner } from "react-bootstrap";
import app1 from '../../assets/pngs/app1.jpg';
import app2 from '../../assets/pngs/app2.png';
import app3 from '../../assets/pngs/app3.jpg';
const CategoryViewPage = () => {
    const { id } = useParams();
    const [gigs, setGigs] = useState<IGig[]>([]);
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate();

    const handleGetCategoryGigs = async () => {
       try {
        setLoading(true)
        
        let payload = { id, limit: 30, page: 1 }
        const res = await getGigs(payload)
        console.log({here:res});
        if (res.data) {
            setGigs(res.data.data)
            setLoading(false)
        } else {
            setGigs([])
            setLoading(false)
        }
        
       } catch (error:any) {
        // toast.error(error.response.data.message)
        setLoading(false)
       }
    }

    useEffect(() => {
        handleGetCategoryGigs()
    }, [])

    const navigate = useNavigate()
    return (
        <div className="gap-5 p-3">
            <Button variant="outline rounded border border-1" onClick={()=>navigate(-1)}>Go back</Button>
            <div className="w-100 p-3">
                {
                    loading ? <div className="w-100 text-center"><Spinner /></div> :
                        <div className="d-flex gap-2 flex-wrap">
                            {gigs.length >= 0 && gigs.map((gig: IGig, index: number) => (
                                <div key={index} className="d-flex rounded shadow border border-1 w-100 p-3 flex-column  gap-2"
                                  >
                                    <div className="w-100 d-flex justify-content-between">
                                        <p className="p-0 m-0">{gig.gigTitle}</p>
                                        <i className="bi bi-heart"></i>
                                    </div>
                                    <p className="p-0 m-0">Gig By : {gig.creatorFullName}</p>
                                    <p className="p-0 m-0 fw-bold">Price : N{gig.basePrice}</p>
                                    <p className="p-0 m-0">Seller Contact : 0{gig.creatorPhoneNumber}</p>
                                    <div className="d-flex gap-2">
                                    <Card className="shadow-sm border-0 w-100"
                                        >
                                        <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                           <img src={app1} height={45}/>
                                        </Card.Body>
                                    </Card>
                                    <Card className="shadow-sm border-0 w-100"
                                        >
                                        <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                            {/* <i className={` ${gig.basePrice}`} style={{ fontSize: '2em' }}></i> */}

                                            <img src={app2} height={45}/>
                                        </Card.Body>
                                    </Card>
                                    <Card className="shadow-sm border-0 w-100"
                                        >
                                        <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                            {/* <i className={` ${gig.basePrice}`} style={{ fontSize: '2em' }}></i> */}

                                            <img src={app3} height={45}/>
                                        </Card.Body>
                                    </Card>

                                    </div>
                                    

                                </div>
                                // <p>hi</p>

                            ))}
                            {
                              gigs.length <= 0  && <p className="fw-bold">Only Software Development Services is available for now. Check it out.</p>
                            }
                        </div>
                }
            </div>



        </div>
    )

}

export default CategoryViewPage;