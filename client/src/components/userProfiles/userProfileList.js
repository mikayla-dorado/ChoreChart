import { useEffect, useState } from "react"
import { getUserProfiles } from "../../managers/userProfileManager"
import { Table } from "reactstrap"
import { Link } from "react-router-dom"

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([])

    const getAndSetUserProfiles = () => {
        getUserProfiles().then(array => setUserProfiles(array))
    }

    useEffect(() => {
        getAndSetUserProfiles()
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        {/* <th>Chores</th> */}
                        {/*need to include the chores the user is assigned to(or will that be in the details?) */}
                    </tr>
                </thead>
                <tbody>
                    {userProfiles.map((p) => (
                        <tr key={p.id}>
                            <th scope="row">{`${p?.firstName} ${p?.lastName}`}</th>
                            <td>{p?.address}</td>
                            <td>{p?.email}</td>
                            {/* do i want a details page? or just have all the info here? */}
                            <td><Link to={`${p.id}`}>Details</Link></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}