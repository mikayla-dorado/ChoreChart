import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getChoreById } from "../../managers/choreManager"
import { getUserProfiles } from "../../managers/userProfileManager"
import { Table } from "reactstrap"

export const ChoreDetails = () => {
    const [chores, setChores] = useState([])
    const [users, setUsers] = useState([])

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


    return (
        <div>
            <h2>Chore Details</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Assigned User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={chores.id}>
                        <td scope="row">{`${chores.id}`}</td>
                        <td>{chores?.name}</td>
                        <td>{chores?.description}</td>
                        <td>{chores?.dueDate?.slice(0, 10)}</td>
                        <td>{chores?.status}</td>
                    </tr>
                    {chores.userChore && chores.userChore.map((uc) => (
                        <tr key={uc.id}>
                            <td>{uc?.userProfile?.firstName}</td>
                            <td>{uc?.userProfile?.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}