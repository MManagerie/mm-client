/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { listInfo, mainOne, mainBody } from "./StatusRequest.styles";

const StatusRequest = () => {
    const [statusRequest, setStatusRequest] = useState([]);
    const [, setErrorMessage] = useState();
    
    const getPetUpForAdoption = async () => {
        try {
            const url = "https://mm-ser.herokuapp.com/api/petUpForAdoption";
            let result = await axios.get(url)
            if(result.status === 200){
                setStatusRequest(result.data.result);
            } 
        }
        catch(err){
            console.log(err)
            setErrorMessage(err.message)
        }
        
    }
    useEffect(() => {
       getPetUpForAdoption()
    }, [setErrorMessage]);

    return (
        <div>
            <div css={listInfo}>
                {statusRequest.map((e) => (
                    <div key={statusRequest}>
                        <Card>
                            <Card.Header>
                                <b>{e.idPet.petName}</b> - <span></span>
                            </Card.Header>
                            <Card.Body css={mainBody}>
                                <Row>
                                    <Col css={mainOne}>
                                        <img
                                            src={e.idPet.image}
                                            alt="pet image"
                                        />
                                    </Col>
                                    <Col>
                                        <p>Name : {e.idPet.petName}</p>
                                        <p>Breed : </p>
                                        <p>Color : </p>
                                        <p>Age : {e.idPet.age}</p>
                                        <p>Size : {e.idPet.size}</p>
                                    </Col>
                                    <Col>
                                        <p>Weight : {e.idPet.weight}</p>
                                        <p>Gender : {e.idPet.gender}</p>
                                        <p>PetId : {e.idPet._id}</p>
                                        <br />
                                        <h5>Status:{e.status}</h5>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusRequest;
