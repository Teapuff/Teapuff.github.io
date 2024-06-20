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
                // console.log(`Shortest path from ${start} to ${end}: ${path.join(" -> ")}, requires ${distances[end]} train cards.`);
                console.log(`${start} to ${end} is ${distances[end]} point.`);
                alert(`${start} to ${end} is ${distances[end]} point.`);
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
// let cities = ['A', 'B', 'C', 'D', 'E', 'F'];
let cities = ['Vancouver', 'Seattle', 'Calgary', 'Helena', 'Portland', 'Salt Lake City', 'San Francisco', 'Los Angeles', 'Las Vegas', 'Phoenix', 'El Paso', 'Winnipeg', 'Duluth', 'Omaha', 'Denver', 'Santa Fe', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',];

cities.forEach(city => graph.addVertex(city));

graph.addEdge('Vancouver', 'Seattle', 1);
graph.addEdge('Vancouver', 'Calgary', 3);
graph.addEdge("Seattle", "Calgary", 4);
graph.addEdge("Seattle", "Helena", 6);
graph.addEdge("Seattle", "Portland", 1);
graph.addEdge("Portland", "Salt Lake City", 6);
graph.addEdge("Portland", "San Francisco", 5);
graph.addEdge("San Francisco", "Salt Lake City", 5);
graph.addEdge("San Francisco", "Los Angeles", 3);
graph.addEdge("Los Angeles", "Las Vegas", 2);
graph.addEdge("Los Angeles", "Phoenix", 3);
graph.addEdge("Los Angeles", "El Paso", 6);
graph.addEdge("Calgary", "Winnipeg", 6);
graph.addEdge("Calgary", "Helena", 4);
graph.addEdge("Helena"), "Winnipeg", 4);
graph.addEdge("Helena", "Duluth", 6);
graph.addEdge("Helena", "Salt Lake City", 3);
graph.addEdge("Helena", "Omaha", 5);
graph.addEdge("Helena"), "Denver", 4);
graph.addEdge("Salt Lake City", "Denver", 3);
graph.addEdge("Salt Lake City", "Las Vegas", 3);
graph.addEdge("Phoenix", "Denver", 5);
graph.addEdge("Phoenix", "Santa Fe", 3);
graph.addEdge(cityNames.getCityNumberFromName("Phoenix"), cityNames.getCityNumberFromName("El Paso"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Winnipeg"), cityNames.getCityNumberFromName("Sault St.Marie"), 6);
graph.addEdge(cityNames.getCityNumberFromName("Winnipeg"), cityNames.getCityNumberFromName("Duluth"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Duluth"), cityNames.getCityNumberFromName("Sault St.Marie"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Duluth"), cityNames.getCityNumberFromName("Toronto"), 6);
graph.addEdge(cityNames.getCityNumberFromName("Duluth"), cityNames.getCityNumberFromName("Chicago"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Duluth"), cityNames.getCityNumberFromName("Omaha"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Omaha"), cityNames.getCityNumberFromName("Chicago"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Omaha"), cityNames.getCityNumberFromName("Kansas City"), 1);
graph.addEdge(cityNames.getCityNumberFromName("Omaha"), cityNames.getCityNumberFromName("Denver"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Sault St.Marie"), cityNames.getCityNumberFromName("Montreal"), 5);
graph.addEdge(cityNames.getCityNumberFromName("Sault St.Marie"), cityNames.getCityNumberFromName("Toronto"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Chicago"), cityNames.getCityNumberFromName("Toronto"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Chicago"), cityNames.getCityNumberFromName("Pittsburch"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Chicago"), cityNames.getCityNumberFromName("Saint Louis"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Montreal"), cityNames.getCityNumberFromName("Boston"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Montreal"), cityNames.getCityNumberFromName("New York"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Montreal"), cityNames.getCityNumberFromName("Toronto"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Toronto"), cityNames.getCityNumberFromName("Pittsburgh"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Boston"), cityNames.getCityNumberFromName("New York"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Pittsburgh"), cityNames.getCityNumberFromName("New York"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Pittsburgh"), cityNames.getCityNumberFromName("Washington"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Pittsburgh"), cityNames.getCityNumberFromName("Raleigh"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Pittsburgh"), cityNames.getCityNumberFromName("Nashville"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Pittsburgh"), cityNames.getCityNumberFromName("Saint Louis"), 5);
graph.addEdge(cityNames.getCityNumberFromName("New York"), cityNames.getCityNumberFromName("Washington"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Washington"), cityNames.getCityNumberFromName("Raleigh"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Denver"), cityNames.getCityNumberFromName("Kansas City"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Denver"), cityNames.getCityNumberFromName("Oklahoma City"), 4);
graph.addEdge(cityNames.getCityNumberFromName("Denver"), cityNames.getCityNumberFromName("Santa Fe"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Santa Fe"), cityNames.getCityNumberFromName("Oklahoma City"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Santa Fe"), cityNames.getCityNumberFromName("El Paso"), 2);
graph.addEdge(cityNames.getCityNumberFromName("El Paso"), cityNames.getCityNumberFromName("Oklahoma City"), 5);
graph.addEdge(cityNames.getCityNumberFromName("El Paso"), cityNames.getCityNumberFromName("Dallas"), 4);
graph.addEdge(cityNames.getCityNumberFromName("El Paso"), cityNames.getCityNumberFromName("Houston"), 6);
graph.addEdge(cityNames.getCityNumberFromName("Oklahoma City"), cityNames.getCityNumberFromName("Kansas City"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Oklahoma City"), cityNames.getCityNumberFromName("Little Rock"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Oklahoma City"), cityNames.getCityNumberFromName("Dallas"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Kansas City"), cityNames.getCityNumberFromName("Saint Louis"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Dallas"), cityNames.getCityNumberFromName("Little Rock"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Dallas"), cityNames.getCityNumberFromName("Houston"), 1);
graph.addEdge(cityNames.getCityNumberFromName("Saint Louis"), cityNames.getCityNumberFromName("Nashville"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Saint Louis"), cityNames.getCityNumberFromName("Little Rock"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Little Rock"), cityNames.getCityNumberFromName("Nashville"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Little Rock"), cityNames.getCityNumberFromName("New Orleans"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Houston"), cityNames.getCityNumberFromName("New Orleans"), 2);
graph.addEdge(cityNames.getCityNumberFromName("New Orleans"), cityNames.getCityNumberFromName("Atlanta"), 4);
graph.addEdge(cityNames.getCityNumberFromName("New Orleans"), cityNames.getCityNumberFromName("Miami"), 6);
graph.addEdge(cityNames.getCityNumberFromName("Nashville"), cityNames.getCityNumberFromName("Raleigh"), 3);
graph.addEdge(cityNames.getCityNumberFromName("Nashville"), cityNames.getCityNumberFromName("Atlanta"), 1);
graph.addEdge(cityNames.getCityNumberFromName("Raleigh"), cityNames.getCityNumberFromName("Charleston"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Raleigh"), cityNames.getCityNumberFromName("Atlanta"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Atlanta"), cityNames.getCityNumberFromName("Charleston"), 2);
graph.addEdge(cityNames.getCityNumberFromName("Atlanta"), cityNames.getCityNumberFromName("Miami"), 5);
graph.addEdge(cityNames.getCityNumberFromName("Charleston"), cityNames.getCityNumberFromName("Miami"), 4);


graph.findShortestPath('Vancouver', 'Helena'); // Find the shortest path from 'A' to 'F'

