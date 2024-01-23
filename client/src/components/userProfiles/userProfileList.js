import { useEffect, useState } from "react"
import { deleteUser, getUserProfiles } from "../../managers/userProfileManager"
import { Table, Button } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"

export const UserProfileList = ({ loggedInUser }) => {
    const [userProfiles, setUserProfiles] = useState([])
    const navigate = useNavigate()

    const getAndSetUserProfiles = () => {
        getUserProfiles().then(array => setUserProfiles(array))
    }

    useEffect(() => {
        getAndSetUserProfiles()
    }, [])

    const handleDeleteBtn = (event, id) => {
        event.preventDefault()

        deleteUser(id).then(() => getAndSetUserProfiles())
    }

    const handleCreateUserBtn = (event) => {
        event.preventDefault()
        navigate("create")
    }

    return (
        <div>
            <h2>Users</h2>
            <Button color="success" onClick={handleCreateUserBtn}>Add User</Button>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {userProfiles.map((p) => (
                        <tr key={p.id}>
                            <th scope="row">{`${p?.firstName} ${p?.lastName}`}</th>
                            <td>{p?.address}</td>
                            <td>{p?.email}</td>
                            <td>
                                <Link to={`${p.id}`}>
                                    Details
                                </Link>
                            </td>
                            <td>
                                {loggedInUser.roles.includes("Admin") ? (
                                    <>
                                        <Button
                                            color="danger"
                                            onClick={event => handleDeleteBtn(event, p.id)}>
                                            Delete
                                        </Button>
                                    </>
                                ) : (
                                    ""
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}