import React, { useEffect, useState } from "react";
import { deleteUser, getUserProfiles } from "../../managers/userProfileManager";
import { Card, Button, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./User.css";

export const UserProfileList = ({ loggedInUser }) => {
    const [userProfiles, setUserProfiles] = useState([]);
    const navigate = useNavigate();

    const getAndSetUserProfiles = () => {
        getUserProfiles().then(array => setUserProfiles(array));
    };

    useEffect(() => {
        getAndSetUserProfiles();
    }, []);

    const handleDeleteBtn = (event, id) => {
        event.preventDefault();
        deleteUser(id).then(() => getAndSetUserProfiles());
    };

    const handleCreateUserBtn = (event) => {
        event.preventDefault();
        navigate("create");
    };

    const handleUpdateBtn = (event, id) => {
        event.preventDefault();
        navigate(`${id}/edit`);
    };

    return (
        <div className="user-list">
            <h2 className="users">Users</h2>
            <Button onClick={handleCreateUserBtn} className="mt-3">
                Add User
            </Button>
            <Row xs="1" sm="2" md="3" lg="4">
                {userProfiles.map((p) => (
                    <Col key={p.id} className="mb-4">
                        <Card body className="card">
                            <h5>{`${p?.firstName} ${p?.lastName}`}</h5>
                            <p>{p?.address}</p>
                            <p>{p?.email}</p>
                            <Link to={`${p.id}`} className="btn btn-secondary mr-2">
                                Details
                            </Link>
                            {loggedInUser.roles.includes("Admin") && (
                                <div className="d-flex flex-column">
                                    <Button
                                        onClick={(event) => handleDeleteBtn(event, p.id)}
                                        className="mr-2"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={(event) => handleUpdateBtn(event, p.id)}
                                        className="mr-2"
                                    >
                                        Edit
                                    </Button>
                                   
                                </div>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
            
        </div>
    );
};

export default UserProfileList;

//btn-outline-primary 