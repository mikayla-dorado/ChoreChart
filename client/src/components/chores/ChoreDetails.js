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
        getChoreById(id).then(obj => {
            setChores(obj)
        })
    }, [id])

    useEffect(() => {
        getUserProfiles().then(array => setUsers(array))
    }, [])

    return(
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
                    </tr>
                </thead>
                <tbody>
                    {chores.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td scope="row">{`${c.id}`}</td>
                                <td>{c?.name}</td>
                                <td>{c?.description}</td>
                                <td>{c?.dueDate.slice(0,10)}</td>
                                <td>{c?.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}