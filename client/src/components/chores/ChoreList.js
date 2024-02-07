import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getChores, deleteChore } from "../../managers/choreManager";
import { Button, Card, Row, Col, Input } from "reactstrap";
import "./Chore.css";

export const ChoreList = ({ loggedInUser }) => {
    const [chores, setChores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchByRoom, setSearchByRoom] = useState("");


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

    const handleCommentBtn = (event, choreId) => {
        event.preventDefault();

        // Check if the logged-in user is associated with the chore
        const isUserAssociated = chores.some((chore) =>
            chore.userChores.some((userChore) => userChore.userProfileId === loggedInUser.id && userChore.choreId === choreId)
        );

        if (isUserAssociated) {
            navigate(`${choreId}/comment`);
        } else {
            // User is not associated with the chore, handle accordingly (e.g., show a message)
            console.log("You are not associated with this chore.");
        }
    };

    //this works
    const filteredChores = chores.filter((chore) => {

        const includesSearchTerm =
            !searchTerm ||
            (chore?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (chore?.description || '').toLowerCase().includes(searchTerm.toLowerCase());

        return includesSearchTerm
    });

    //the search by room does not work yet
    // const filteredUserChores = chores.userChore.filter((userChore) => {

    //     const includesRoom =
    //     !searchByRoom ||
    //     // (userChore.room?.name || '').toLowerCase().includes(searchByRoom.toLowerCase());

        
    //     chores.userChores.some((userChore) => {
    //         const roomName = userChore?.room?.name || '';
    //         return roomName.toLowerCase().includes(searchByRoom.toLowerCase());
    //     });

    //      return includesRoom
    // });

    

        return (
            <div className="chore-list">
                <h2 className="chores">Chores</h2>
                {loggedInUser.roles.includes("Admin") && (
                    <Button color="secondary" onClick={handleCreateChoreBtn}>
                        Create A New Chore
                    </Button>
                )}
                <input
                    type="text"
                    placeholder="Search Chores"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Search By Room"
                    value={searchByRoom}
                    onChange={(e) => setSearchByRoom(e.target.value)}
                />

                <Row xs="1" sm="2" md="3" lg="4">
                    {filteredChores.map((c) => {
                        // Declare isUserAssociated here
                        const isUserAssociated = c.userChores.some((userChore) => userChore.userProfileId === loggedInUser.id);

                        return (
                            <Col key={c.id} className="mb-4">
                                <Card>
                                    <div className="d-flex flex-column p-3">
                                        <h5>{c?.name}</h5>
                                        <p>{c?.description}</p>
                                        <Link to={`${c.id}`} className="btn btn-secondary">
                                            Details
                                        </Link>
                                        {isUserAssociated && (
                                            <Button
                                                color="secondary"
                                                onClick={(event) => handleCommentBtn(event, c.id)}
                                                className="mb-2"
                                            >
                                                Add A Comment
                                            </Button>
                                        )}
                                        {isUserAssociated && (
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
                                            </>
                                        )}
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    };
