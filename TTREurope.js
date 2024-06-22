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
let cities = ['Edinburch', 'London', 'Amsterdam', 'Dieppe', 'Bruxelles', 'Paris', 'Brest', 'Pamplona', 'Frankfurt', 'Zürich', 'Marseille', 'Barcelona', 'Madrid', 'Cádiz', 'Lisboa', 'Essen', 'Stockholm', 'Kobenhavn', 'Petrograd', 'Berlin', 'Danzig', 'Warszawa', 'Wien', 'Riga', 'Wilno', 'Kyïv', 'München', 'Venzia', 'Budapest', 'Zágráb', 'Bucuresti', 'Sarajevo', 'Roma', 'Sofia', 'Athína', 'Brindisi', 'Palermo', 'Smyrna', 'Moskva', 'Kharkov', 'Smolensk', 'Rostov', 'Sevastopol', 'Sochi', 'Constantinople', 'Erzurum', 'Angora'];

cities.forEach(city => graph.addVertex(city));

graph.addEdge('Edinburch', 'London', 4);
graph.addEdge('London', 'Amsterdam', 2);
graph.addEdge("London", "Dieppe", 2);
graph.addEdge("Dieppe", "Bruxelles", 2);
graph.addEdge("Dieppe", "Paris", 1);
graph.addEdge("Dieppe", "Brest", 2);
graph.addEdge("Brest", "Paris", 3);
graph.addEdge("Brest", "Pamplona", 4);
graph.addEdge("Paris", "Bruxelles", 2);
graph.addEdge("Paris", "Frankfurt", 3);
graph.addEdge("Paris", "Zürich", 3);
graph.addEdge("Paris", "Marseille", 4);
graph.addEdge("Paris", "Pamplona", 4);
graph.addEdge("Pamplona", "Marseille", 4);
graph.addEdge("Pamplona", "Barcelona", 2);
graph.addEdge("Pamplona", "Madrid", 3);
graph.addEdge("Madrid", "Barcelona", 2);
graph.addEdge("Madrid", "Cádiz", 3);
graph.addEdge("Madrid", "Lisboa", 3);
graph.addEdge("Lisboa", "Cádiz", 2);
graph.addEdge("Barcelona", "Marseille", 4);
graph.addEdge("Amsterdam", "Essen", 3);
graph.addEdge("Amsterdam", "Frankfurt", 2);
graph.addEdge("Amsterdam", "Bruxelles", 1);
graph.addEdge("Bruxelles", "Frankfurt", 2);
graph.addEdge("Stockholm", "Kobenhavn", 3);
graph.addEdge("Stockholm", "Petrograd", 8);
graph.addEdge("Kobenhavn", "Essen", 3);
graph.addEdge("Essen", "Berlin", 2);
graph.addEdge("Essen", "Frankfurt", 2);
graph.addEdge("Berlin", "Danzig", 4);
graph.addEdge("Berlin", "Warszawa", 4);
graph.addEdge("Berlin", "Wien", 3);
graph.addEdge("Berlin", "Frankfurt", 3);
graph.addEdge("Danzig", "Riga", 3);
graph.addEdge("Danzig", "Warszawa", 2);
graph.addEdge("Warszawa", "Wilno", 3);
graph.addEdge("Warszawa", "Kyïv", 4);
graph.addEdge("Warszawa", "Wien", 4);
graph.addEdge("Frankfurt", "München", 2);
graph.addEdge("München", "Wien", 3);
graph.addEdge("München", "Venzia", 2);
graph.addEdge("München", "Zürich", 2);
graph.addEdge("Wien", "Budapest", 1);
graph.addEdge("Wien", "Zágráb", 2);
graph.addEdge("Budapest", "Kyïv", 6);
graph.addEdge("Budapest", "Bucuresti", 4);
graph.addEdge("Budapest", "Sarajevo", 3);
graph.addEdge("Budapest", "Zágráb", 2);
graph.addEdge("Zürich", "Venzia", 2);
graph.addEdge("Zürich", "Marseille", 2);
graph.addEdge("Venzia", "Zágráb", 2);
graph.addEdge("Venzia", "Roma", 2);
graph.addEdge("Zágráb", "Sarajevo", 3);
graph.addEdge("Marseille", "Roma", 4);
graph.addEdge("Sarajevo", "Sofia", 2);
graph.addEdge("Sarajevo", "Athína", 4);
graph.addEdge("Roma", "Brindisi", 2);
graph.addEdge("Roma", "Palermo", 4);
graph.addEdge("Brindisi", "Athína", 4);
graph.addEdge("Brindisi", "Palermo", 3);
graph.addEdge("Palermo", "Smyrna", 6);
graph.addEdge("Athína", "Sofia", 3);
graph.addEdge("Athína", "Smyrna", 2);
graph.addEdge("Riga", "Petrograd", 4);
graph.addEdge("Riga", "Wilno", 4);
graph.addEdge("Petrograd", "Moskva", 4);
graph.addEdge("Petrograd", "Wilno", 4);
graph.addEdge("Moskva", "Kharkov", 4);
graph.addEdge("Moskva", "Smolensk", 2);
graph.addEdge("Wilno", "Smolensk", 3);
graph.addEdge("Wilno", "Kyïv", 2);
graph.addEdge("Smolensk", "Kyïv", 3);
graph.addEdge("Kyïv", "Kharkov", 4);
graph.addEdge("Kyïv", "Bucuresti", 4);
graph.addEdge("Kharkov", "Rostov", 2);
graph.addEdge("Rostov", "Sevastopol", 4);
graph.addEdge("Rostov", "Sochi", 2);
graph.addEdge("Bucuresti", "Sevastopol", 4);
graph.addEdge("Bucuresti", "Constantinople", 3);
graph.addEdge("Bucuresti", "Sofia", 2);
graph.addEdge("Sevastopol", "Sochi", 2);
graph.addEdge("Sevastopol", "Erzurum", 4);
graph.addEdge("Sevastopol", "Constantinople", 4);
graph.addEdge("Sochi", "Erzurum", 3);
graph.addEdge("Sofia", "Constantinople", 3);
graph.addEdge("Constantinople", "Smyrna", 2);
graph.addEdge("Constantinople", "Angora", 2);
graph.addEdge("Smyrna", "Angora", 3);
graph.addEdge("Angora", "Erzurum", 3);



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
            city2 = cities[parseInt(Math.random() * cities.length)];
        };

        allPath += i + 1 + ": " + graph.findShortestPath(city1, city2) + "\n";
    }

    alert(allPath);

});