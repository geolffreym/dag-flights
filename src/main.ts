#!/usr/bin/env node
/**
 * Alpha Version
 * This is test/example purpose implementation of an API
 * to request flight routes for a specific/particular person.
 * No audited.No security layer is used for this example.
 * DO NOT USE THIS CODE IN PRODUCTION
 *
 * The API accept a list of flights, which are defined by a source and destination airport code
 *
 * Two endpoints are exposed based on a specific person flight history:
 * GET /:orig/:dest => Give a list of possible routes from origin to destination based on route history
 * PUT /:orig/:dest => Store a new "hypothetical" route in history
 *
 * Potential usage for gRPC for microservice communication
 * https://grpc.io/docs/languages/node/basics/
 */

import 'dotenv/config'
import express from 'express'
import DirectedGraph from './lib/dg.js'

// Default port
const PORT = process.env.PORT || 7070
const app = express()
const graph = new DirectedGraph()
const inMemoryDB: string[][] = []

// TIME IS OUT!!!
// Need finish test coverage for this endpoints!!
// TODO: write tests
// GET request handler to query routes from history
app.get('/:orig/:dest', (req: express.Request, res: express.Response) => {
  const origin = req.params.orig
  const destination = req.params.dest

  if (!origin || !destination) {
    res.sendStatus(400)
    res.send('Invalid request')
    return
  }

  const paths = graph.generatePaths(origin, destination, [origin])
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(paths))
})

// TODO: write tests
// PUT request handler to add route history
app.put('/:orig/:dest', (req: express.Request, res: express.Response) => {
  const origin = req.params.orig
  const destination = req.params.dest

  if (!origin || !destination) {
    res.sendStatus(400)
    res.send('Invalid request')
    return
  }

  // Initialize defined vertex
  graph.addVertex(origin)
  graph.addVertex(destination)

  // Keep vertex in memory
  inMemoryDB.push([origin, destination])
  // Create edge between vertex
  graph.addEdge(origin, destination)

  res.send(`[${origin}, ${destination}}] edge stored`)
})

// Start listening on port 3000
app.listen(PORT, () => {
  // @ts-ignore
  console.info(`Example app listening on port ${PORT}`)
})
