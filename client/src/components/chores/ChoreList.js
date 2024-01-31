// import { useEffect, useState } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { getChores, deleteChore } from "../../managers/choreManager"
// import { Table, Button } from "reactstrap"
// import "./Chore.css"

// export const ChoreList = ({ loggedInUser }) => {
//     const [chores, setChores] = useState([])

//     const navigate = useNavigate()

//     const getAndSetChores = () => {
//         getChores().then(array => setChores(array))
//     }

//     useEffect(() => {
//         getAndSetChores()
//     }, [])

//     const handleDeleteBtn = (event, id) => {
//         event.preventDefault()

//         deleteChore(id).then(() => getAndSetChores())
//     }

//     const handleCreateChoreBtn = (event) => {
//         event.preventDefault()

//         navigate("create")
//     }

//     const handleEditBtn = (event, id) => {
//         event.preventDefault()

//         navigate(`${id}/edit`)
//     }


//     return (
//         <div className="chore-list">
//             <h2 className="chores">Chores</h2>
//             <Button color="success" onClick={handleCreateChoreBtn}>Create A New Chore</Button>
//             <Table>
//                 <thead>
//                     <tr className="detail-table">
//                         {/* <th>Id</th> */}
//                         <th>Name</th>
//                         <th>Description</th>
//                         <th></th>
//                         {/* <th>Due Date</th>
//                         <th>Status</th> */}
//                     </tr>
//                 </thead>
//                 <tbody className="detail-table">
//                     {chores.map((c) => {
//                         return (
//                             <tr key={c.id}>
//                                 {/* <td scope="row">{`${c.id}`}</td> */}
//                                 <td>{c?.name}</td>
//                                 <td>{c?.description}</td>
//                                 {/* <td>{c?.dueDate.slice(0, 10)}</td>
//                                 <td>{c?.status}</td> */}
//                                 <td>
//                                     {loggedInUser.roles.includes("Admin") ? (
//                                         <>
//                                          <Button
//                                                 color="secondary"
//                                                 onClick={event => handleEditBtn(event, c.id)}>
//                                                 Edit
//                                             </Button>
//                                             <Button
//                                                 color="secondary"
//                                                 onClick={event => handleDeleteBtn(event, c.id)}>
//                                                 Delete
//                                             </Button>
//                                             <Link to={`${c.id}`} className="btn btn-secondary mr-2">
//                                                 Details
//                                             </Link>
//                                         </>
//                                     ) : (
//                                         ""
//                                     )}
//                                 </td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </Table>
//         </div >
//     )
// }

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getChores, deleteChore } from "../../managers/choreManager";
import { Button, Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import "./Chore.css";

export const ChoreList = ({ loggedInUser }) => {
    const [chores, setChores] = useState([]);
    const navigate = useNavigate();

    const getAndSetChores = () => {
        getChores().then((array) => setChores(array));
    };

    useEffect(() => {
        getAndSetChores();
    }, []);

    const handleDeleteBtn = (event, id) => {
        event.preventDefault();

        deleteChore(id).then(() => getAndSetChores());
    };

    const handleCreateChoreBtn = (event) => {
        event.preventDefault();

        navigate("create");
    };

    const handleEditBtn = (event, id) => {
        event.preventDefault();

        navigate(`${id}/edit`);
    };

    return (
        <div className="chore-list">
            <h2 className="chores">Chores</h2>
            <Button color="secondary" onClick={handleCreateChoreBtn}>
                Create A New Chore
            </Button>
            <Row xs="1" sm="2" md="3">
                {chores.map((c) => (
                    <Col key={c.id} className="mb-4">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{c?.name}</CardTitle>
                                <p>{c?.description}</p>
                                <p>
                                    <Link to={`${c.id}`} className="btn btn-secondary mr-2">
                                        Details
                                    </Link>
                                    {loggedInUser.roles.includes("Admin") && (
                                        <>
                                            <Button
                                                color="secondary"
                                                onClick={(event) => handleDeleteBtn(event, c.id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                color="secondary"
                                                onClick={(event) => handleEditBtn(event, c.id)}
                                            >
                                                Edit
                                            </Button>
                                        </>
                                    )}
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
