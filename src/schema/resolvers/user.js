import { User } from '../../data/database'

const findOne = id => User.findById(id)

const update = (root, { id, data }) => User.update({ _id: id }, data)

/* eslint-disable */
export { findOne, update }
