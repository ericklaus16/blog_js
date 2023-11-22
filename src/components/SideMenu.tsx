import { Lexend_Deca } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";

const lexend_deca = Lexend_Deca({
    subsets: ['latin'],
    display: 'swap',
});

export const SideMenu = () => {
    return(
        <div className={` ${lexend_deca.className} w-24 border-r border-r-green-blog flex flex-col items-center justify-evenly text-xl`}>
            <div className="text-center">
                <i className="bi-search"></i>
                <p>search</p>
            </div>            
            <div className="text-center">
                <i className="bi-plus-circle"></i>
                <p>add</p>
            </div>
        </div>
    );
}