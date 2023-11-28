import { Tag } from "./Tag";
import Link from "next/link";
import "../styles/post.css";

type PostType = {
    title: string;
    content: string;
    date: Date;
    tags: string[];
    postId: number;
}

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export const Post = (props: PostType) => {

    return (
        <Link 
        href={{pathname: "/post/[id]"}} 
        as={`/post/${props.postId}`} 
        className="post"
        target={"_blank"}
        >
            <div className="text-3.5xl commonDate"> 
                {props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()}<br/>
                {monthNames[props.date.getMonth()]}
            </div>
            <div className="text-base pt-3 completeDate">
                <p>{props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()} {monthNames[props.date.getMonth()]} {props.date.getFullYear()}</p>

            </div>
            <div className="w-9/12">
                <p className="text-green-blog title">{props.title}</p><br/>
                <p className="content">{props.content}</p>
                <div className="flex w-12/12 mt-4">
                    {props.tags.map((tag, index) => (
                        <Tag name={tag} key={index}/>
                    ))}
                </div>
            </div>
        </Link>
    );
}