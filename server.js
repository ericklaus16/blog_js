const express = require('express');
const app = express();
const { pool } = require("./dbConfig"); //configuração feita em dbConfig para conectar-se ao postgre
const cors = require('cors'); //permite que o front-end faça requisições a este back-end
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization, Origin, X-Auth-Token");
    app.use(cors());
    next();
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: localhost:${PORT}`); //console imprime a porta em que o servidor está funcionando
})

app.get("/posts", async (req, res) => {
    try {
        console.log("Retornando posts para aplicação...");
        //dados são enviados em ordem decrescente para que os posts mais recentes apareçam primeiro na página
        const posts = await pool.query(`SELECT * FROM public.dadosblogjs ORDER BY date DESC`);
        return res.json(posts.rows);
    } catch(err) {
        res.status(404).send("Falha encontrada no armazenamento de dados.");
    }
});

app.get(`/posts/:id`, async (req, res) => { //id = parâmetro 1
    try {
        const posts = await pool.query(`SELECT * FROM public.dadosblogjs WHERE id = ${req.params.id}`);
        return res.json(posts.rows[0]);
    } catch(err) {
        res.status(404).send("Nenhum post foi encontrado nesta página.");
    }
});

app.get(`/comments/:id`, async (req, res) => {
    try {
        console.log("Retornando comentários...");
        const pId = req.params.id;
        const comments = await pool.query(`SELECT * FROM public.comentarios WHERE "postId" = $1`, [pId]);


        if (comments.rows.length > 0) {
            return res.status(200).json(comments.rows);
        } else {
            return res.status(404).send("Nenhum comentário foi encontrado neste post.");
        }
    } catch(err) {
        console.error(err);
        res.status(500).send("Erro ao buscar comentários.");
    }
});

app.use(bodyParser.json());
app.post(`/create`, async (req, res) => { //inserção de um novo post
    console.log(req.body);
    let {title, content, tags, tagsOriginalSize, author} = req.body;
    let date = new Date; //data gerada no momento
    let tagsSize = tags.length;
    
    //verificação básica de erros
    if (!title || !content || !tags || !author) {
        res.status(500).send("Preencha todos os campos.");
    }else if (title.length < 4) {
        res.status(500).send("O título deve ter ao menos 4 caracteres.");
    }else if (content.length < 10) {
        res.status(500).send("O conteúdo do post deve ter ao menos 10 caracteres.");
    }else if (tags.length < 1 || tagsSize != tagsOriginalSize) {
        res.status(500).send("Adicione ao menos uma tag. Obs: cada tag deve ter ao menos 4 caracteres.");
    }else if (author.length < 4) {
        res.status(500).send("Digite um apelido que tenha ao menos 4 caracteres.");
    }else {
        const result = await pool.query (
            `INSERT INTO public.dadosblogjs (title, content, date, tags, author)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`,
            [title, content, date, tags, author],
        );

        const newPostId = result.rows[0].id;
        res.status(200).json({id: newPostId});
    }
});

app.get(`/posts/:id/remove`, (req, res) => { //um esboço de como será a remoção de posts
    //let rem = true;
    let rem = true;
    if (rem) {
        pool.query( //deleta o post
            `DELETE FROM public.dadosblogjs WHERE id = $1`,
            [req.params.id],
            (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res);
            }
        )

        pool.query( //deleta os comentários do post
            `DELETE FROM public.comentarios WHERE "postId" = $1`,
            [req.params.id],
            (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res);
            }
        )
        
        //console.log("Remoção feita com sucesso.");

    }else {
        console.log("Cliente não confirmou a remoção.");
        res.redirect("/posts/" + req.params.id);
    }
});

app.post(`/posts/:id/createComment`, (req, res) => { //um esboço de como será a criação de comentários
    //res.redirect(`/posts`);
    console.log(req.body);
    let {author, comment} = req.body;
    if (!author || !comment) {
        res.status(500).send("Preencha todos os campos.");
    }else if (author.length < 4) {
        res.status(500).send("O nome do usuário deve ter ao menos 4 caracteres.");
    }else if (comment.length < 10) {
        res.status(500).send("O comentário deve ter ao menos 10 caracteres.");
    }else {
        let postId = req.params.id;
        let date = new Date;
        pool.query(`INSERT INTO public.comentarios (author, comment, date, "postId")
        VALUES ($1, $2, $3, $4) RETURNING id`, [author, comment, date, postId]);

        res.sendStatus(200);
    }
});

app.post(`/posts/:id/edit`, (req, res) => { //edição de posts
    console.log(req.body);
    let {editedTitle, editedContent, editedTags, editedTagsOriginalSize} = req.body;

    console.log(editedTitle);
    console.log(editedContent);
    console.log(editedTags);

    let editedTagsSize = editedTags.length;

    if (!editedTitle || !editedContent || !editedTags) {
        res.status(500).send("Todos os campos devem estar preenchidos.");
    }else if (editedTitle.length < 4) {
        res.status(500).send("O título deve ter ao menos 4 caracteres.");
    }else if (editedContent.length < 10) {
        res.status(500).send("O conteúdo do post deve ter ao menos 10 caracteres.");
    }else if (editedTagsSize < 1 || editedTagsSize != editedTagsOriginalSize) {
        res.status(500).send("Deve haver ao menos uma tag. Obs: cada tag deve ter ao menos 4 caracteres.");
    }else {
        console.log("Editando post...");
        pool.query(
            `UPDATE public.dadosblogjs
            SET title = $1, content = $2, tags = $3
            WHERE id = $4`,
            [editedTitle, editedContent, editedTags, req.params.id],
            (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res);
            }
        );

        res.sendStatus(200);
    }
});