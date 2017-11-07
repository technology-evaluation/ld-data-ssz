# Statistik Zürich Data Cube Beispiel

## Struktur

* `input` - Enthält die CSV on the Web JSON-Konfiguration. Die Daten selber werden über WebDAV bezogen und sind nicht im Github Repository gepflegt.
* `scripts` - Enthält diverse Shell-Scripte, um die Generierung möglichst vollständig zu automatisieren. Bedingt ein Unix-System, geschrieben und getestet auf macOS.
* `target` - Wird erstellt durch die Scripte und enthält das Resultat in [N-Triples](https://en.wikipedia.org/wiki/N-Triples) Serialisierung
* `sparql` - SPARQL Abfragen als Beispiele


## CSV on the Web

Die Transformation basiert auf dem neuen CSV on the Web Standard vom W3C. Folgende Dokumente dienten als Grundlage für die Konfiguration:

* [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/tabular-data-model/)
* [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/tabular-metadata/)
* [CSV on the Web: A Primer](https://www.w3.org/TR/tabular-data-primer/)

Für die Transformation wird eine von Zazuko in JavaScript (Node.js) geschriebene Implementation von CSV on the Web verwendet: [A CSV on the Web parser with RDFJS Stream interface](https://github.com/rdf-ext/rdf-parser-csvw). Der Parser implementiert aktuell nicht den vollständigen Standard, ist aber massiv performanter als die anderen uns bekannten Implementationen.

## Daten Pipeline

Die Daten werden durch verschiedene Scripte im Verzeichnis `scripts` generiert. Dafür wird unter anderem Docker verwendet.

Die Daten werden in das [RDF Data Cube](https://www.w3.org/TR/vocab-data-cube/) Vokabular überführt.

### Ausführung

Die Konvertierung kann von Hand gestartet werden. Dazu muss initial folgendes ausgeführt werden: `npm install`

Danach kann mit `npm run` angezeigt werden, was ausgeführt werden soll. Bitte zum Testen ausschliesslich `npm run build-local` ausführen!

## SPARQL Beispiele

Im Verzeichnis SPARQL sind einige Abfragen enthalten, die gegenüber dem LINDAS SPARQL-Endpunkt getestet werden können.

Aktueller Endpunkt zum Testen: https://test.lindas-data.ch/sparql-ui/


