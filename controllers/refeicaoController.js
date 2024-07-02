const pool = require('../config/db');

exports.getTodasRefeicoes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM refeicoes ORDER BY data DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar todas as refeições' });
  }
};

exports.getRefeicaoAtual = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM refeicoes WHERE data = CURRENT_DATE');
    res.json(result.rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar refeição atual' });
  }
};

exports.getRefeicoesPassadas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM refeicoes WHERE data < CURRENT_DATE ORDER BY data DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar refeições passadas' });
  }
};

exports.criarRefeicao = async (req, res) => {
  const { nome, descricao, data } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO refeicoes (nome, descricao, data) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, data]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar refeição' });
  }
};

exports.removerRefeicao = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM refeicoes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Refeição não encontrada' });
    }
    res.status(200).json({ message: 'Refeição removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover refeição' });
  }
};