import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getChores, deleteChore } from "../../managers/choreManager";
import { Button, Card, Row, Col } from "reactstrap";
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

    //a user can only comment on a chore they are assigned to
    const handleCommentBtn = (event, choreId) => {
        event.preventDefault();

        
        // Check if the logged-in user is associated with the chore
        //by checking userprofile = logged in user, and that matches the chore selected
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

    const filteredChores = chores.filter((chore) => {
        const includesSearchTerm =
            !searchTerm || //this checks if searchTerm is null, if yes then all chores are still seen
            (chore?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (chore?.description || '').toLowerCase().includes(searchTerm.toLowerCase());

        return includesSearchTerm;
    })
    .sort((a, b) => {
        const dueDateA = new Date(a.DueDate);
        const dueDateB = new Date(b.DueDate);

        return dueDateA - dueDateB;
    });


    return (
        <div className="chore-list">
            <h2 className="chores">Chores</h2>
            {loggedInUser.roles.includes("Admin") && (
                <Button color="secondary" onClick={handleCreateChoreBtn}>
                    Create A New Chore
                </Button>
            )}
            <div className="searchbar">
            <input
                type="text"
                placeholder="Search Chores"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <Row xs="1" sm="2" md="3" lg="4">
                {filteredChores.map((c) => {
                    // checks if logged in user is assigned to that chore
                    //uses the some method to check if at least one element in the userChores array has a userProfileId that matches the loggedInUser.id
                    //if true, all info below is returned and shown
                    const isUserAssociated = c.userChores.some((userChore) => userChore.userProfileId === loggedInUser.id);

                    return (
                        <Col key={c.id} className="mb-4">
                            <Card>
                                <div className="d-flex flex-column p-3">
                                    <p>{c?.DueDate}</p>
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
