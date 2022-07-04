import toRouteId from './toRouteId.js'

function matchesCubeDimension (cube, key, nr) {
  if (!cube[`dimensionsCode${nr}`]) {
    return true
  }

  return cube[`dimensionsCode${nr}`].has(key[`dimensionscode${nr}`])
}

function findCubes ({
  routes,
  ...key
}) {
  const route = routes.get(toRouteId(key))

  if (!routes) {
    return []
  }

  return route.filter(cube => {
    return (
      matchesCubeDimension(cube, key, '1') &&
      matchesCubeDimension(cube, key, '2') &&
      matchesCubeDimension(cube, key, '3') &&
      matchesCubeDimension(cube, key, '4') &&
      matchesCubeDimension(cube, key, '5')
    )
  })
}

export default findCubes
