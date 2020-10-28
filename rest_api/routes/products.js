
const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;



// Pegar todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products;',
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error })}
                return res.status(200).send(result)
            }
        ) 
    });
});




// Inserir produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO products (name, brand, model, price, link, label) VALUES (?, ?, ?, ?, ?, ?)',
            [req.body.name, req.body.brand, req.body.model, parseFloat(req.body.price), req.body.link, req.body.label],
            (error, result, field) => {
                conn.release();

                if(error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    message: 'Produto cadastrado com sucesso!',
                    id: result.insertId
                });

            }
        );
    });
});



// Pegar produto pelo ID
router.get('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM products WHERE id = ?;',
            [req.params.id],
            (error, result, fields) => {
                if(error) { return res.status(500).send({ error: error })}
                return res.status(200).send(result)
            }
        ) 
    });
});



// Atualizar produto
router.patch('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE products SET name = ?, brand = ?, model = ?, price = ?, link = ?, label = ?
            WHERE id = ?`,
            [req.body.name, req.body.brand, req.body.model, parseFloat(req.body.price), req.body.link, req.body.label, req.params.id],
            (error, result, field) => {
                conn.release();

                if(error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    message: 'Produto alterado com sucesso!'
                });

            }
        );
    });
});



// Deletar produto
router.delete('/:id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { console.error(error); res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM products WHERE id = ?`,
            [req.params.id],
            (error, result, field) => {
                conn.release();

                if(error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    message: 'Produto deletado com sucesso!'
                });

            }
        );
    });
});


module.exports = router;