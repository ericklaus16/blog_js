"use client";
import { Post } from "./PostComponent";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TablePagination } from "@mui/material";
import "../styles/posts.css";

export const PostHandler = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("Procurando por postagens...");
    const initialized = useRef(false);
    const [showPost, canShowPost] = useState(true);
    let curPage: number;

    useEffect(() => {  
        if(!initialized.current){
            initialized.current = true;
            canShowPost(true);
            const queryParameters = new URLSearchParams(window.location.search);
            const pageQueryParam = queryParameters.get("page");
            const rowsQueryParam = queryParameters.get("rows");
            curPage = Number.parseInt(pageQueryParam || "0", 10);
            setRowsPerPage(Number.parseInt(rowsQueryParam || "0", 10));
            setPage(curPage);
    
            const fetchPosts = async () => {
                try {
                    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                    setPosts(response.data);
                } catch (error) {
                    console.error("Houve um erro ao tentar procurar pelos posts:", error);
                    setMessage("Não há publicações disponíveis...");
                }
            };
            fetchPosts();
        }      
    }, []);

    const handleNextPage = (event: any, newPage: number) => {
        canShowPost(false);
        setPage(newPage);
        document.location.href = `?page=${newPage}&rows=${rowsPerPage}`;
    };

    return(
        <div className="postsContainer">
            {(posts.length > 0 && showPost) && 
                (
                <div className="">
                    <div className="overflow-auto scrollbar posts">       
                        {posts.slice((page) * rowsPerPage, (page + 1) * rowsPerPage).map((post) => (
                            <Post
                                key={post["id"]}
                                title={post["title"]}
                                content={post["body"]}
                                postId={post["id"]}
                                tags={["programming", "technology"]}
                                date={new Date(new Date().valueOf() - Math.random()*(1e+12))} // Data aleatoria no momento
                            />
                        ))}  
                    </div><br/>
                    <TablePagination
                    style={{color: "white"}}
                    className="pagination"
                    component="span"
                    count={100}
                    page={page}
                    onPageChange={handleNextPage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {setRowsPerPage(+event?.target.value)}}
                    labelRowsPerPage={"Posts:"}
                    />
                </div>
                )
            }  
            {posts.length == 0 && <div className="w-fullFlex h-full flex items-center justify-center"><div className="text-center">{message}</div></div>}
        </div>
    );
}