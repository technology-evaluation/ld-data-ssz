import { csvw, rdf } from '@tpluscode/rdf-ns-builders'

// const { csvw, rdf } = require('@tpluscode/rdf-ns-builders')

const csvwNs = csvw().value

function removeCsvwTriples (quad) {
  if (quad.predicate.value.startsWith(csvwNs)) {
    return false
  }
  if (rdf.type.equals(quad.predicate) && quad.object.value.startsWith(csvwNs)) {
    return false
  }
  return true
}

function removeExample (quad) {
  if (quad.predicate.value.startsWith('http://example.org/')) {
    return false
  }

  return true
}

function removeNullValues (quad) {
  if (quad.predicate.value === 'https://ld.stadt-zuerich.ch/statistics/property/XXX') {
    return false
  }
  return true
}

function all (quad) {
  return removeCsvwTriples(quad) && removeExample(quad) && removeNullValues(quad)
}

export {
  all,
  removeCsvwTriples,
  removeExample,
  removeNullValues
}
