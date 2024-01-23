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
                        <th>Status</th>
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
                                        <span style={{ color: 'blue' }}>{`[${chores?.status}]`}</span>
                                    </li>
                                ))}
                            </ul>
                        </td>
                        {/* <td>
                            <FormGroup>
                                {userProfile?.userChores?.map(chores => (
                                    <div key={chores.id}>
                                        <Label>
                                            <Input
                                                type="radio"
                                                name={`status-${chores.id}`}
                                                value="Pending"
                                                checked={chores?.status === "Pending"}
                                                onChange={() => handleStatusChange(chores.id, "Pending")}
                                            />{" "}
                                            Pending
                                        </Label>
                                        <Label check>
                                            <Input
                                                type="radio"
                                                name={`status-${chores.id}`}
                                                value="In Progress"
                                                checked={chores?.status === "In Progress"}
                                                onChange={() => handleStatusChange(chores.id, "In Progress")}
                                            />{" "}
                                            In Progress
                                        </Label>
                                        <Label>
                                            <Input
                                                type="radio"
                                                name={`status-${chores.id}`}
                                                value="Completed"
                                                checked={chores?.status === "Completed"}
                                                onChange={() => handleStatusChange(chores.id, "Completed")}
                                            />{" "}
                                            Completed
                                        </Label>
                                    </div>
                                ))}
                            </FormGroup>
                        </td> */}
                    </tr>
                </tbody>
            </Table>
        </div >
    )
}