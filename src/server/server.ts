import express from 'express'
import DirectedGraph from '../lib/dg.js'

const server = express()
const graph = new DirectedGraph()
const inMemoryDB: string[][] = []

// GET request handler to query routes from history
server.get('/:orig/:dest', (req: express.Request, res: express.Response) => {
    const origin = req.params.orig
    const destination = req.params.dest

    if (!origin || !destination) {
        res.sendStatus(400)
        res.send('Invalid request')
        return
    }

    const paths = graph.routes(origin, destination, [origin])
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(paths))
})

// PUT request handler to add route history
server.put('/:orig/:dest', (req: express.Request, res: express.Response) => {
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


export default server