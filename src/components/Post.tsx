import { Tag } from "./Tag";

type PostType = {
    title: string;
    content: string;
    date: Date;
    tags: string[];
}

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

export const Post = (props: PostType) => {
    return (
        <div className="mt-5 text-white w-9/12 flex justify-evenly hover:cursor-pointer mb-10">
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
        </div>
    );
}