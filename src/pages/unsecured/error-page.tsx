import { Button } from "react-bootstrap";
import manSit from '../../assets/pngs/man-sit.png';
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="w-100 d-flex flex-column align-items-center min-vh-100 justify-content-center">
            <div className="w-100 justify-content-center d-flex flex-column align-items-center justify-content-center">
                <img src={manSit} alt="man sitting" height={300} />
                <h3 className="text-center">
                    Boss man, E Be like<br />
                    you don miss road o.
                    <br />

                </h3>

            </div>
            <Button
                onClick={() => navigate(-1)}
                variant="primary"
                className="w-50 mt-4 fw-bold text-light">Carry me go back</Button>
        </div>
    )

}

export default ErrorPage