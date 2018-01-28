const p = require('barnard59')
const path = require('path')
const program = require('commander')

function convertCsvw (filename, metadata) {
  const filenameInput = 'input/' + filename
  const filenameMetadata = 'input/' + metadata
  const filenameOutput = 'target/' + path.basename(metadata, '.csv-metadata.json') + '.nt'
  const filenameOutputDimensions = 'target/' + path.basename(metadata, '.csv-metadata.json') + '-meta.nt'

  const dimensions = {}
  const dataset = p.rdf.dataset()

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

        if(subject.termType == 'NamedNode' ) {
          const newUri = subject.value.replace(/\/XXX0000/g, '')
          const predUri = predicate.value
          subject = p.rdf.namedNode(newUri)

          dimensions[newUri] = dimensions[newUri] || new Set()
          if(predUri.includes('/property/')) {
            const uniquedimension = predUri.slice('http://ld.stadt-zuerich.ch/statistics/property/'.length)
            dimensions[newUri].add(predUri)
          }

        } 
        
        if(object.termType == 'NamedNode' ) {
          object = p.rdf.namedNode(object.value.replace(/\/XXX0000/g, ''))
        }

        if(predicate.value.startsWith('http://ld.stadt-zuerich.ch/statistics/measure/')) {

          const value = object.value.split(' ').join('')

          var valnumber

          // workaround to kick out all non-numbers. TODO issue #33
          if (isNaN(parseFloat(value))) {
            valnumber = 0
          } else {
            valnumber = parseFloat(value)
          }
          
          object = p.rdf.literal(valnumber, object.datatype)
        }

        if (predicate.value === 'http://ld.stadt-zuerich.ch/statistics/property/ZEIT') {
          const year  = object.value.substring(5,9)
          const month = object.value.substring(3,5)
          const day = object.value.substring(1,3)

          if ((day === 'XX') && (month === 'XX')) {
            object = p.rdf.literal(year, 'http://www.w3.org/2001/XMLSchema#gYear')
          } else if (day === 'XX') {
            object = p.rdf.literal(year + '-' + month, 'http://www.w3.org/2001/XMLSchema#gYearMonth')
          } else {
            object = p.rdf.literal(year + '-' + month + '-' + day, 'http://www.w3.org/2001/XMLSchema#date')
          }
        }

        return p.rdf.quad(subject, predicate, object)
      }))
      .pipe(p.ntriples.serialize())
      .pipe(p.file.write(filenameOutput)))
  }).then(() => {

    uniq(Object.values(dimensions).map(dimension => Array.from(dimension).sort().join(' '))).forEach((dimensionString) => {
      const dimension = dimensionString.split(' ')

      const uripattern = dimension.map(element => {
          return element.slice('http://ld.stadt-zuerich.ch/statistics/property/'.length)
        }).sort().join('/')

      const datasetNode = p.rdf.namedNode('http://ld.stadt-zuerich.ch/statistics/dataset/' + uripattern)
      const dsdNode = p.rdf.namedNode('http://ld.stadt-zuerich.ch/statistics/structure/' + uripattern)
      const componentNode = p.rdf.blankNode()

      
      dataset.add(p.rdf.quad(datasetNode, p.rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), p.rdf.namedNode('http://purl.org/linked-data/cube#DataSet')))
      dataset.add(p.rdf.quad(datasetNode, p.rdf.namedNode('http://purl.org/linked-data/cube#structure'), dsdNode))
      dataset.add(p.rdf.quad(dsdNode, p.rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), p.rdf.namedNode('http://purl.org/linked-data/cube#DataStructureDefinition')))
      dataset.add(p.rdf.quad(dsdNode, p.rdf.namedNode('http://purl.org/linked-data/cube#component'), componentNode))

      dimension.forEach((predicate) => {
        dataset.add(p.rdf.quad(componentNode, p.rdf.namedNode('http://purl.org/linked-data/cube#dimension'), p.rdf.namedNode(predicate)))
      })

    })


    p.run(dataset.toStream().pipe(p.ntriples.serialize()).pipe(p.file.write(filenameOutputDimensions)))
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

var uniq = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

const filenames = [{
  filename: 'hdb.csv',
  metadata: 'hdb.csv-metadata.json'
},//{
 // filename: 'hdb.csv',
  //metadata: 'hdb_referenznummer.csv-metadata.json'
//},
{
  filename: 'hdb_mapping.csv',
  metadata: 'hdb_mapping.csv-metadata.json'
}
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

program
  .option('-b, --hdb', 'Convert HDB.csv')
  .option('-l, --lists', 'Convert Excel lists')
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}


p.run(() => {
  p.shell.mkdir('-p', 'target/')
}).then(() => {
    if (program.hdb) {
      return p.Promise.serially(filenames, (source) => {
        console.log('convert: ' + source.filename)
        return convertCsvw(source.filename, source.metadata)
      })
    }
    if (program.lists) {
      return p.Promise.serially(xlsxSources, (source) => {
        console.log('convert: ' + source.filename + ' ' + source.sheet)
        return convertXlsx(source.filename, source.sheet, source.metadata)
      })
    }
}).then(() => {
  console.log('done')
}).catch((err) => {
  console.error(err.stack)
})
