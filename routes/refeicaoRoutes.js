const express = require('express');
const router = express.Router();
const refeicaoController = require('../controllers/refeicaoController');

router.get('/', refeicaoController.getTodasRefeicoes);
router.get('/atual', refeicaoController.getRefeicaoAtual);
router.get('/passadas', refeicaoController.getRefeicoesPassadas);
router.post('/', refeicaoController.criarRefeicao);
router.delete('/:id', refeicaoController.removerRefeicao);

module.exports = router;