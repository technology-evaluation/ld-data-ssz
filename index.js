const p = require('barnard59')
const path = require('path')

function convertCsvw (filename) {
  const filenameInput = 'input/' + filename
  const filenameMetadata = filenameInput + '-metadata.json'
  const filenameOutput = 'target/' + path.basename(filename, '.csv') + '.nt'

  return p.rdf.dataset().import(p.file.read(filenameMetadata).pipe(p.jsonld.parse())).then((metadata) => {
    return p.run(p.file.read(filenameInput)
      .pipe(p.csvw.parse({
        baseIRI: 'file://' + filename,
        metadata: metadata
      }))
      .pipe(p.filter((quad) => {
        return quad.predicate.value !== 'http://ld.stadt-zuerich.ch/statistics/property/XXX'
      }))
      .pipe(p.map((quad) => {

        let subject = quad.subject
        let predicate = quad.predicate
        let object = quad.object

        if(subject.termType == 'NamedNode') {
          subject = p.rdf.namedNode(subject.value.replace(/\/XXX0000/g, ''))
        }

        if (predicate.value === 'http://ld.stadt-zuerich.ch/statistics/property/WERT') {
          const value = object.value.split(' ').join('')

          var valnumber

          // workaround to kick out all non-numbers. TODO issue #33
          if(isNaN(parseFloat(value))) {
            valnumber = 0
          } else {
            valnumber = parseFloat(value)
          }
          
          object = p.rdf.literal(valnumber, object.datatype)
        }

        if( predicate.value === 'http://ld.stadt-zuerich.ch/statistics/property/ZEIT') {
          const year  = 0
          const month = 0
          const day = 0
        }

        return p.rdf.quad(subject, predicate, object)
      }))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write(filenameOutput)))
  })
}

function convertXlsx (filename, sheet, metadata) {
  const filenameInput = 'input/' + filename
  const filenameMetadata = 'input/' + metadata
  const filenameOutput = 'target/' + path.basename(filename, '.xlsx') + '.' + path.basename(metadata, '.csv-metadata.json') + '.nt'

  return p.rdf.dataset().import(p.file.read(filenameMetadata).pipe(p.jsonld.parse())).then((metadata) => {
    return p.run(p.file.read(filenameInput)
      .pipe(p.csvw.xlsx.parse({
        baseIRI: 'file://' + filename,
        metadata: metadata,
        sheet: sheet
      }))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write(filenameOutput)))
  })
}

const filenames = [
  'hdb.csv'
]

const xlsxSources = [{
  filename: "HDB_Listen.xlsx",
  sheet: 'Referenznummern',
  metadata: 'referenznummern.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Raum',
  metadata: 'raum.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Kennzahlen',
  metadata: 'kennzahlen.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Gruppenliste',
  metadata: 'gruppenliste.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Gruppenliste',
  metadata: 'gruppenliste_dimension.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Namenliste',
  metadata: 'namenliste.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Ortliste',
  metadata: 'ortliste.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Codeliste',
  metadata: 'codeliste.csv-metadata.json'
},{
  filename: 'HDB_Listen.xlsx',
  sheet: 'Codeliste_Namen',
  metadata: 'codeliste_namen.csv-metadata.json'
}
]

p.run(() => {
  p.shell.mkdir('-p', 'target/')
}).then(() => {
  return p.Promise.serially(filenames, (filename) => {
    console.log('convert: ' + filename)

    return convertCsvw(filename)
  })
}).then(() => {
  return p.Promise.serially(xlsxSources, (source) => {
    console.log('convert: ' + source.filename + ' ' + source.sheet)

    return convertXlsx(source.filename, source.sheet, source.metadata)
  })
}).then(() => {
  console.log('done')
}).catch((err) => {
  console.error(err.stack)
})
