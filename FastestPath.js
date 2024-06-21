"use strict";

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
                // console.log(`${start} to ${end} is ${distances[end]} point.`);
                // alert(`${start} to ${end} is ${distances[end]} point.`);
                return (`${start} to ${end} is ${distances[end]} point.`);
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
let cities = ['Vancouver', 'Seattle', 'Calgary', 'Helena', 'Portland', 'Salt Lake City', 'San Francisco', 'Los Angeles', 'Las Vegas', 'Phoenix', 'El Paso', 'Winnipeg', 'Duluth', 'Omaha', 'Denver', 'Santa Fe', 'Sault St.Marie', 'Toronto', 'Chicago', 'Kansas City', 'Montreal', 'Pittsburgh', 'Saint Louis', 'Boston', 'New York', 'Washington', 'Raleigh', 'Nashville', 'Oklahoma City', 'Dallas', 'Houston', 'Little Rock', 'New Orleans', 'Atlanta', 'Miami', 'Charleston'];

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
graph.addEdge("Helena", "Winnipeg", 4);
graph.addEdge("Helena", "Duluth", 6);
graph.addEdge("Helena", "Salt Lake City", 3);
graph.addEdge("Helena", "Omaha", 5);
graph.addEdge("Helena", "Denver", 4);
graph.addEdge("Salt Lake City", "Denver", 3);
graph.addEdge("Salt Lake City", "Las Vegas", 3);
graph.addEdge("Phoenix", "Denver", 5);
graph.addEdge("Phoenix", "Santa Fe", 3);
graph.addEdge("Phoenix", "El Paso", 3);
graph.addEdge("Winnipeg", "Sault St.Marie", 6);
graph.addEdge("Winnipeg", "Duluth", 4);
graph.addEdge("Duluth", "Sault St.Marie", 3);
graph.addEdge("Duluth", "Toronto", 6);
graph.addEdge("Duluth", "Chicago", 3);
graph.addEdge("Duluth", "Omaha", 2);
graph.addEdge("Omaha", "Chicago", 4);
graph.addEdge("Omaha", "Kansas City", 1);
graph.addEdge("Omaha", "Denver", 4);
graph.addEdge("Sault St.Marie", "Montreal", 5);
graph.addEdge("Sault St.Marie", "Toronto", 2);
graph.addEdge("Chicago", "Toronto", 4);
graph.addEdge("Chicago", "Pittsburgh", 3);
graph.addEdge("Chicago", "Saint Louis", 2);
graph.addEdge("Montreal", "Boston", 2);
graph.addEdge("Montreal", "New York", 3);
graph.addEdge("Montreal", "Toronto", 3);
graph.addEdge("Toronto", "Pittsburgh", 2);
graph.addEdge("Boston", "New York", 2);
graph.addEdge("Pittsburgh", "New York", 2);
graph.addEdge("Pittsburgh", "Washington", 2);
graph.addEdge("Pittsburgh", "Raleigh", 2);
graph.addEdge("Pittsburgh", "Nashville", 4);
graph.addEdge("Pittsburgh", "Saint Louis", 5);
graph.addEdge("New York", "Washington", 2);
graph.addEdge("Washington", "Raleigh", 2);
graph.addEdge("Denver", "Kansas City", 4);
graph.addEdge("Denver", "Oklahoma City", 4);
graph.addEdge("Denver", "Santa Fe", 2);
graph.addEdge("Santa Fe", "Oklahoma City", 3);
graph.addEdge("Santa Fe", "El Paso", 2);
graph.addEdge("El Paso", "Oklahoma City", 5);
graph.addEdge("El Paso", "Dallas", 4);
graph.addEdge("El Paso", "Houston", 6);
graph.addEdge("Oklahoma City", "Kansas City", 2);
graph.addEdge("Oklahoma City", "Little Rock", 2);
graph.addEdge("Oklahoma City", "Dallas", 2);
graph.addEdge("Kansas City", "Saint Louis", 2);
graph.addEdge("Dallas", "Little Rock", 2);
graph.addEdge("Dallas", "Houston", 1);
graph.addEdge("Saint Louis", "Nashville", 2);
graph.addEdge("Saint Louis", "Little Rock", 2);
graph.addEdge("Little Rock", "Nashville", 3);
graph.addEdge("Little Rock", "New Orleans", 3);
graph.addEdge("Houston", "New Orleans", 2);
graph.addEdge("New Orleans", "Atlanta", 4);
graph.addEdge("New Orleans", "Miami", 6);
graph.addEdge("Nashville", "Raleigh", 3);
graph.addEdge("Nashville", "Atlanta", 1);
graph.addEdge("Raleigh", "Charleston", 2);
graph.addEdge("Raleigh", "Atlanta", 2);
graph.addEdge("Atlanta", "Charleston", 2);
graph.addEdge("Atlanta", "Miami", 5);
graph.addEdge("Charleston", "Miami", 4);


document.getElementById("fiveCities").addEventListener("click", () => {
    let city1;
    let city2;
    let allPath = '';

    for (let i = 0; i < 5; i++) {
        city1 = cities[parseInt(Math.random() * cities.length)];
        city2 = cities[parseInt(Math.random() * cities.length)];

        while (city1 == city2) {
            city2 = getCity();
        };

        allPath += i + 1 + ": " + graph.findShortestPath(city1, city2) + "\n";
    }

    alert(allPath);
});

document.getElementById("threeCities").addEventListener("click", () => {
    let city1;
    let city2;
    let allPath = '';

    for (let i = 0; i < 3; i++) {
        city1 = cities[parseInt(Math.random() * cities.length)];
        city2 = cities[parseInt(Math.random() * cities.length)];

        while (city1 == city2) {
            city2 = getCity();
        };

        allPath += i + 1 + ": " + graph.findShortestPath(city1, city2) + "\n";
    }

    alert(allPath);

});