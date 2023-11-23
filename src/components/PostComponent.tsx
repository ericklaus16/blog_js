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
        className="mt-10 text-white w-12/12 sm:w-9/12 flex flex-col-reverse sm:flex-col justify-evenly hover:cursor-pointer"
        target={"_blank"}
        >
            <div className="text-3.5xl hidden sm:block"> 
                {props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()}<br/>
                {monthNames[props.date.getMonth()]}
            </div>
            <div className="text-base pt-3 block sm:hidden">
                <p>{props.date.getDate() < 10 ? "0" + props.date.getDate() : props.date.getDate()} {monthNames[props.date.getMonth()]} {props.date.getFullYear()}</p>

            </div>
            <div className="w-9/12">
                <p className="text-green-blog text-2xl">{props.title}</p><br/>
                <p className="text-base">{props.content}</p>
                <div className="flex w-12/12 mt-4">
                    {props.tags.map((tag, index) => (
                        <Tag name={tag} key={index}/>
                    ))}
                </div>
            </div>
        </Link>
    );
}