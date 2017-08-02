import { User } from '../../data/database'

export const findOne = id => User.findById(id)

export const update = (root, { id, data }) => User.update({ _id: id }, data)
