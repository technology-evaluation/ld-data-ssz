# Statistik Stadt Zürich: RDF Cube Pipeline

This repository contains the pipeline to convert HDB data as CSV to RDF. As representation, [RDF Cube Schema](https://github.com/zazuko/rdf-cube-schema) is used. 

The pipeline is run in a private Gitlab instance, the result is published on https://ld.stadt-zuerich.ch/sparql/. The SPARQL query endpoint is available at `https://ld.stadt-zuerich.ch/query`

We provide a [.well-known/void](https://ld.stadt-zuerich.ch/.well-known/void) structure that points to relevant metadata.

If you have questions about the pipeline or the data set, create a new issue in this repository.

## Structure

* `input` - Contains static metadata that is read in the pipeline.
* `lib` - Contains custom code used in the RDF production pipeline. 
* `mappings` - Contains all the [XRM](https://github.com/zazuko/expressive-rdf-mapper) mapping files needed to map the data to RDF. This is the single source of truth for the mapping of all the dimensions.
* `observatios` - Contains the mapping for the observations itself. This is the single source of truth for the mapping of the main observation. For historical reasons this is still maintained in a plain JSON file (CSVW standard) instead of XRM. 
* `pipelines` - Contains the [barnard59](https://github.com/zazuko/barnard59) pipelines that run the conversion itself. Barnard59 is a declarative way to run RDF conversion pipelines.
* `scripts` - Contains the shell scripts needed to run the pipeline.
* `sparql` - Contains SPARQL queries that are run in the pipeline.
* `output` - In case the pipeline is run locally, this directory contains the resulting N-Triples file.
* `src-gen` - Generated CSV on the Web mapping files. This folder is generated from the content in the `mappings` directory. Do *not* do any mapping updates in there, it will be overwritten.
* `package.json` - Dependencies & pipeline definitions.


## CSV on the Web

The transformation is based on the CSV on the Web mapping standard by W3C:

* [Model for Tabular Data and Metadata on the Web](https://www.w3.org/TR/tabular-data-model/)
* [Metadata Vocabulary for Tabular Data](https://www.w3.org/TR/tabular-metadata/)
* [CSV on the Web: A Primer](https://www.w3.org/TR/tabular-data-primer/)

Our barnard59 mapping pipeline [provides a module](https://github.com/rdf-ext/rdf-parser-csvw) to process these CSV on the Web mapping files.

## Data Pipeline

The pipeline is run in a CI-Job on GitLab. It is using the standard node.js docker file to execute the RDF pipeline. Details for the configuration and the execution of the scripts can be found in the [Gitlab YAML](.gitlab-ci.yml) file.

### Usage

You can run the pipeline manually given that you have a valid SSH key to get the input data from the sftp server. We also need a unix-like environment like MacOS or Linux and node.js to execute the pipeline. To install all dependencies run `npm install` in the root of this repository.

Once install is finished you can run:

* `npm run fetch` to get the data from the sftp server.
* `npm run output:file` to convert all observations and dimensions.

As a result, a file is written to the `output` directory on your local filesystem.


# License
This program is licensed under [3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause):
Copyright 2018-2021 Statistik Stadt Zürich

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
