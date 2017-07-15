import { User } from '../../data/database'

const findOne = (root, { id }) => User.findById(id)

/* eslint-disable */
export { findOne }
