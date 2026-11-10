const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

const getArticlesByAuthorId = async (req, res) => {
    const authorId = req.params.authorId;
    models.Article.findAll({
        where: {
            author_id: authorId
        }
    })
        .then(articles => {
            return res.status(200).json(articles);
        })
        .catch(err => {
            console.error('Error fetching articles:', err);
            return res.status(500).json({ error: 'An error occurred while fetching articles.' });
        });
} 

module.exports = {
    getArticlesByAuthorId
};