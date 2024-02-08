import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChoreById, getChores } from "../../managers/choreManager"
import { getUserProfiles } from "../../managers/userProfileManager"
import { getRoomsById } from "../../managers/roomManager"
import { Table, Button } from "reactstrap"
import { deleteComment } from "../../managers/commentManager"


export const ChoreDetails = ({ choreId }) => {
    const [chores, setChores] = useState([])
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])
    const [comment, setComment] = useState("");

    const { id } = useParams();
    const navigate = useNavigate()

    const getAndSetChores = () => {
        getChores().then((array) => setChores(array));
    };

    useEffect(() => {
        getAndSetChores();
    }, []);


    useEffect(() => {
        getChoreById(id).then(array => {
            setChores(array)
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


    const handleDeleteComment = (event, choreId) => {
        event.preventDefault();

        if (choreId) {
            deleteComment(choreId).then(() => {
                getAndSetChores();
            });
        } else {
            console.error("Invalid choreId");
        }
    };


    return (
        <div className="chore-list">
            <h2 className="chore">Chore Details</h2>
            <Table>
                <thead className="detail-table">
                    <tr>
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
                    <tr key={chores.id} className="detail-table">
                        <th>Comments</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={chores.id} className="detail-table">
                        <td>{chores?.comment}</td>
                        <td className="detail-table">
                            {/* Conditionally render the delete button if there is a comment to delete */}
                            {chores?.comment && (
                                <Button color="secondary" onClick={(event) => handleDeleteComment(event, chores?.id)}>
                                    Delete Comment
                                </Button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}