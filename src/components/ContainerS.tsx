import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const ContainerS = ({children}: Props) => {
    return(
        <div className="flex w-full h-screen justify-between bg-background">
            {children}
        </div>
    );
}