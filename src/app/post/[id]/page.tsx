"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { DM_Serif_Display, Lexend_Deca} from "next/font/google";

const dms_d = DM_Serif_Display({ subsets: ['latin'], weight: "400", variable: "--font-dmsd"});
const lex_d = Lexend_Deca({subsets: ['latin']});

const post = ({params}: {params: { id: string}}) => {
    const [post, setPostData] = useState({title: new String, body: new String});
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
                setPostData(response.data);
            } catch (error) {
                console.error("Houve um erro ao tentar procurar pelos posts:", error);
            }
        }

        fetchPost();
    }, [params.id]);

    return(
        <div className="w-screen h-screen flex items-center justify-center flex-col bg-background">
            <div className="mb-10 w-73pc  text-left">
                <p className={`${dms_d.className} text-4xl text-green-blog`}>{post["title"]}</p>
                <p className={`${lex_d.className} text-xl font-light text-subtitle-gray`}>written by @erickbms</p>
                <p className={`${lex_d.className} text-xl font-light text-subtitle-gray`}>on 27 may 2023</p>
            </div>
            <div className="max-w-7xl text-xl has-dropcap">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque porro velit inventore! Similique, repellendus. Quae assumenda magni commodi, alias delectus libero, temporibus nesciunt expedita qui aliquam animi itaque pariatur facilis?
                Reprehenderit quas ea labore in corporis quo. Modi praesentium sit eum labore. Quasi sunt quas, ipsa non animi sint temporibus officiis adipisci, deserunt vel ut. Impedit quis beatae ipsam laborum.
                Numquam nobis explicabo praesentium voluptatibus. Nobis eius voluptatum assumenda, exercitationem dolore aspernatur illum adipisci veritatis, suscipit debitis corrupti praesentium. Est tenetur maiores excepturi molestias necessitatibus deserunt, ratione incidunt laboriosam magni!
                Nobis animi blanditiis praesentium error quasi consequatur, deserunt facere debitis dignissimos fugit velit tempore. Repellat molestias ea vero aspernatur cum, vitae perspiciatis sequi doloremque reprehenderit maxime nihil, tempore tenetur accusamus?
                Saepe ab voluptas unde vitae sapiente labore illo, aliquid quod, aspernatur nostrum id ad maiores laboriosam repellat, esse quibusdam excepturi cupiditate mollitia! Inventore facere nostrum sit exercitationem quidem, corrupti quae.
                Repudiandae dignissimos sit saepe obcaecati quo, a cumque nulla eius ipsam esse laboriosam dicta doloremque iste veritatis labore dolorem necessitatibus ipsum magni, aliquid modi accusantium, architecto ut nemo aut. Exercitationem.
                Dolore iure, doloribus beatae accusantium perspiciatis, similique corporis ipsa repellat aliquid rem quasi optio, iste pariatur ipsum est eum? Maiores vel ex unde aperiam repellendus porro dolorum. Nulla, omnis reprehenderit.
                Voluptatem aperiam voluptatibus, facere temporibus harum exercitationem tenetur ea sit enim incidunt corrupti cupiditate deleniti eum minus, quas magnam rem, asperiores sint qui sequi voluptas unde nulla! Ipsam, sint impedit.
                Omnis, dolorem quod corrupti architecto ipsa optio neque? Aliquid dolor pariatur quasi, facilis recusandae cumque minima sed corporis officiis dicta inventore magni est reiciendis! Harum, voluptatem possimus! Odio, dolorum amet?
                Minus voluptas nobis distinctio sed, maxime labore amet mollitia perspiciatis provident blanditiis fugit veritatis sequi voluptatibus, dignissimos impedit quae quia voluptate ipsa non, omnis accusamus eius aut! Quod, voluptatum aperiam.</p>
            </div>
        </div>
    );
}

export default post;