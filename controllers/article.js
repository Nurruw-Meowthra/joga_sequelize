const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

const getAllArticles = async (req, res) => {
  models.Article.findAll()
    .then(articles => {
      console.log(articles);
      return res.status(200).json(articles);
    })
    .catch(err => {
      console.error('Error fetching articles:', err);
      return res.status(500).json({ error: 'An error occurred while fetching articles.' });
    });
};

// show article by that slug
const getArticleBySlug = (req, res) => {
  models.Article.findOne({
    where: {
      slug: req.params.slug
    },
    include: [{
      model: models.Author,
    }],
  })
    .then(article => {
      return res.status(200).json({ article});
  })
    .catch(error => {
      return res.status(500).send(error.message);
  });
}

module.exports = {
  getAllArticles,
  getArticleBySlug
};