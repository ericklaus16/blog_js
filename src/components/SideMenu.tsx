"use client";
import { useState } from "react";
import { Lexend_Deca } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/sidemenu.css";

import { Box, Modal, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Button } from "react-bootstrap";
import axios from "axios";
import { usePostContext } from "@/context/PostContext";


const lexend_deca = Lexend_Deca({
    subsets: ['latin'],
    display: 'swap',
});

export const SideMenu = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const {addPost} = usePostContext();
    const [msgError, setMsgError] = useState("");
    const [author, setAuthor] = useState("");

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        bgcolor: "#272727",
        color: "#fff",
        border: '1px solid #0a70b8',
        borderRadius: '10px',
        pt: 2,
        px: 4,
        pb: 3,
    };

    const handleAddNewPost = () => {
        axios.post('http://localhost:8080/create', {
            title: title,
            content: content,
            tags: tags,
            author: author
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if(response.status === 200){
                console.log("Deu certo!");
                setShowAddModal(false);
                const tagsArray = tags.split(",").map(item=> item.trim());
                addPost({
                    //id será gerado automaticamente
                    title: title,
                    content: content,
                    date: new Date(),
                    tags: tagsArray,
                    author: author,
                })
                setTitle("");
                setContent("");
                setTags("");
            }
        })
        .catch(error => {
          console.error(error);
          setMsgError(error.response.data);
        });
    }

    return (
        <>
            <div className={`${lexend_deca.className} sidemenu`}>
                <div className="text-center" onClick={() => alert("teste")}>
                    <i className="bi-search text-green-blog"></i>
                    <p className="menuText">search</p>
                </div>
                <div className="text-center" onClick={() => setShowAddModal(true)}>
                    <i className="bi-plus-circle text-green-blog"></i>
                    <p className="menuText">add</p>
                </div>
            </div>

            <Modal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{...style}}>
                    <ul>{msgError}</ul>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight: "bold"}}>
                    Criar novo post:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="text" placeholder="Título do Post" className="input" value={title} onChange={name => setTitle(name.target.value)}/>
                        <TextareaAutosize placeholder="Comente sobre algo..." className="input textArea" value={content} onChange={cont => setContent(cont.target.value)}/>
                        <input type="text" placeholder="Tags do post... ex: programming, technology, culture" className="input" value={tags} onChange={text => setTags(text.target.value)}/>
                        <input type="text" placeholder="Digite o seu nome de usuário" className="input" value={author} onChange={author => setAuthor(author.target.value)}/>
                        <Button onClick={handleAddNewPost}>Adicionar</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}