import { Tag } from "./Tag";
import Link from "next/link";

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
        className="mt-10 text-white w-9/12 flex justify-evenly hover:cursor-pointer"
        target={"_blank"}
        >
            <div className="text-3.5xl">
                {props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()}<br/>
                {monthNames[props.date.getMonth()]}
            </div>
            <div className="w-9/12">
                <p className="text-green-blog text-2xl">{props.title}</p><br/>
                <p className="text-base">{props.content}</p>
                <div className="w-10/12 mt-4">
                    {props.tags.map((tag) => (
                        <Tag name={tag}/>
                    ))}
                </div>
            </div>
        </Link>
    );
}