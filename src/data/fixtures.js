import casual from 'casual'
import { times } from 'lodash'

export default (Spot, User) => {
  times(10, async () => {
    const user = await User.create({
      email: casual.email,
      password: casual.password,
      firstName: casual.first_name,
      lastName: casual.last_name,
      stance: casual.random_element(['goofy', 'regular']),
      gear: casual.text,
      links: casual.url,
      description: casual.text,
      zipCode: casual.zip(5)
    })

    times(10, async () => {
      Spot.create({
        title: casual.title,
        author: user.id,
        attributes: casual.random_element(['Stairs', 'Kicker', 'Pool']),
        type: casual.random_element(['Street', 'Park']),
        description: casual.text,
        rating: casual.integer(0, 5),
        pictures: [casual.url],
        location: [casual.latitude, casual.longitude]
      })
    })
  })
}
