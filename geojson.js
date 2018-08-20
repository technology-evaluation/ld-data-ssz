
const p = require('barnard59')
const parseGeoJson = require('./lib/parse-geojson')

const files = [{
  input: 'stadtkreise.json',
  output: 'stadtkreise.nt',
  subject: 'http://ld.stadt-zuerich.ch/geo/kreis/${knr}'
}, {
  input: 'statistische_quartiere.json',
  output: 'statistische_quartiere.nt',
  subject: 'http://ld.stadt-zuerich.ch/geo/quartier/${qnr}'
}]

Promise.all(files.map(file => {
  const stream =
    p.file.read('input/geojson/'+file.input)
      .pipe(parseGeoJson(file.subject, 'http://www.opengis.net/ont/geosparql#hasGeometry'))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write('target/'+file.output))

  p.run(stream)
}))
