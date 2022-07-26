import once from 'lodash/once.js'
import rdf from 'rdf-ext'
import { Transform } from 'readable-stream'
import extractKey from './routing/extractKey.js'
import findCubes from './routing/findCubes.js'
import readDimensionFilters from './routing/readDimensionFilters.js'
import readRoutes from './routing/readRoutes.js'
import readZeit from './routing/readZeit.js'

const cubeIdRegex = /\/.{3}-.{3}-.{3}-.{3}-.{3}-.{3}\//

class Router extends Transform {
  constructor ({ cubes, dimensions, zeit }) {
    super({ objectMode: true })

    this.config = { cubes, dimensions, zeit }

    this.init = once(this._init.bind(this))
    this.routes = null
    this.zeit = null
  }

  async _init () {
    const dimensionFilters = await readDimensionFilters({
      filename: this.config.dimensions
    })

    this.routes = await readRoutes({
      dimensionFilters,
      filename: this.config.cubes
    })

    this.zeit = await readZeit({
      filename: this.config.zeit
    })
  }

  async _transform (quad, encoding, callback) {
    try {
      // remove dummy triples
      /* if (quad.predicate.value.startsWith('http://example.org/')) {
        return callback()
      } */

      await this.init()

      const subjects = this.mapTerm(quad.subject)

      for (const subject of subjects) {
        this.push(rdf.quad(subject, quad.predicate, quad.object, quad.graph))
      }

      callback()
    } catch (err) {
      callback(err)
    }
  }

  mapTerm (term) {
    if (term.termType !== 'NamedNode') {
      return [term]
    }

    const key = extractKey(term.value)

    if (!key) {
      return [term]
    }

    const cubes = findCubes({ key, routes: this.routes, zeit: this.zeit })

    if (cubes.length === 0) {
      console.error(`no cube routing found for: <${term.value}>`)
    }

    return cubes.map(cube => {
      return rdf.namedNode(term.value.replace(cubeIdRegex, `/${cube.id}/`))
    })
  }
}

function factory ({ cubes, dimensions, zeit }) {
  return new Router({ cubes, dimensions, zeit })
}

export default factory
