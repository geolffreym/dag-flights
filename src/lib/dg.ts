// Define alias type for object with edge entries
type Edges = { [key: string]: Set<string> }
// Alias for nested 2D path array
type Paths = string[][]

/**
 * @class
 * @classdesc Directed acyclic graph implementation
 * @see https://algs4.cs.princeton.edu/home/
 *
 * @param adjacent collection of mapped edges
 * @param paths state for possible paths 
 * @param vertices keep tracking of created vertices
 * @param edges edges Number of current created edges
 *
 */
export default class DirectedGraph {
  adjacent: Edges
  paths: Paths
  vertices: Set<string>
  edges: number

  constructor() {
    this.adjacent = {}
    this.vertices = new Set()
    this.paths = []
    this.edges = 0
  }

  /**
   * Append a new vertex to adjacency mapping
   * @param vertex
   */
  addVertex(vertex: string): DirectedGraph {
    if (this.vertices.has(vertex)) return this

    this.vertices.add(vertex)
    this.adjacent[vertex] = new Set()
    return this
  }

  /**
   * Link two vertex by a new edge
   * @param origin from node to link the edge
   * @param destination to node to link the edge
   */
  addEdge(origin: string, destination: string): DirectedGraph {
    this.adjacent[origin].add(destination)
    this.edges++
    return this
  }

  /**
   * Generate all possible routes from root to destination
   * @param root The source node to start
   * @param dest Where are we trying to go?
   * @param path Recursive path list
   */
  generatePaths(root: string, dest: string, path: string[] = []): Paths {
    // Reached back the initial node
    // When the search is done the root is reflexive
    if (root === dest) {
      // Add paths list as a new block of paths
      this.paths.push(path)
    } else {
      // For each node in adjacency wit root find
      this.adjacent[root].forEach((vertex: string) => {
        // Add each vertex for current processing root
        const newPath = path.concat([vertex])
        // Generate paths recursively
        this.generatePaths(vertex, dest, newPath)
      })
    }

    return this.paths
  }
}
