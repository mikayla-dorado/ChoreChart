// import { useEffect, useState } from "react"
// import { deleteUser, getUserProfileById, getUserProfiles } from "../../managers/userProfileManager"
// import { Table, Button, Card, Row, Col } from "reactstrap"
// import { Link, useNavigate } from "react-router-dom"
// import "./User.css"

// export const UserProfileList = ({ loggedInUser }) => {
//     const [userProfiles, setUserProfiles] = useState([])
//     const navigate = useNavigate()

//     const getAndSetUserProfiles = () => {
//         getUserProfiles().then(array => setUserProfiles(array))
//     }

//     useEffect(() => {
//         getAndSetUserProfiles()
//     }, [])

//     const handleDeleteBtn = (event, id) => {
//         event.preventDefault()

//         deleteUser(id).then(() => getAndSetUserProfiles())
//     }

//     const handleCreateUserBtn = (event) => {
//         event.preventDefault()
//         navigate("create")
//     }

//     const handleUpdateBtn = (event, id) => {
//         event.preventDefault()
//         navigate(`${id}/edit`)
//     }

//     return (
//         <div>
//             <h2 className="users">Users</h2>
//             <Table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {userProfiles.map((p) => (
//                         <tr key={p.id}>
//                             <th scope="row">{`${p?.firstName} ${p?.lastName}`}</th>
//                             <td>{p?.address}</td>
//                             <td>{p?.email}</td>
//                             <td>
//                                 <Link to={`${p.id}`}>
//                                     Details
//                                 </Link>
//                             </td>
//                             <td>
//                                 {loggedInUser.roles.includes("Admin") ? (
//                                     <>
//                                         <Button
//                                             color="danger"
//                                             onClick={event => handleDeleteBtn(event, p.id)}>
//                                             Delete
//                                         </Button>
//                                         <Button
//                                             color="success"
//                                             onClick={event => handleUpdateBtn(event, p.id)}>
//                                             Edit
//                                         </Button>
//                                     </>
//                                 ) : (
//                                     ""
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Button color="success" onClick={handleCreateUserBtn}>Add User</Button>
//         </div>
//     )
// }

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
        <div>
            <h2 className="users">Users</h2>
            <Row xs="1" sm="2" md="3" lg="4">
                {userProfiles.map((p) => (
                    <Col key={p.id} className="mb-4">
                        <Card body>
                            <h5>{`${p?.firstName} ${p?.lastName}`}</h5>
                            <p>{p?.address}</p>
                            <p>{p?.email}</p>
                            <Link to={`${p.id}`} className="btn btn-outline-primary mr-2">
                                Details
                            </Link>
                            {loggedInUser.roles.includes("Admin") && (
                                <>
                                    <Button
                                        color="danger"
                                        onClick={(event) => handleDeleteBtn(event, p.id)}
                                        className="mr-2"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        color="success"
                                        onClick={(event) => handleUpdateBtn(event, p.id)}
                                    >
                                        Edit
                                    </Button>
                                </>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
            <Button color="success" onClick={handleCreateUserBtn} className="mt-3">
                Add User
            </Button>
        </div>
    );
};

export default UserProfileList;
