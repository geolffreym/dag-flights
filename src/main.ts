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
import server from './server/'
const PORT = process.env.PORT || 7070

// Start listening on port 3000
server.listen(PORT, () => {
  console.info(`Example app listening on port ${PORT}`)
})
