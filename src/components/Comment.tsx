export type CommentType = {
    author: String,
    content: String,
    date: Date,
};

export const Comment = (props: CommentType) => {
    return (
        <div>
            <p>@{props.author} said: </p>
            <p>{props.content}</p>
        </div>
    );
};
