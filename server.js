const express = require('express');
const app = express();
const { pool } = require("./dbConfig"); //configuração feita em dbConfig para conectar-se ao postgre
const cors = require('cors'); //permite que o front-end faça requisições a este back-end
const bodyParser = require('body-parser'); //permite que o servidor manuseie dados enviados pelo front-end

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})

app.use(bodyParser.json()); //posts JSON
app.use(bodyParser.urlencoded({ extended: false })); //posts normais

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}: localhost:${PORT}`); //console imprime a porta em que o servidor está funcionando
})

app.get("/posts", async (req, res) => {
    const posts = await pool.query(`SELECT * FROM public.dadosblogjs`);
    return res.json(posts.rows);
});

app.get(`/posts/:id`, async (req, res) => { //id = parâmetro 1
    const posts = await pool.query(`SELECT * FROM public.dadosblogjs`);
    return res.json(posts.rows[req.params.id - 1]);
});

app.post(`/create`, (req, res) => { //inserção de um novo post
    console.log(req.body);

    let {title, content} = req.body;
    let date = new Date; //data gerada no momento
    let tags = ["tag1", "tag2"]; //tags pré-definidas por enquanto
    
    if (!(!title || !content)) { //campos preenchidos (esta é a única verificação por enquanto)
        pool.query (
            `INSERT INTO public.dadosblogjs (title, content, date, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [title, content, date, tags],
            (err, res) => {
                if (err) {
                    throw err;
                }
            }
        );
    }else {
        throw Error('Preencha todos os campos.');
    }
})
