"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DM_Serif_Display, Lexend_Deca} from "next/font/google";
import { ContainerS } from "@/components/ContainerS";
import { SideMenu } from "@/components/SideMenu";
import "../../../styles/fullPost.css";
import { PostInterface } from "@/context/PostContext";
import { PostProvider } from "@/context/PostContext";
import { Author } from "@/components/Author";
import { Button } from "react-bootstrap";
import { Box, Modal, TextField, TextareaAutosize, Typography } from "@mui/material";

const dms_d = DM_Serif_Display({ subsets: ['latin'], weight: "400", variable: "--font-dmsd"});
const lex_d = Lexend_Deca({subsets: ['latin']});

const post = ({params}: {params: { id: string}}) => {
    const [post, setPostData] = useState<PostInterface>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [msgError, setMsgError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${Number.parseInt(params.id)}`);
                console.log(params.id);
                setPostData(response.data);

                setTitle(response.data.title);
                setContent(response.data.content);
                setTags(response.data.tags);
            } catch (error) {
                console.error("Houve um erro ao tentar procurar pelos posts:", error);
            }
        }

        fetchPost();
    }, [params.id]);

    const dataParsed = post && post.date ? new Date(post.date.toString()) : null;
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];

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

    const handleEditPost = () => {
        axios.post(`http://localhost:8080/posts/${Number.parseInt(params.id)}/edit`, {
            title: title,
            content: content,
            tags: tags
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            if(response.status === 200){
                console.log("Edição feita com sucesso.");
                setShowEditModal(false);
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

    return(
        <PostProvider>
            <ContainerS>
                <SideMenu />

                <Modal
                    open={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={{...style}}>
                        <ul>{msgError}</ul>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{fontWeight: "bold"}}>
                        Editar este post:
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <input type="text" placeholder="Título do Post" className="input" value={title} onChange={name => setTitle(name.target.value)}/>
                            <TextareaAutosize placeholder="Comente sobre algo..." className="input textArea" value={content} onChange={cont => setContent(cont.target.value)}/>
                            <input type="text" placeholder="Tags do post... ex: programming, technology, culture" className="input" value={tags} onChange={text => setTags(text.target.value)}/>
                            <Button onClick={handleEditPost}>Editar</Button>
                        </Typography>
                    </Box>
            </Modal>

                <div className="containerFullPost">
                    {post && dataParsed && (<>
                    <div className="mb-10 w-76pc  text-left">
                        <p className={`${dms_d.className} titlePost text-green-blog`}>{post.title}</p>
                        <p className={`${lex_d.className} subtitlePost font-light text-subtitle-gray`}>written by <Author name={post.author}></Author></p>
                        <p className={`${lex_d.className} subtitlePost font-light text-subtitle-gray`}>on {dataParsed.getDate() < 10 ? "0" + dataParsed.getDate() : dataParsed.getDate()} {monthNames[dataParsed.getMonth()]} {dataParsed.getFullYear()}</p>
                    </div>
                    <div className="text-center" onClick={() => setShowEditModal(true)}>
                        <i className="bi-plus-circle text-green-blog"></i>
                        <p className="menuText">edit</p>
                    </div>

                    <div className="postContent has-dropcap overflow-auto scrollbar">
                        <p>
                        {post.content}
                        </p>
                    </div>
                    </>)}
                </div>
            </ContainerS>
        </PostProvider>
    );
}

export default post;