
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGigs } from "../../app/routes/gig";
import { IGig } from "../../interfaces/gig";
import { Card, Spinner } from "react-bootstrap";
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
    return (
        <div className="gap-5 px-3">
            <div className="w-100 d-flex justify-content-center">
                {
                    loading ? <Spinner /> :
                        <div className="d-flex gap-3 flex-wrap">
                            {gigs.length >= 0 && gigs.map((gig: IGig, index: number) => (
                                <div key={index} className="d-flex flex-column align-items-center gap-2"
                                    style={{ minWidth: '10em', maxHeight: '15em', minHeight: '15em' }}>
                                    <Card className="shadow-sm border-0"
                                        style={{ minWidth: '10em', minHeight: '14em', backgroundColor: "red" }}>
                                        <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                            {/* <i className={` ${gig.basePrice}`} style={{ fontSize: '2em' }}></i> */}

                                            <p className="niramit-semibold text-center"
                                                style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>{gig.gigTitle}</p>
                                        </Card.Body>
                                    </Card>

                                </div>
                                // <p>hi</p>

                            ))}
                            {
                              gigs.length <= 0  && <p className="fw-bold">No Data Available</p>
                            }
                        </div>
                }
            </div>



        </div>
    )

}

export default CategoryViewPage;