 // Alias type for vertices set
type Vertex = Set<string>
// Define alias type for object with edge entries
type Edges = { [key: string]: Vertex }
// Alias for nested 2D path array
type Paths = string[][]

/**
 * @class
 * @classdesc Directed acyclic graph implementation
 * @see https://algs4.cs.princeton.edu/home/
 *
 * @param adjacent - collection of mapped edges
 * @param vertices - keep tracking of created vertices
 * @param edges - number of current created edges
 *
 */
export default class DirectedGraph {
  adjacent: Edges
  vertices: Vertex
  edges: number

  constructor() {
    this.adjacent = {}
    this.vertices = new Set()
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
   * @param paths Recursive list of paths
   */
  routes(root: string, dest: string, path: string[] = [], paths: Paths = []): Paths {
    // Nothing to process here
    if (Object.keys(this.adjacent).length === 0) return paths
    // Reached back the initial node
    // When the search is done the root is reflexive
    if (root === dest) {
      // Add paths list as a new block of paths
      paths.push(path)
    } else {
      // For each node in adjacency with root
      this.adjacent[root].forEach((vertex: string) => {
        // Add each vertex for current processing root
        const newPath = path.concat([vertex])
        // Generate paths recursively checking fo each sub node
        this.routes(vertex, dest, newPath, paths)
      })
    }

    return paths
  }
}
