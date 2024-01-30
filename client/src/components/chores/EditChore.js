import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getChoreById, updateChore } from "../../managers/choreManager"
import { Button, Form, FormGroup, Input, Label } from "reactstrap";


export const EditChore = () => {
    const [chore, setChore] = useState({})

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getChoreById(id).then(array => setChore(array))
    }, [id])


    const handleUpdateBtn = (event) => {
        event.preventDefault()

        const choreUpdate = {
            id: chore?.id,
            name: chore?.name,
            description: chore?.description,
            dueDate: chore?.dueDate,
            status: chore?.status
        }
        updateChore(choreUpdate).then(() => navigate("/chores"))
    }

    return (
        <>
            <h2>Edit Chore</h2>
            <Form>
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
            </Form>
            <div className="submit-btn-container">
                <Button type="submit" color="success" onClick={e => handleUpdateBtn(e)}>Submit Edit</Button>
            </div>
        </>
    )

}