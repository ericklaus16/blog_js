import { Tag } from "./Tag";
import Link from "next/link";
import "../styles/post.css";
import { PostInterface } from "@/context/PostContext";

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export const Post = (props: PostInterface) => {
    const dateParsed = new Date(props.date.toString());

    return (
        <div className="post">
            <Link href={{pathname: "/post/[id]"}} as={`/post/${props.id}`} target={"_blank"}>
                <div className="text-3.5xl commonDate"> 
                    {dateParsed.getDate() < 10 ? "0" + dateParsed.getDate() : dateParsed.getDate()}<br/>
                    {monthNames[dateParsed.getMonth()]}
                </div>
                <div className="text-base pt-3 completeDate">
                    <p>{dateParsed.getDate() < 10 ? "0" + dateParsed.getDate() : dateParsed.getDate()} {monthNames[dateParsed.getMonth()]} {dateParsed.getFullYear()}</p>
                </div>
            </Link>
            <div className="w-9/12">
                <p className="text-green-blog title">{props.title}</p><br/>
                <p className="content">{props.content}</p>
                <div className="flex w-12/12 mt-4">
                    {props.tags.map((tag, index) => (
                        <Tag name={tag} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
}