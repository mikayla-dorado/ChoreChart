import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createChore, getChores } from "../../managers/choreManager"
import { Table, Input, Button } from "reactstrap"

export const CreateChore = () => {
    const [chores, setChores] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [status, setStatus] = useState("")
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getChores().then(array => setChores(array))
    }, [])

    const handleSubmitBtn = (event) => {
        event.preventDefault()
        console.log("clicked")

        const choreCreated = {
            name: name,
            description: description,
            dueDate: dueDate,
            status: status,
            userChores: []
        }

        createChore(choreCreated).then((res) => {
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
                <span>Pending</span>
            </div>
            <div>
                <Button onClick={event => handleSubmitBtn(event)}>Submit New Chore</Button>
            </div>
        </div>
    );

}