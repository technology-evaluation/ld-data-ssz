# Statistik Zürich Data Cube Beispiel

## Struktur

* `input` - Enthält die komprimierten CSV Files (UTF-8 Export via OpenOffice) und die CSV on the Web JSON-Konfiguration
* `scripts` - Enthält diverse shell-scripte um die Generierung möglichst vollständig zu automatisieren. Bedingt ein Unix-System, geschrieben und getestet auf macOS.
* `target` - Wird erstellt durch die Scripte und enthält das Resultat in [N-Triples](https://en.wikipedia.org/wiki/N-Triples) Serialisierung
* `sparql` - SPARQL Abfragen als Beispiele

## CSV on the Web

Die Transformation basiert auf dem neuen CSV on the Web Standard vom W3C. Folgende Dokumente dienten als Grundlage für die Konfiguration:

* [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/tabular-data-model/)
* [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/tabular-metadata/)
* [CSV on the Web: A Primer](https://www.w3.org/TR/tabular-data-primer/)

Für die Transformation wird eine in Ruby geschriebene Implementation von CSV on the Web verwended: [
Tabular Data RDF Reader and JSON serializer
](https://github.com/ruby-rdf/rdf-tabular)

## Daten Pipeline


## SPARQL Beispiele

Im Verzeichnis SPARQL sind einige Abfragen enthalten, die gegenüber dem LINDAS SPARQL-Endpunkt getestet werden können.

Aktueller Endpunkt zum testen: https://lindasprd.netrics.ch/sparql/

Der SPARQL-Endpunkt wird noch falsch vorgegeben, die 10.0.0x Adresse muss durch https://lindasprd.netrics.ch/query ersetzt werden.

