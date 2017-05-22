# Statistik Zürich - Architektur

## CMS/Web Komponente (Diagram Web Component)

* SSZVIS wird in generische Webkomponenten gekapselt
* Was heute noch JS/HTML Code ist, kann über jeweilige Komponenten gesteuert werden
* Diese Komponenten wissen nichts von RDF und dem "Consumer API", Funktionalität genau so wie heute

## Komponente (Widget Web Component)

* Erweitert die CMS/Web Komponenten um Funktionalität, auf das REST API "Statistische Information" zuzugreifen.
* Unterstützt Domänen SpezialistInnen entsprechend, um die richtigen Visualisierungen/Antworten (OGD Zugang etc.) anzubieten
* Parametrisierung beschränkt sich auf Dinge, welche in der entsprechenden Visualisierung/Präsentation Sinn machen
* Weitergehende Änderungen müssen im "Consumer API" parametrisiert werden

## Statistische Information (Hydra Operation)

* "Consumer API"
* Exponiert die verfügbaren Tabellen/Kombinationen via REST API ([Hydra](http://www.hydra-cg.com/))
* Abstrahiert RDF Data Cubes aus Sicht Consumer
* Etwaige Änderungen (sowohl auf Consumer- wie Providerseite) können darüber abstrahiert werden
* Zusätzliche Funktionalität wie Hierarchien etc. können darüber abstrahiert werden
* Transparent, im Sinn von Mappings auf SPARQL Abfragen sind zugänglich und versioniert
* HTTP Caching

### Frontend Statistische Information

* Frontend für Domänen SpezialistInnen, welche neue Tabellen definieren respektive bestehende ändern können
* Frontend wird erstellt in Zusammenarbeit mit Frontend-Programmierern
* Elementarer Teil, teil von "Statistische Information"

## Abfrage/Erweiterte Abfrage (SPARQL Query)

* "Provider API"
* Generiert SPARQL Abfragen auf die jeweiligen Data Cubes
* Lieferung entsprechender Serialisierungen/Result-Sets


## Thematische Hierarchie

* Komplett in RDF wiedergegeben, damit man entsprechend suchen kann
* Verlinkung auf die entsprechenden Texte, idealerweise ebenfalls in RDF verfügbar (Lucene indexes)

## Datenpipeline

* Erstellt RDF Data Cubes & entsprechende Metadaten aus den Erhebungen
* Metadaten & Hierarchie sollte wenn möglich an einer anderen Stelle (z.b. im Frontend Statistische Information) gepflegt werden können