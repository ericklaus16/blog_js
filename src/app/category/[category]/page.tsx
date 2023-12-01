"use client";
import { useEffect, useState } from "react";
import { Post, PostType } from "@/components/PostComponent";
import { SideMenu } from "@/components/SideMenu";

import "../../../styles/category.css";

import axios from "axios";
import { ContainerS } from "@/components/ContainerS";

const Page = ({ params }: { params: { category: string } }) => {
  const [posts, setPosts] = useState<PostType[]>([]); // Alterei para um array de PostType
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        const unfilteredPosts = response.data;
        setPosts(unfilteredPosts);
      } catch (error) {
        console.error(
          "Houve um erro ao tentar procurar pelos posts:",
          error
        );
        setMessage("Não há publicações com essa categoria no momento...");
      }
    };
    fetchPosts();
  }, []);

  return (
    <ContainerS>
      <SideMenu />
      {posts && (
        <div className="postsCategoryContainer">
          <p>Listando todos os posts da categoria #{params.category.toUpperCase()} </p>
          {posts.map((post) => (
            post.tags.includes(params.category) && (
            <Post 
                key={post.postId}
                postId={post.postId}
                title={post.title}
                content={post.content}
                date={post.date}
                tags={post.tags}
            />
          )))}
        </div>
      )}
      {!posts || (posts.length === 0 && <p>{message}</p>)}
    </ContainerS>
  );
};

export default Page;
