import "../styles/tag.css";

type TagType = {
    name: string;
}

export const Tag = (props: TagType) => {
    return(
        <div className="tag">
            <div className="flex items-center justify-center h-full">
                #{props.name}
            </div>
        </div>
    );
}