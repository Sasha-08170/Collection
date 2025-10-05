import React, { useState } from "react";
const AccordionExample = () => {
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div>
      <h3>Аккордеон:</h3>
      {[1, 2, 3].map((id) => (
        <div key={id} style={{ border: "1px solid #ccc", margin: "5px 0" }}>
          <div
            style={{ padding: "10px", cursor: "pointer", background: "#f9f9f9", color: "#333" }}
            onClick={() => toggle(id)}
          >
            Контент раздела {id}
          </div>
          {open === id && <div style={{ padding: "10px" }}>📦 Контент раздела {id}</div>}
        </div>
      ))}
    </div>
  );
};

export default AccordionExample;