import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getChores, deleteChore } from "../../managers/choreManager";
import { Button, Card, Row, Col } from "reactstrap";
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

    const handleCommentBtn = (event, choreId ) => {
        event.preventDefault()
        navigate(`${choreId}/comment`)
    }

    return (
        <div className="chore-list">
            <h2 className="chores">Chores</h2>
            {loggedInUser.roles.includes("Admin") && (
                <Button color="secondary" onClick={handleCreateChoreBtn}>
                    Create A New Chore
                </Button>
            )}
            <Row xs="1" sm="2" md="3" lg="4">
                {chores.map((c) => (
                    <Col key={c.id} className="mb-4">
                        <Card>
                            <div className="d-flex flex-column p-3">
                                <h5>{c?.name}</h5>
                                <p>{c?.description}</p>
                                <Link to={`${c.id}`} className="btn btn-secondary">
                                    Details
                                </Link>
                                {loggedInUser.roles.includes("Admin") && (
                                    <>
                                        <Button
                                            color="secondary"
                                            onClick={(event) => handleDeleteBtn(event, c.id)}
                                            className="mb-2"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={(event) => handleEditBtn(event, c.id)}
                                            className="mb-2"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            color="secondary"
                                            onClick={(event) => handleCommentBtn(event, c.id)}
                                            className="mb-2"
                                        >
                                            Add A Comment
                                        </Button>
                                    </>
                                )}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
