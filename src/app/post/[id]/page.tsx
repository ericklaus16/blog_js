"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DM_Serif_Display, Lexend_Deca} from "next/font/google";
import { ContainerS } from "@/components/ContainerS";
import { SideMenu } from "@/components/SideMenu";
import "../../../styles/fullPost.css";
import { PostInterface } from "@/context/PostContext";
import { PostProvider } from "@/context/PostContext";

const dms_d = DM_Serif_Display({ subsets: ['latin'], weight: "400", variable: "--font-dmsd"});
const lex_d = Lexend_Deca({subsets: ['latin']});

const post = ({params}: {params: { id: string}}) => {
    const [post, setPostData] = useState<PostInterface>();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${Number.parseInt(params.id)}`);
                console.log(params.id);
                setPostData(response.data);
            } catch (error) {
                console.error("Houve um erro ao tentar procurar pelos posts:", error);
            }
        }

        fetchPost();
    }, [params.id]);

    const dataParsed = post && post.date ? new Date(post.date.toString()) : null;
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];

    return(
        <PostProvider>
            <ContainerS>
                <SideMenu />        
                <div className="containerFullPost">
                    {post && dataParsed && (<>
                    <div className="mb-10 w-76pc  text-left">
                        <p className={`${dms_d.className} titlePost text-green-blog`}>{post.title}</p>
                        <p className={`${lex_d.className} subtitlePost font-light text-subtitle-gray`}>written by @erickbms</p>
                        <p className={`${lex_d.className} subtitlePost font-light text-subtitle-gray`}>on {dataParsed.getDate() < 10 ? "0" + dataParsed.getDate() : dataParsed.getDate()} {monthNames[dataParsed.getMonth()]} {dataParsed.getFullYear()}</p>
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