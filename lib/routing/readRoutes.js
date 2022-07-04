import readCsv from './readCsv.js'
import toFilterId from './toFilterId.js'
import toRouteId from './toRouteId.js'

async function readRoutes ({ dimensionFilters, filename }) {
  const lines = await readCsv(filename)

  const routes = new Map()

  for (const raw of lines) {
    const cube = { raw }
    cube.kennzahl = raw.kennzahl

    const addDimension = nr => {
      cube[`dimension${nr}`] = raw[`dimension${nr}`] || 'XXX'

      const filterId = toFilterId({
        dimension: cube[`dimension${nr}`],
        filter: raw[`dimensionfilter${nr}`]
      })

      cube[`dimensionCodes${nr}`] = dimensionFilters.get(filterId)?.codes
    }

    addDimension('1')
    addDimension('2')
    addDimension('3')
    addDimension('4')
    addDimension('5')

    const id = toRouteId(raw)
    const route = routes.get(id)

    if (!route) {
      routes.set(id, [cube])
    } else {
      route.push(cube)
    }
  }

  return routes
}

export default readRoutes
