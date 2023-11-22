type TagType = {
    name: string;
}

export const Tag = (props: TagType) => {
    return(
        <div className="inline-block border border-green-blog rounded-full w-36 h-8 mr-5 text-sm">
            <div className="flex items-center justify-center h-full">
                #{props.name}
            </div>
        </div>
    );
}