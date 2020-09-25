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

function toBoolean (quad) {
  if (quad.predicate.value === 'http://example.org/UPDATE') {
    const conditions = ['QUE', 'KZE', 'WRT']
    var included = conditions.some(el => quad.object.value.includes(el))
    quad.predicate = rdf.namedNode('https://ld.stadt-zuerich.ch/statistics/attribute/KORREKTUR')

    if (included) {
      quad.object = rdf.literal('true', 'http://www.w3.org/2001/XMLSchema#boolean')
    } else {
      quad.object = rdf.literal('false', 'http://www.w3.org/2001/XMLSchema#boolean')
    }
  }
  return rdf.quad(quad.subject, quad.predicate, quad.object)
}

function toISODate (quad) {
  if (quad.predicate.value === 'https://ld.stadt-zuerich.ch/statistics/property/ZEIT') {
    const year = quad.object.value.substring(24, 28)
    const month = quad.object.value.substring(29, 31)
    const day = quad.object.value.substring(32, 34)

    if (((day === 'XX') && (month === 'XX'))) {
      quad.object = rdf.literal(year, 'http://www.w3.org/2001/XMLSchema#gYear')
    } else if (day === 'XX') {
      quad.object = rdf.literal(year + '-' + month, 'http://www.w3.org/2001/XMLSchema#gYearMonth')
    } else {
      quad.object = rdf.literal(year + '-' + month + '-' + day, 'http://www.w3.org/2001/XMLSchema#date')
    }
  }
  return rdf.quad(quad.subject, quad.predicate, quad.object)
}

module.exports = {
  toNumber,
  toBoolean,
  toISODate
}
