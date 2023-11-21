type PostType = {
    title: string;
    content: string;
    date: Date;
}

export const Post = (props: PostType) => {
    return (
        <div className="mt-5 bg-orange-700 text-white">
            {props.title}<br/>
            {props.content}<br/>
            {props.date.toDateString()}<br/>
        </div>
    );
}