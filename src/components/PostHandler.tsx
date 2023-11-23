"use client";
import { Post } from "./PostComponent";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TablePagination } from "@mui/material";

export const PostHandler = () => {
    const [page, setPage] = useState<number>(0);
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
            curPage = Number.parseInt(pageQueryParam || "0", 10);
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
        document.location.href = `?page=${newPage}`;
    };

    return(
        <div className="flex sm:max-h-screen sm:w-screen ml-10 h-full buttons:h-11/12 buttons:h-postsHeightMobileMed sm:h-full sm:ml-20">
            {(posts.length > 0 && showPost) && 
                (
                <div className="flex flex-col items-start h-full mt-2 buttons:mt-14 sm:mt-10 sm:h-9/12">
                    <div className="sm:h-200 sm:w-full overflow-auto scrollbar">       
                        {posts.slice((page) * 10, (page + 1) * 10).map((post) => (
                            <Post
                                key={post["id"]}
                                title={post["title"]}
                                content={post["body"]}
                                postId={post["id"]}
                                tags={["programming", "technology"]}
                                date={new Date(new Date().valueOf() - Math.random()*(1e+12))} // Data aleatoria no momento
                            />
                        ))}  
                    </div>
                    <TablePagination
                    style={{color: "white"}}
                    className="sm:ml-16 mb-2 buttons:mb-2 h-64 sm:h-48 xl:mb-0 xl:h-24"
                    component="span"
                    count={100}
                    page={page}
                    onPageChange={handleNextPage}
                    rowsPerPage={10}
                    onRowsPerPageChange={() => {}}
                    labelRowsPerPage={"Posts:"}
                    />
                </div>
                )
            }  
            {posts.length == 0 && <div className="w-fullFlex h-full flex items-center justify-center"><div className="text-center">{message}</div></div>}
        </div>
    );
}