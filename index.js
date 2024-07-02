const express = require('express');
const bodyParser = require('body-parser');
const refeicaoRoutes = require('./routes/refeicaoRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(bodyParser.json());
app.use('/api/refeicoes', refeicaoRoutes);
const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});