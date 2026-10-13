
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || dept.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      setStudents(
        students.map((s) =>
          s.id === editId
            ? { ...s, name, dept }
            : s
        )
      );
      setEditId(null);
    } else {
      setStudents([
        ...students,
        {
          id: Date.now(),
          name: name,
          dept: dept
        }
      ]);
    }

    setName("");
    setDept("");
  }

  function handleEdit(student) {
    setName(student.name);
    setDept(student.dept);
    setEditId(student.id);
  }

  function handleDelete(id) {
    setStudents(students.filter((s) => s.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />

        <button type="submit">
          {editId !== null ? "Update" : "Add Student"}
        </button>
      </form>

      <h2>Student List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.dept}</td>
              <td>
                <button onClick={() => handleEdit(s)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
