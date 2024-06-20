class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }

    addEdge(start, end, weight) {
        this.adjacencyList.get(start).push({ node: end, weight: weight });
        this.adjacencyList.get(end).push({ node: start, weight: weight }); // Since routes are bidirectional in Ticket to Ride
    }

    findShortestPath(start, end) {
        let distances = {};
        let backtrace = {};
        let pq = new PriorityQueue();

        distances[start] = 0;

        this.adjacencyList.forEach((_, vertex) => {
            if (vertex !== start) {
                distances[vertex] = Infinity;
            }
            pq.enqueue(vertex, distances[vertex]);
        });

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep.element;

            if (currentNode === end) {
                let path = [];
                let lastStep = end;
                while (lastStep !== start) {
                    path.unshift(lastStep);
                    lastStep = backtrace[lastStep];
                }
                path.unshift(start);
                console.log(`Shortest path from ${start} to ${end}: ${path.join(" -> ")}, requires ${distances[end]} train cards.`);
                return;
            }

            this.adjacencyList.get(currentNode).forEach(neighbor => {
                let alt = distances[currentNode] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    backtrace[neighbor.node] = currentNode;
                    pq.enqueue(neighbor.node, distances[neighbor.node]);
                }
            });
        }
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element, priority) {
        let newNode = { element, priority };
        let added = false;
        for (let i = 0; i < this.collection.length; i++) {
            if (newNode.priority < this.collection[i].priority) {
                this.collection.splice(i, 0, newNode);
                added = true;
                break;
            }
        }
        if (!added) {
            this.collection.push(newNode);
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

// Example Usage
let graph = new Graph();
let cities = ['A', 'B', 'C', 'D', 'E', 'F'];

cities.forEach(city => graph.addVertex(city));

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 3);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 2);
graph.addEdge('C', 'D', 4);
graph.addEdge('D', 'E', 2);
graph.addEdge('E', 'F', 6);

graph.findShortestPath('A', 'F'); // Find the shortest path from 'A' to 'F'
