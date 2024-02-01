import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChoreById, updateChore } from "../../managers/choreManager"
import { getUserProfiles } from "../../managers/userProfileManager"
import { getRoomsById } from "../../managers/roomManager"
import { Table } from "reactstrap"


export const ChoreDetails = () => {
    const [chores, setChores] = useState([])
    const [users, setUsers] = useState([])
    const [rooms, setRooms] = useState([])

    const { id } = useParams();
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
        </div>
    )
}