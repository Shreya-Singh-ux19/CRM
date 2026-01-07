import { useState } from "react";
import { raiseIssue } from "../../services/customerService";

export default function RaiseIssue() {
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    category: "Technical",
    priority: "MEDIUM",
    customerEmail: localStorage.getItem("email"),
  });

  const submit = async () => {
    alert(await raiseIssue(issue));
  };
 
  
  return (
    <>
      <h3>Raise Issue</h3>
      <input placeholder="Title" onChange={e => setIssue({...issue, title:e.target.value})} />
      <textarea placeholder="Description" onChange={e => setIssue({...issue, description:e.target.value})} />
      <h5>Issue Priority</h5>
      <select
          value={issue.priority}
          onChange={(e) =>
            setIssue({ ...issue, priority: e.target.value })
          }
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
      </select>
      <button onClick={submit}>Submit</button>
    </>
  );
}