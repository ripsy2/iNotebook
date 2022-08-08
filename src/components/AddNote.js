import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully!", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="containe my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3" style={{ width: "58rem" }}>
            <label
              htmlFor="title"
              className="form-label"
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
              style={{
                border: "2px solid #8d6970",
                backgroundColor: "#f4f0e9",
              }}
            />
          </div>
          <div
            className="mb-3"
            style={{
              width: "58rem",
            }}
          >
            <label
              htmlFor="description"
              className="form-label"
              style={{ fontWeight: "bold", fontStyle: "italic" }}
            >
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              style={{
                height: "250px",
                resize: "none",
                padding: "6px 6px",
                border: "2px solid #8d6970",
                backgroundColor: "#f4f0e9",
              }}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-danger"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
