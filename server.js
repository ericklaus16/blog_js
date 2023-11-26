const express = require('express');
const app = express();
const { pool } = require("./dbConfig"); //configuração feita em dbConfig para conectar-se ao postgre
const cors = require('cors'); //permite que o front-end faça requisições a este back-end

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
})


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
