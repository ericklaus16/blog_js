import { Lexend_Deca } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";

const lexend_deca = Lexend_Deca({
    subsets: ['latin'],
    display: 'swap',
});

export const SideMenu = () => {
    return (
        <div className={`${lexend_deca.className} w-full buttons:pb-12 sm:pb-10 sm:w-24 border-t sm:border-r border-green-blog flex flex-row sm:flex-col items-center justify-evenly text-base sm:text-xl`}>
            <div className="text-center mt-2 mb-2">
                <i className="bi-search text-green-blog text-xl sm:text-base"></i>
                <p className="hidden sm:block">search</p>
            </div>
            <div className="text-center mt-2 mb-2">
                <i className="bi-plus-circle text-green-blog text-xl sm:text-base"></i>
                <p className="hidden sm:block">add</p>
            </div>
        </div>
    );
}
