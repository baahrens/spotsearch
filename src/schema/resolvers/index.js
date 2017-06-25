import { Spots, Users } from '../../data/database'

export const resolveSpots = async () => Spots.find()

export const resolveSpot = async id => Spots.findOne({ id })

export const resolveUser = async id => Users.findOne({ id })

export const resolveCreateSpot = async data => Spots.create(data)

export const resolveUpdateSpot = async (id, data) => Spots.update(id, data)
