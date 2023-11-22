"use client";
import { Post } from "./Post";
import { useEffect, useState } from "react";
import axios from "axios";

export const PostHandler = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {        
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Houve um erro ao tentar procurar pelos posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return(
        <div className="max-w-full max-h-screen">
            {/* EXEMPLO DE COMENTÁRIO
            <Post 
                title="Este é o primeiro post do blog!" 
                content="Esse é o primeiro projeto que estou fazendo como trainee na bit, está sendo muito interessante trabalhar com Next.js e Tailwind!" 
                date={new Date("December 24, 2004")}
            />

            <Post 
                title="Este é o segundo post do blog!" 
                content="Os posts que estão sendo renderizados no momento ainda não são dinâmicos, em breve colocarei uma API para ficar mais interessante!" 
                date={new Date("November 21, 2023")}
            />
            */}
            <div className="h-200 w-full overflow-auto scrollbar">       
                {posts.slice(0, 10).map((post) => (
                    <Post
                        key={post["id"]}
                        title={post["title"]}
                        content={post["body"]}
                        tags={["programming", "technology"]}
                        date={new Date(new Date().valueOf() - Math.random()*(1e+12))} // Data aleatoria no momento
                    />
                ))}  
            </div>    
        </div>
    );
}