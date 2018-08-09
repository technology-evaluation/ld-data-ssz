# Statistik Stadt Zürich: RDF Data Cube Pipeline

## Struktur

* `input` - Enthält die CSV on the Web JSON-Konfiguration. Die Daten selber werden über WebDAV bezogen und werden nicht im Github Repository gepflegt.
* `config` - Enthält Templates von config-Dateien für die benötigten Tools
* `scripts` - Enthält diverse Shell-Scripte, um die Generierung möglichst vollständig zu automatisieren. Bedingt ein Unix-System, geschrieben und getestet auf macOS.
* `target` - Wird erstellt durch die Scripte und enthält die zwischen- und Endresultate in [N-Triples](https://en.wikipedia.org/wiki/N-Triples) Serialisierung. Die finale Datei heisst `everything.nt.gz` und ist mit gzip komprimiert.
* `sparql` - Enthält SPARQL Abfragen, welche in der Pipeline ausgeführt werden. Diese werden benötigt, um den vollständigen Graphen automatisiert zu bauen.
* `package.json` - Stellt die eigentliche Pipeline zur Verfügung.


## CSV on the Web

Die Transformation basiert auf dem neuen CSV on the Web Standard vom W3C. Folgende Dokumente dienten als Grundlage für die Konfiguration:

* [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/tabular-data-model/)
* [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/tabular-metadata/)
* [CSV on the Web: A Primer](https://www.w3.org/TR/tabular-data-primer/)

Für die Transformation wird eine von Zazuko in JavaScript (Node.js) geschriebene Implementation von CSV on the Web verwendet: [A CSV on the Web parser with RDFJS Stream interface](https://github.com/rdf-ext/rdf-parser-csvw). Der Parser implementiert aktuell nicht den vollständigen Standard, ist aber massiv performanter als die anderen uns bekannten Implementationen.

## Daten Pipeline

Die Daten werden durch verschiedene Scripte generiert. Die produktive Pipeline wird automatisiert in einer Gitlab-Umgebung ausgeführt. Die Daten werden dabei in das [RDF Data Cube](https://www.w3.org/TR/vocab-data-cube/) Vokabular überführt.

### Anforderungen

* [Apache Jena](https://jena.apache.org/download/index.cgi) (bedingt Java Umgebung). Die Kommanozeilen-Werkzeuge müssen im `PATH` sein
* [Serd](https://drobilla.net/software/serd), ebenfalls im `PATH`
* [Node.js](https://nodejs.org/)
* Unix Umgebung wie MacOS, FreeBSD oder Linux
  * curl
  * sh
  * sed

Alternativ kann das folgende Docker-Image verwendet werden: [zazukoians/node-java-jena](https://hub.docker.com/r/zazukoians/node-java-jena/). Dieses Docker-Image wird von der Pipeline selber verwendet und über Gitlab automatisiert ausgeführt. Details können der [Gitlab YAML Datei](.gitlab-ci.yml) entnommen werden.

### Ausführung

Die Konvertierung kann von Hand gestartet werden. Dazu muss initial folgendes ausgeführt werden: `npm install`

Danach kann mit `npm run` angezeigt werden, was ausgeführt werden soll. Bitte zum Testen ausschliesslich `npm run build` ausführen!

