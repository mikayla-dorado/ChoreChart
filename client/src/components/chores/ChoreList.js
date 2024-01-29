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

    const handleCreateChoreBtn = (event) => {
        event.preventDefault()

        navigate("create")
    }

    const handleEditBtn = (event, id) => {
        event.preventDefault()

        navigate("edit")
    }


    return (
        <div>
            <h2>Chores</h2>
            <Button color="success" onClick={handleCreateChoreBtn}>Create A New Chore</Button>
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
                                                color="success"
                                                onClick={event => handleEditBtn(event, c.id)}>
                                                Edit
                                            </Button>
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