const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/socialite_db', {
  dialect: 'postgres'
});

const User = db.define('user',{
  firstname:Sequelize.TEXT,
  lastname:Sequelize.TEXT,
  username:Sequelize.TEXT,
  password:Sequelize.TEXT,
  email:Sequelize.TEXT,
  image: Sequelize.TEXT
})
const Post = db.define('post',{
  content:Sequelize.TEXT,
  image:Sequelize.TEXT

})
const Comment = db.define('comment',{
  content:Sequelize.TEXT

})

User.hasMany(Post, {foreignKey: 'userId',onDelete:'cascade'});
Post.belongsTo(User, {foreignKey: 'userId'});

User.hasMany(Comment, {foreignKey: 'userId',onDelete:'cascade'});
Comment.belongsTo(User, {foreignKey: 'userId'});

Post.hasMany(Comment, {foreignKey: 'postId',onDelete:'cascade'});
Comment.belongsTo(Post,{foreignKey: 'postId'});

module.exports = {
    db,
    User,
    Post,
    Comment
};
