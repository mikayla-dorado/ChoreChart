import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createChore, getChores } from "../../managers/choreManager"
import { Table, Input, Button } from "reactstrap"
import { getRooms } from "../../managers/roomManager"
import { getUserProfiles } from "../../managers/userProfileManager"

export const CreateChore = () => {
    const [chores, setChores] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [status, setStatus] = useState("")
    const [errors, setErrors] = useState([])
    const [userProfiles, setUserProfiles] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedUserProfile, setSelectedUserProfile] = useState(null)  // State for selected user
    const [selectedRoom, setSelectedRoom] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getChores().then(array => setChores(array))
        getUserProfiles().then(array => setUserProfiles(array))
        getRooms().then(array => setRooms(array))
    }, [])

    const handleSubmitBtn = (event) => {
        event.preventDefault()
        console.log("clicked")

        if (!selectedUserProfile || !selectedRoom) {
            setErrors(["Please select a user and a room for the chore."])
            return;
        }

        const choreCreated = {
            name: name,
            description: description,
            dueDate: dueDate,
            status: status,
            // userChores: [
            //     {
            //         userProfileId: selectedUserProfile.id,
            //         roomId: selectedRoom.id
            //     }
            //]
        }


        createChore(choreCreated, selectedUserProfile.id, selectedRoom.id).then((res) => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                navigate("/chores")
            }
        })
    }


    return (
        <div>
            <h2>Add a New Chore</h2>
            <div>
                <label>Chore Name:</label>
                <Input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <label>Description:</label>
                <Input
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div>
                <label>Due Date:</label>
                <Input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
            </div>
            {/* If status is fixed, you can display it without an input */}
            <div>
                <label>Status:</label>
                <select onChange={(event) => setStatus(event.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <div>
                <h2>Assign Chore to a User</h2>

                <div>
                    <label>User:</label>
                    <select onChange={(event) => setSelectedUserProfile(userProfiles.find(user => user.id === parseInt(event.target.value)))}>
                        <option value="">Select User</option>
                        {userProfiles.map(user => (
                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                        ))}
                    </select>
                </div>

                {/* Display rooms in checkboxes */}
                <div>
                    <label>Room:</label>
                    <select onChange={(event) => setSelectedRoom(rooms.find(room => room.id === parseInt(event.target.value)))}>
                        <option value="">Select Room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room?.name}</option>
                        ))}
                    </select>
                </div>
                <Button onClick={event => handleSubmitBtn(event)}>Submit New Chore</Button>
            </div>
        </div>
    );

    //have to figure out how i will implement information from userchores
    //such as the user i want to assign to and the room!

}