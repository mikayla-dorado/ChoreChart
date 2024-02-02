import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChoreById, updateChore } from "../../managers/choreManager"
import { getUserProfiles } from "../../managers/userProfileManager"
import { getRoomsById } from "../../managers/roomManager"
import { Table, Button, Form, FormGroup, Label, Input } from "reactstrap"
import { createComment } from "../../managers/commentManager"


export const ChoreDetails = () => {
    const [chores, setChores] = useState([])
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])
    const [comment, setComment] = useState("");

    const { id } = useParams();
    console.log("ID from URL:", id);
    const navigate = useNavigate()


    useEffect(() => {
        getChoreById(id).then(array => {
            setChores(array)
            console.log(chores)
        })
    }, [id])


    useEffect(() => {
        getUserProfiles().then(array => setUsers(array))
    }, [])


    useEffect(() => {
        getRoomsById(id).then(array => {
            setRooms(array)
        })
    }, [id])


    // const handleCommentSubmit = (e) => {
    //     e.preventDefault();

    //     if (chores.length === 0) {
    //         console.error("No chore found.");
    //         return;
    //       }

    //     // Include necessary chore details along with the comment
    //     const updatedChore = {
    //         ...chores[0],
    //         comment: comment,
    //     };

    //     // Call your manager function to update the chore with the new comment
    //     // createComment(updatedChore.id, comment).then(() => {
    //     //     // Optionally, you can refresh the chore details after adding a comment
    //     //     getChoreById(id).then((updatedChore) => {
    //     //         setChores([updatedChore]);
    //     //         setComment(""); // Clear the comment input field
    //     //     });
    //     // });
    //     createComment(updatedChore.id, comment).then(() => {
    //         // Optionally, you can refresh the chore details after adding a comment
    //         getChoreById(updatedChore.id).then((updatedChore) => {
    //           setChores([updatedChore]); // Update the state with the new chore
    //           setComment(""); // Clear the comment input field
    //         });
    //       });
          
    //};


    return (
        <div className="chore-list">
            <h2 className="chore">Chore Details</h2>
            <Table>
                <thead className="detail-table">
                    <tr>
                        {/* <th>Id</th> */}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Room</th>
                        <th>Assigned User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={chores.id} className="detail-table">
                        {/* <td scope="row">{`${chores.id}`}</td> */}
                        <td>{chores?.name}</td>
                        <td>{chores?.description}</td>
                        <td>{chores?.dueDate?.slice(0, 10)}</td>
                        <td>{chores?.status}</td>
                        <td>
                            {chores.userChores &&
                                chores.userChores.map((uc) => (
                                    <div key={uc.id}>
                                        {uc.roomId ? (
                                            <span>
                                                {uc.room?.name} - {uc.room?.location}
                                            </span>
                                        ) : (
                                            <span>Not Assigned</span>
                                        )}
                                    </div>
                                ))}
                        </td>
                        <td>
                            {chores.userChores &&
                                chores.userChores.map((uc) => (
                                    <div key={uc.id}>
                                        {uc.userProfile &&
                                            `${uc.userProfile.firstName} ${uc.userProfile.lastName}`}
                                    </div>
                                ))}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table>
                <thead className="detail-table">
                    <tr key={chores.id}>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody className="detail-table">
                    <tr key={chores.id}>
                        <td>{chores?.comment}</td>
                    </tr>
                </tbody>
            </Table>
            {/* <Form onSubmit={handleCommentSubmit}>
                <FormGroup>
                    <Label for="comment">Add Comment:</Label>
                    <Input
                        type="textarea"
                        name="comment"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </FormGroup>
                <Button type="submit">Submit Comment</Button>
            </Form> */}
        </div>
    )
}