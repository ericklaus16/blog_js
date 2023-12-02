const express = require('express');
const app = express();
const { pool } = require("./dbConfig"); //configuração feita em dbConfig para conectar-se ao postgre
const cors = require('cors'); //permite que o front-end faça requisições a este back-end
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
    console.log("Retornando posts para aplicação...");
    const posts = await pool.query(`SELECT * FROM public.dadosblogjs`);
    return res.json(posts.rows);
});

app.get(`/posts/:id`, async (req, res) => { //id = parâmetro 1
    const posts = await pool.query(`SELECT * FROM public.dadosblogjs`);
    return res.json(posts.rows[req.params.id - 1]);
});

app.use(bodyParser.json());
app.post(`/create`, (req, res) => { //inserção de um novo post
    console.log(req.body);
    let {title, content} = req.body;
    let date = new Date; //data gerada no momento
    let tags = ["tag1", "tag2"]; //tags pré-definidas por enquanto

    //verificação básica de erros
    if (!title || !content) {
        res.status(500).send("Preencha todos os campos.");
    }else if (title.length < 4) {
        res.status(500).send("O título deve ter ao menos 4 caracteres.");
    }else if (content.length < 10) {
        res.status(500).send("O conteúdo do post deve ter ao menos 10 caracteres.");
    }else {
        pool.query (
            `INSERT INTO public.dadosblogjs (title, content, date, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [title, content, date, tags],
        );
        
        res.sendStatus(200);
    }
})