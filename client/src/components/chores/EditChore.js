import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChoreById, updateChore } from "../../managers/choreManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getUserProfiles } from "../../managers/userProfileManager";
import { getRooms } from "../../managers/roomManager";
import background from "../../images/greenbackground.jpg"
import "./Chore.css"


export const EditChore = () => {
    const [chore, setChore] = useState({})
    const [userProfiles, setUserProfiles] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedUserProfile, setSelectedUserProfile] = useState(null)  // State for selected user
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [errors, setErrors] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getChoreById(id).then(array => setChore(array))
        getUserProfiles().then(array => setUserProfiles(array))
        getRooms().then(array => setRooms(array))
    }, [id])


    const handleUpdateBtn = (event) => {
        event.preventDefault()

        if (!selectedUserProfile || !selectedRoom) {
            setErrors(["Please select a user and a room for the chore."])
            return;
        }

        const choreUpdate = {
            id: chore?.id,
            name: chore?.name,
            description: chore?.description,
            dueDate: chore?.dueDate,
            status: chore?.status,
            userChores: [
                {
                    userProfileId: selectedUserProfile?.id,
                    roomId: selectedRoom?.id
                }
            ]
        }
        console.log("Chore Update Data:", choreUpdate);
        updateChore(choreUpdate, selectedUserProfile.id, selectedRoom.id).then((res) => {
            console.log("Update Chore Response:", res);
            if (res.errors) {
                setErrors(res.errors)
            } else {
                navigate("/chores")
            }
        })

    }

    return (
        <div className="edit" style={{ backgroundImage: `url(${background})` }}>
            <h2 className="chores">Edit Chore</h2>
            <Form className="form">
                <FormGroup>
                    <Label>Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        value={chore?.name}
                        onChange={(event) => {
                            setChore(prevChore => ({
                                ...prevChore,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Desciption:</Label>
                    <Input
                        type="text"
                        name="description"
                        value={chore?.description}
                        onChange={(event) => {
                            setChore(prevChore => ({
                                ...prevChore,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Due Date:</Label>
                    <Input
                        type="datetime-local"
                        name="dueDate"
                        value={chore?.dueDate}
                        onChange={(event) => {
                            setChore(prevChore => ({
                                ...prevChore,
                                [event.target.name]: event.target.value
                            }))
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Status:</Label>
                    <select
                        name="status"
                        value={chore?.status}
                        onChange={(event) => {
                            setChore((prevChore) => ({
                                ...prevChore,
                                [event.target.name]: event.target.value,
                            }));
                        }}
                    >
                        <option value="Edit status">Edit Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label>User:</Label>
                    <select onChange={(event) => setSelectedUserProfile(userProfiles.find(user => user.id === parseInt(event.target.value)))}>
                        <option value="">Select User</option>
                        {userProfiles.map(user => (
                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup>
                    <Label>Room:</Label>
                    <select onChange={(event) => setSelectedRoom(rooms.find(room => room.id === parseInt(event.target.value)))}>
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room?.name}</option>
                        ))}
                    </select>
                </FormGroup>
                <div className="submit-btn-container">
                <Button type="submit" className="submit-btn" onClick={e => handleUpdateBtn(e)}>Submit Edit</Button>
            </div>
            </Form>
        </div>
    )
}