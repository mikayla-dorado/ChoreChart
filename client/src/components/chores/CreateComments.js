import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { createComment } from "../../managers/commentManager";
import "./Chore.css";
import { getChoreById } from "../../managers/choreManager";
import { useNavigate, useParams } from "react-router-dom";
import background from "../../images/greenbackground2.jpg"

export const CreateComments = ({ choreId, onCommentAdded }) => {
    const [chore, setChore] = useState({ comment: "" }); // Initialize the state with an empty comment
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getChoreById(id).then(array => setChore(array));
    }, [id]);

    const handleSubmitBtn = (event) => {
        event.preventDefault();
        console.log(chore)

        //this deletes the 'userChores' property from the chore object
        delete chore.userChores
        console.log(chore)
       
        createComment(chore.id, chore).then((res) => {
            navigate("/chores");
        });
    };

    const handleInputChange = (event) => {
        //created shallow copy of the chore object so we dont directly modify the og state
        const stateCopy = { ...chore };
        //updates copied object with a new value
        stateCopy[event.target.name] = event.target.value;
        //sets statewith updated object stateCopy
        setChore(stateCopy);
    };

    return (
        <div className="bg" style={{ backgroundImage: `url(${background})` }}>
        <Form onSubmit={handleSubmitBtn}>
            <FormGroup>
                <h2 className="chores">Add A Comment</h2>
                <Input
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                    value={chore?.comment}
                    onChange={handleInputChange}
                    style={{ height: "100px" }}
                />
            </FormGroup>
            <Button type="submit" color="secondary">
                Add Comment
            </Button>
        </Form>
        </div>
    );
};

