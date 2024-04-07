import React, { useState, useEffect, useRef } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import parse from "html-react-parser";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Compose.css";

const Compose = () => {
  const email=useRef("");
  const sub=useRef(null);
  const date = new Date();
  const handleSend = () => {
    const obj = {
      email: email.current.value,
      sub:sub.current.value,
      message:convertedContent,
      date: date.getDate(),
      time:date.getHours(),
      minute:date.getMinutes()
    };
   const t2 = email.current.value.replace(/[^a-zA-Z ]/g, "");
   const user=localStorage.getItem("user");
   const sender=user.replace(/[^a-zA-Z ]/g, "");

   fetch(`https://fir-18784-default-rtdb.firebaseio.com/sent${sender}.json`,{
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })


    fetch(`https://fir-18784-default-rtdb.firebaseio.com/${t2}.json`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then((res)=>res.json().then((data)=>console.log(data)));
  };

  const [cc, setCc] = useState(false);
  const [bcc, setBcc] = useState(false);

  const handleCC = (t) => {
    setCc((t) => !t);
  };
  const handleBcc = (t) => {
    setBcc((t) => !t);
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    const reactElement = parse(html);
    setConvertedContent(reactElement.props.children);
  }, [editorState]);

  return (
    <div classNameName="Comp">
      <header classNameName="Comp-header">Compose Mail</header>
      <input type="email" placeholder="To" size="100" ref={email}required/>
      <button onClick={handleCC}>cc</button>
      <button onClick={handleBcc}>bcc</button>
      {cc && <input type="email" placeholder="cc" size="100" />}
      {bcc && <input type="email" placeholder="bcc" size="100" />}
      <input type="email" placeholder="Subject" size="100" ref={sub}/>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperclassNameName="wrapper-className"
        editorclassNameName="editor-className"
        toolbarclassNameName="toolbar-className"
      />
      <button type="submit" onClick={handleSend}>
        Send
      </button>
      <div classNameName="preview"></div>
    </div>
  );
};

export default Compose;
