export type CommentType = {
    author: String,
    content: String,
    date: Date,
};

export const Comment = (props: CommentType) => {
    const dataParsed = new Date(props.date.toString());
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
    console.log(dataParsed);
    
    return (
        <div className="mb-4">
            <p>@{props.author} said {dataParsed.getDate() < 10 ? "0" + dataParsed.getDate() : dataParsed.getDate() 
            + " " + monthNames[dataParsed.getMonth()] + " " + dataParsed.getFullYear() + " at "
            + (dataParsed.getHours() < 10 ? "0" + dataParsed.getHours() : dataParsed.getHours()) + ":" + 
            (dataParsed.getMinutes() < 10 ? "0" + dataParsed.getMinutes() : dataParsed.getMinutes())}: </p>
            <p>{props.content}</p>
        </div>
    );
};
