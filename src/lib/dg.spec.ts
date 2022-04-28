
import DirectedGraph from './dg'


describe('DirectedGraph Test', function () {
    it('should contain defined vertex list', function () {
        const g = new DirectedGraph()
        const expectedVertexList = JSON.stringify(["A", "B", "C", "D", "E", "F", "G", "H", "I"])

        g.addVertex("A")
            .addVertex("B")
            .addVertex("C")
            .addVertex("D")
            .addVertex("E")
            .addVertex("F")
            .addVertex("G")
            .addVertex("H")
            .addVertex("I");

        expect(g.vertices.size).toBe(9)
        expect(JSON.stringify(Array.from(g.vertices)) == expectedVertexList).toBeTruthy()
        expect(JSON.stringify(Object.keys(g.adjacent)) == expectedVertexList).toBeTruthy()

    })

    it('should contain defined edged for defined mapping vertex', function () {
        const g = new DirectedGraph()
        const expectedEdgeMapping = JSON.stringify({
            A: new Set(['B']),
            B: new Set(['C']),
            C: new Set(['D']),
            D: new Set([])
        })

        g.addVertex("A").addVertex("B").addVertex("C").addVertex("D");
        g.addEdge("A", "B").addEdge("B", "C").addEdge("C", "D");

        expect(g.edges).toBe(3)
        expect(JSON.stringify(g.adjacent) === expectedEdgeMapping).toBeTruthy()

    })

    it('should return expected paths', function () {
        const g = new DirectedGraph()
        const expectedPaths = JSON.stringify(
            [
                ['A', 'B', 'C', 'D'], // Fork 1
                ['A', 'E', 'F', 'D'], // Fork 2
                ['A', 'G', 'H', 'I', 'D'] // Fork 3
            ]
        )

        g.addVertex("A")
            .addVertex("B")
            .addVertex("C")
            .addVertex("D")
            .addVertex("E")
            .addVertex("F")
            .addVertex("G")
            .addVertex("H")
            .addVertex("I");

        // Fork 1
        g.addEdge("A", "B")
            .addEdge("B", "C")
            .addEdge("C", "D");

        // Fork 2
        g.addEdge("A", "E")
            .addEdge("E", "F")
            .addEdge("F", "D");

        // Fork 3
        g.addEdge("A", "G")
            .addEdge("G", "H")
            .addEdge("H", "I")
            .addEdge("I", "D");

        const paths = g.generatePaths("A", "D", ["A"])
        expect(JSON.stringify(paths) === expectedPaths).toBeTruthy()

    })


})
