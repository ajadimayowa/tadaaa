
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('loggedInUser') || ''
    const username = JSON.parse(user).userName

    // const [addTask, setAddTask] = useState(false)
    const currentServicePopular = 0;
    const porpularServices = [
        {
            category: 'all-service',
            gigs: [
                { title: 'Fashion & Tailoring', icon: 'bi bi-scissors', serviceId: '1', color: '#071952' },
                { title: 'Software Development', icon: 'bi bi-pc-display-horizontal', serviceId: '2', color: '#FFB200' },
                { title: 'Graphics Design', icon: 'bi bi-palette', serviceId: '4', color: '#1679AB' },
                { title: 'Delivery Service', icon: 'bi bi-bicycle', serviceId: '5', color: '#3FA2F6' },
                { title: 'Fashion & Tailoring', icon: 'bi bi-scissors', serviceId: '1', color: '#EB5B00' },
                { title: 'Software Development', icon: 'bi bi-pc-display-horizontal', serviceId: '2', color: '#E4003A' },
                { title: 'Graphics Design', icon: 'bi bi-palette', serviceId: '4', color: '#B60071' },

            ]
        },
    ]
    return (
        <div className="container-fluid w-100">
            <div className="d-flex justify-content-center w-100">
                <Card className="shadow-sm border-0 w-100"
                    style={{ minHeight: '20em', backgroundColor: '#fff' }}>
                    <Card.Body className="d-flex text-light gap-3 flex-column align-items-center justify-content-center">
                        <div className="px-2 gap-1 d-flex flex-column m-0 w-100 align-items-center rounded py-2"
                            style={{ backgroundColor: '#508C9B' }}
                        >
                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                <i className="bi bi-people-fill" style={{ fontSize: '1.7em' }}></i>
                                <h5 className="w-75">
                                    Connect with proffessionals
                                    arround your area.
                                </h5>
                            </div>

                            <p className="px-3">
                                Create a brief and get custom offers.
                            </p>

                        </div>

                        <div className="px-2 gap-1 d-flex flex-column m-0 w-100 align-items-center rounded py-2"
                            style={{ backgroundColor: '#17153B' }}
                        >
                            <div className="d-flex gap-3 align-items-center justify-content-center">
                                <i className="bi bi-card-checklist" style={{ fontSize: '1.7em' }}></i>

                                <h5 className="w-75">
                                    Tell us what you can do and how much you can do it for.
                                </h5>
                            </div>

                            <p className="px-3">
                                Create a list of services you can render.
                            </p>

                        </div>
                    </Card.Body>
                </Card>

            </div>

            <div className="w-100 text-center mt-3" >
                <Button
                    onClick={() => navigate(`create-service/${username}`)}
                    className="text-primary bg-light shadow-lg"
                    style={{ fontSize: '2em', height: '2em', width: '2em', borderRadius: '2em' }}>+</Button>
                <p className="mt-2 fw-bold">Add New</p>
            </div>

            {/* <div className="w-100 text-center mt-3" >
                <p className="fw-bold">No added item yet</p>
            </div> */}
            <div className="d-flex text-center p-3">

                <hr className="px-3 w-100" />
            </div>

            <h3 className=" mt-2">See Services you may need.</h3>
            <div className="d-flex gap-3 w-100 mt-3  align-items-center"
                id="services"
                style={{ overflowX: 'scroll', maxWidth: '100%' }}>
                {
                    porpularServices[currentServicePopular].gigs.map((serv: any, index) => (
                        <div key={index} className="d-flex flex-column align-items-center gap-2"
                            style={{ minWidth: '10em', maxHeight: '15em', minHeight: '15em' }}>
                            <Card className="shadow-sm border-0"
                                style={{ minWidth: '10em', minHeight: '14em', backgroundColor: serv.color }}>
                                <Card.Body className="d-flex text-light flex-column align-items-center justify-content-center">
                                    <i className={` ${serv.icon}`} style={{ fontSize: '2em' }}></i>

                                    <p className="niramit-semibold text-center"
                                        style={{ textWrap: 'wrap', wordWrap: 'break-word' }}>{serv.title}</p>
                                </Card.Body>
                            </Card>

                        </div>

                    ))
                }
            </div>
        </div>
    )

}
export default DashboardPage;