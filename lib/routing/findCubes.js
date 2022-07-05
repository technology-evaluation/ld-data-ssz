import toRouteId from './toRouteId.js'

function matchesCubeDimension (cube, key, nr) {
  if (!cube[`dimensionsCode${nr}`]) {
    return true
  }

  return cube[`dimensionsCode${nr}`].has(key[`dimensionscode${nr}`])
}

function matchesJahr (cube, key, zeit) {
  const jahr = zeit.get(key.zeit)?.jahr

  if (!jahr) {
    console.error(`could not find ZEIT record for ${key.zeit}`)

    return false
  }

  return jahr >= cube.jahrvon && jahr <= cube.jahrbis
}

function matchesRaum (cube, key) {
  if (!cube.raumfilter) {
    return true
  }

  return cube.raumfilter === key.raum
}

function findCubes ({
  key,
  routes,
  zeit
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
      matchesCubeDimension(cube, key, '5') &&
      matchesJahr(cube, key, zeit) &&
      matchesRaum(cube, key)
    )
  })
}

export default findCubes
