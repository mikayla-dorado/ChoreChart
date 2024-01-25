import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getChores, deleteChore } from "../../managers/choreManager"
import { Table, Button } from "reactstrap"

export const ChoreList = ({ loggedInUser }) => {
    const [chores, setChores] = useState([])

    const navigate = useNavigate()

    const getAndSetChores = () => {
        getChores().then(array => setChores(array))
    }

    useEffect(() => {
        getAndSetChores()
    }, [])

    const handleDeleteBtn = (event, id) => {
        event.preventDefault()

        deleteChore(id).then(() => getAndSetChores())
    }



    return (
        <div>
            <h2>Chores</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        {/* <th>Due Date</th>
                        <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {chores.map((c) => {
                        return (
                            <tr key={c.id}>
                                <td scope="row">{`${c.id}`}</td>
                                <td>{c?.name}</td>
                                <td>{c?.description}</td>
                                {/* <td>{c?.dueDate.slice(0, 10)}</td>
                                <td>{c?.status}</td> */}
                                <td>
                        {loggedInUser.roles.includes("Admin") ? (
                            <>
                                <Button
                                    color="danger"
                                    onClick={event => handleDeleteBtn(event, c.id)}>
                                    Delete
                                </Button>
                                <Link to={`${c.id}`}>
                                    Details
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                    </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div >
    )
}