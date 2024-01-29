import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfileById } from "../../managers/userProfileManager"
import { Table, FormGroup, Label, Input } from "reactstrap"

export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({})

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getUserProfileById(id).then(obj =>
                setUserProfile(obj))
        }
    }, [id])


    // const handleStatusChange = (choreId, newStatus) => {

    //     const updatedUserChores = userProfile.userChores.map((chores) => {
    //       if (chores.id === choreId) {
    //         return { ...chores, status: newStatus };
    //       } else {
    //         return chores;
    //       }
    //     });

    //     setUserProfile((prevProfile) => ({
    //       ...prevProfile,
    //       userChores: updatedUserChores,
    //     }));
    //   };


    return (
        <div>
            <h2>Users Details</h2>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Chores</th>
                        <th>Chore Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={userProfile.id}>
                        <th scope="row">{`${userProfile?.firstName} ${userProfile?.lastName}`}</th>
                        <td>{userProfile?.address}</td>
                        <td>{userProfile?.email}</td>
                        <td>
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