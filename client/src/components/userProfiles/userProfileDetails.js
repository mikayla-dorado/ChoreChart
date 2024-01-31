import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfileById } from "../../managers/userProfileManager"
import { Table, FormGroup, Label, Input } from "reactstrap"
import "./User.css"

export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({})

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserProfileById(id).then(obj =>
                setUserProfile(obj))
        }
    }, [id])


    return (
        <div className="details">
            <h2 className="user-details">Users Details</h2>
            <Table>
                <thead>
                    <tr className="detail-table">
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Chores</th>
                        <th>Chore Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={userProfile.id} className="detail-table">
                        <th scope="row">{`${userProfile?.firstName} ${userProfile?.lastName}`}</th>
                        <td  className="detail-table">{userProfile?.address}</td>
                        <td  className="detail-table">{userProfile?.email}</td>
                        <td  className="detail-table">
                            <ul>
                                {userProfile?.userChores?.map(chores => (
                                    <li key={chores.id}>
                                        <strong>{chores?.chore?.name}</strong>
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <ul>
                                {userProfile?.userChores?.map(chores => (
                                    <li key={chores.id}>
                                        <strong>{chores?.chore?.status}</strong>
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div >
    )
}
