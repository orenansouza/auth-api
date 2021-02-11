const knex = require('../../../config/knex')

exports.createUser = async (body) => {
  return knex('users')
    .insert({ ...body })
    .returning(['id', 'email', 'created_at', 'updated_at'])
    .then((user) => ({
      success: true,
      user,
    }))
    .catch((err) => ({ success: false, err }))
}

exports.getByEmail = async (email) => {
  return knex.select('*').from('users').where('email', email)
}

exports.getAllUsers = async ({ offset, limit }) => {
  const totalItems = await knex.count('* as count').from('users')
  const users = await knex.select(['id', 'email', 'created_at', 'updated_at']).from('users').offset(offset).limit(limit)

  return { totalItems: totalItems[0].count, users }
}
