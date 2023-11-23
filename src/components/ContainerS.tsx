import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const ContainerS = ({ children }: Props) => {
    return (
        <div className="flex flex-col-reverse sm:flex-row w-screen sm:w-full h-screen justify-between bg-background">
            {children}
        </div>
    );
}
