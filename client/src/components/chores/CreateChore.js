import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChore, getChores } from "../../managers/choreManager";
import { FormGroup, Label, Input, Button, Form } from "reactstrap";
import { getRooms } from "../../managers/roomManager";
import { getUserProfiles } from "../../managers/userProfileManager";
import "./Chore.css";
import "../../index.css"
import background from "../../images/flowerbackground.jpg"

export const CreateChore = () => {
    const [chores, setChores] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedUserProfile, setSelectedUserProfile] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getChores().then((array) => setChores(array));
        getUserProfiles().then((array) => setUserProfiles(array));
        getRooms().then((array) => setRooms(array));
    }, []);

    const handleSubmitBtn = (event) => {
        event.preventDefault();
        console.log("clicked");

        if (!selectedUserProfile || !selectedRoom) {
            setErrors(["Please select a user and a room for the chore."]);
            return;
        }

        const choreCreated = {
            name: name,
            description: description,
            dueDate: dueDate,
            status: status,
        };

        createChore(choreCreated, selectedUserProfile.id, selectedRoom.id).then((res) => {
            if (res.errors) {
                setErrors(res.errors);
            } else {
                navigate("/chores");
            }
        });
    };

    return (
        <div className="create" style={{ backgroundImage: `url(${background})` }}>
            <Form className="form">
                <h2 className="chores">Add a New Chore</h2>
                <FormGroup>
                    <Label for="choreName">Chore Name:</Label>
                    <Input
                        type="text"
                        id="choreName"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description:</Label>
                    <Input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="dueDate">Due Date:</Label>
                    <Input
                        type="datetime-local"
                        id="dueDate"
                        value={dueDate}
                        onChange={(event) => setDueDate(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="status">Status:</Label>
                    <Input
                        type="select"
                        id="status"
                        onChange={(event) => setStatus(event.target.value)}
                        className="select"
                    >
                        <option value="Status">Choose Status</option>
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    {/* <h2>Assign Chore to a User</h2> */}
                    <Label for="userSelect">User:</Label>
                    <Input
                        type="select"
                        id="userSelect"
                        onChange={(event) =>
                            setSelectedUserProfile(
                                userProfiles.find((user) => user.id === parseInt(event.target.value))
                            )
                        }
                        className="select"
                    >
                        <option value="">Select User</option>
                        {userProfiles.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.firstName} {user.lastName}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="roomSelect">Room:</Label>
                    <Input
                        type="select"
                        id="roomSelect"
                        onChange={(event) =>
                            setSelectedRoom(rooms.find((room) => room.id === parseInt(event.target.value)))
                        }
                        className="select"
                    >
                        <option value="">Select Room</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room?.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <Button onClick={handleSubmitBtn} className="submit-btn">Submit New Chore</Button>
            </Form>
        </div>
    );
};
