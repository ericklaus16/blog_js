import { Lexend_Deca } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/sidemenu.css";

const lexend_deca = Lexend_Deca({
    subsets: ['latin'],
    display: 'swap',
});

export const SideMenu = () => {
    return (
        <div className={`${lexend_deca.className} sidemenu`}>
            <div className="text-center">
                <i className="bi-search text-green-blog"></i>
                <p className="menuText">search</p>
            </div>
            <div className="text-center">
                <i className="bi-plus-circle text-green-blog"></i>
                <p className="menuText">add</p>
            </div>
        </div>
    );
}
