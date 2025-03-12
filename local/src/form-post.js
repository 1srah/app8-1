import React, { useRef, useState } from "react";

export default function FormPost() {
  let [PostedData, setPostedData] = useState("");
  const form = useRef();

  const onSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formEnt = Object.fromEntries(formData.entries());
    fetch("/api/form-post", {
      method: "POST",
      body: JSON.stringify(formEnt),
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.text())
      .then(result => setPostedData(result))
      .catch(err => alert(err));
  };

  const inputStyle = {
    margin: "5px 0",
  };

  return (
    <div style={{ margin: "30px" }}>
      <form ref={form} onSubmit={onSubmitForm}>
        <div>ติดต่อเรา</div>
        <input
          type="text"
          name="name"
          size="40"
          placeholder="ชื่อ"
          style={inputStyle}
        />
        <br />
        <input
          type="email"
          name="email"
          size="40"
          placeholder="อีเมล"
          style={inputStyle}
        />
        <br />
        <textarea
          name="message"
          cols="40"
          rows="4"
          placeholder="ข้อความ"
          style={inputStyle}
        />
        <br />
        <button>ตกลง</button>
      </form>
      <br />
      <div dangerouslySetInnerHTML={{ __html: PostedData }}></div>
    </div>
  );
}
