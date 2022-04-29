# Directed Acyclic Graph for Flight Routes

Project bootstrapped using [NodeJS Starter ToolKit](https://github.com/vitorsalgado/create-nodejs-ts).  
Visit the repository for more details.

## Story

There are over 100,000 flights a day, with millions of people and cargo being transferred around the world. With so many people, and different carrier/agency groups it can be hard to track where a person might be. In order to determine the flight path of a person, we must sort through all of their flight records.

## Goal

To create a microservice API that can help us understand and track how a particular person’s flight path may be queried. The API should accept a request that includes a list of flights, which are defined by a source and destination airport code. These flights may not be listed in order and will need to be sorted to find the total flight paths starting and ending airports.

## Alpha Version

This is test/example purpose implementation of an API
to request flight routes for a specific/particular person.
No audited.No security layer is used for this example.
DO NOT USE THIS CODE IN PRODUCTION

The API accept a list of flights, which are defined by a source and destination airport code

Two endpoints are exposed based on a specific person flight history:

```
Params:
"orig" in this context is the origin airport code
"dest" in this context is the destination airport code

GET /:orig/:dest // Give a list of possible routes from origin to destination
PUT /:orig/:dest // Store a new "hypothetical" route in history

Example:
// Fork edge 1
curl -X PUT localhost:7070/A/B -> Edge A->B
curl -X PUT localhost:7070/B/C ....
curl -X PUT localhost:7070/C/D ....

// Fork edge 2
curl -X PUT localhost:7070/A/E -> Edge A->E
curl -X PUT localhost:7070/E/F ....
curl -X PUT localhost:7070/F/D ....

// Expected routes for "person" in flight from A to D
curl -X GET localhost:7070/A/D -> [[A,B,C,D], [A,E,F,D]]


```

## Usage

Start server: `make up`

Run test: `make test`

Format code: `make fmt`

Check: `make check`

Refs:

* Princeton Algorithms<https://algs4.cs.princeton.edu/42digraph/>
* Potential implementation for gRPC <https://grpc.io/docs/languages/node/basics/>



