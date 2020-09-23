const rdf = require('rdf-ext')

function toNumber (quad) {
  if (quad.predicate.value.startsWith('http://example.org/measure/')) {
    const value = quad.object.value.split(' ').join('') // fixes numbers with spaces in it, ideally this should not happen anymore in the data
    let predicateUri = 'https://ld.stadt-zuerich.ch/statistics/measure/' + quad.predicate.value.slice('http://example.org/measure/'.length)

    let valnumber

    if (isNaN(parseFloat(value))) {
      // In case we do not get a parsable number we create a string out of it (on a special qb:MeasureProperty)
      predicateUri = 'https://ld.stadt-zuerich.ch/statistics/measure/KENNWERT'
    } else {
      valnumber = parseFloat(value)
      quad.object = rdf.literal(valnumber, 'http://www.w3.org/2001/XMLSchema#double')
    }

    quad.predicate = rdf.namedNode(predicateUri)
  }
  return rdf.quad(quad.subject, quad.predicate, quad.object)
}

module.exports = {
  toNumber
}
