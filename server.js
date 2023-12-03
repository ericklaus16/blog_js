const express = require('express');
const app = express();
const { pool } = require("./dbConfig"); //configuração feita em dbConfig para conectar-se ao postgre
//const cors = require('cors'); //permite que o front-end faça requisições a este back-end
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
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

app.use(bodyParser.json());
app.post(`/create`, (req, res) => { //inserção de um novo post
    console.log(req.body);
    let {title, content, tags} = req.body;
    let date = new Date; //data gerada no momento
    let tagsArray = tags.split(",").filter(item => item.length >= 4).map(item => item.trim()); //converte para um array de string separando por vírgula
    
    console.log(tagsArray);
    console.log(tagsArray.length);
    //verificação básica de erros
    if (!title || !content) {
        res.status(500).send("Preencha todos os campos.");
    }else if (title.length < 4) {
        res.status(500).send("O título deve ter ao menos 4 caracteres.");
    }else if (content.length < 10) {
        res.status(500).send("O conteúdo do post deve ter ao menos 10 caracteres.");
    }else if (tagsArray.length < 1) {
        res.status(500).send("Adicione ao menos uma tag. Obs: cada tag deve ter ao menos 4 caracteres");
    }else {
        pool.query (
            `INSERT INTO public.dadosblogjs (title, content, date, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [title, content, date, tagsArray],
        );
        
        res.sendStatus(200);
    }
})

app.get(`/posts/:id/remove`, (req, res) => { //um esboço de como será a remoção de posts
    //let rem = true;
    let rem = false;
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
            `DELETE FROM public.comentarios WHERE postId = $1`,
            [req.params.id],
            (err, res) => {
                if (err) {
                    throw err;
                }
                console.log(res);
            }
        )
        console.log("Remoção feita com sucesso.");
        res.redirect("/posts");
    }else {
        console.log("Cliente não confirmou a remoção.");
        res.redirect("/posts/" + req.params.id);
    }
});

app.post(`/posts/:id/createComment`, (req, res) => { //um esboço de como será a criação de comentários
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
        pool.query(`INSERT INTO public.comentarios (author, comment, date, postId)
        VALUES ($1, $2, $3, $4) RETURNING id`, [author, comment, date, postId]);

        res.sendStatus(200);
    }
});