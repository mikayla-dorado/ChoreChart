import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../managers/userProfileManager"
import { FormGroup, Form, Label, Input, Button } from "reactstrap"
import "./User.css"


export const CreateNewUser = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    const handleSubmitBtn = (event) => {
        event.preventDefault()
        console.log("Email entered:", email);

        const userCreated = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            email: email,
            userChores: [],
            identityUser: {},
            identityUserId: ""
        }

        createUser(userCreated).then((res) => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                navigate("/userprofiles")
            }
        })
    }

    return (
        <div>
            <h2 className="users">Add a New User</h2>
            <Form className="form">
                <FormGroup>
                    <Label>First Name</Label>
                    <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Last Name</Label>
                    <Input
                        type="text"
                        value={lastName}
                        onChange={(event) => {
                            setLastName(event.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Address</Label>
                    <Input
                        type="text"
                        value={address}
                        onChange={(event) => {
                            setAddress(event.target.value)
                        }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                    />
                </FormGroup>
                <Button onClick={handleSubmitBtn} color="secondary">
                    Submit
                </Button>
            </Form>
            <div style={{ color: "red" }}>
                {Object.keys(errors).map((key) => (
                    <p key={key}>
                        {key}: {errors[key].join(",")}
                    </p>
                ))}
            </div>
        </div >
    )
}