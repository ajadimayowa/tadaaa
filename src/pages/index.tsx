import React, { useState } from "react";
import SignupModal from "../components/modals/signupmodal";
import { Button, Card } from "react-bootstrap";
import TopBarUnAuth from "../components/bars/topbar";
import { Field, Formik } from "formik";
const HomePage = () => {
    const [regModal,setRegModal] = useState(false)

  
    return (
        <div>
            <TopBarUnAuth buttonClicked={()=>setRegModal(true)}/>
            <div className="w-100 d-flex justify-content-center mt-5">
                <Card className="rounded rounded-4 w-75 border border-0 shadow-sm bg-primary">
                    <Card.Body className="d-flex align-items-center py-4 gap-3 flex-column text-light justify-content-center">
                        <h3 className="fw-medium text-center lh-base">
                        Get your <span className="text-secondary">Productivity </span>  Level
                        <br/>
                        Up By A Wider Margin.
                        </h3>
                        <Formik
                        initialValues={{name:''}}
                        onSubmit={()=>console.log('ok')}
                        >
                         <div className="w-100 d-flex justify-content-center">
                         <Field id='userSearch' name="userSearch" placeholder='Search services'
                        className="rounded-start-4 p-3 outline-0 form-control-outline w-50 border border-0 border-grey"
                        ></Field>
                        <Button className="bg-light rounded rounded-start-0 px-4">
                        <i className="bi bi-search"></i>
                        </Button>
                        </div> 
                        
                        </Formik>
                        Trusted By : Apple Microsoft
                    </Card.Body>
                </Card>

            </div>
            <SignupModal on={regModal} off={()=>setRegModal(false)}  />
                
        </div>
    )
}
export default HomePage;