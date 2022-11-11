const { Show } = require('./Show')
const { User } = require('./User')

Show.belongsToMany(User, { through: 'UserNdShow'})
User.belongsToMany(Show, { through: 'UserNdShow'})

module.exports = {Show, User}
