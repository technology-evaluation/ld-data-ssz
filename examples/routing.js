import extractKey from '../lib/routing/extractKey.js'
import findCubes from '../lib/routing/findCubes.js'
import readDimensionFilters from '../lib/routing/readDimensionFilters.js'
import readRoutes from '../lib/routing/readRoutes.js'

const config = {
  cubes: '../data/HDB_CUBES.csv',
  dimensions: '../data/HDB_DIMENSIONEN.csv'
}

const iri = 'https://ld.stadt-zuerich.ch/statistics/GBF-ARA-GBA-XXX-XXX-XXX/observation/ARA2001-GBA2920-XXX0000-XXX0000-XXX0000-R30000-ZPJ001986'

async function main () {
  try {
    const dimensionFilters = await readDimensionFilters({
      filename: config.dimensions
    })

    const routes = await readRoutes({
      dimensionFilters,
      filename: config.cubes
    })

    const cubes = findCubes({
      ...extractKey(iri),
      routes
    })

    console.log(cubes)
  } catch (err) {
    console.error(err)
  }
}

main()
