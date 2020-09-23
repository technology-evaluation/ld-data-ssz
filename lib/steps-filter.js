const { csvw, rdf } = require('@tpluscode/rdf-ns-builders')

const csvwNs = csvw().value

function removeCsvwTriples(quad) {
  if (quad.predicate.value.startsWith(csvwNs)) {
    return false
  }
  if (rdf.type.equals(quad.predicate) && quad.object.value.startsWith(csvwNs)) {
    return false
  }
  return true
}

function removeNullValues(quad) {
  if (quad.predicate.value === 'https://ld.stadt-zuerich.ch/statistics/property/XXX') {
    return false
  }
  return true
}

module.exports = {
  removeCsvwTriples,
  removeNullValues
}
