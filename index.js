/**
 * Utility for asynchronous data parsing and filtering
 */
class DataTransformer {
    constructor(records) {
        this.records = records;
    }

    // Filter records based on threshold score
    filterByScore(minScore) {
        return this.records.filter(item => item.score >= minScore);
    }

    // Normalize and format data structure
    getFormattedSummary() {
        return this.records.map(item => ({
            id: item.id,
            status: item.score >= 70 ? 'Passed' : 'Failed',
            normalizedScore: (item.score / 100).toFixed(2)
        }));
    }

    // Calculate average score across dataset
    calculateAverage() {
        if (this.records.length === 0) return 0;
        const total = this.records.reduce((acc, curr) => acc + curr.score, 0);
        return (total / this.records.length).toFixed(2);
    }
}

// Simulated Async API Call
async function fetchMockData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 101, name: "Task A", score: 88 },
                { id: 102, name: "Task B", score: 54 },
                { id: 103, name: "Task C", score: 95 },
                { id: 104, name: "Task D", score: 62 }
            ]);
        }, 500);
    });
}

// Execution
async function run() {
    console.log("Fetching evaluation data...");
    const rawData = await fetchMockData();

    const transformer = new DataTransformer(rawData);

    console.log("\n--- High Scoring Tasks (>= 70) ---");
    console.log(transformer.filterByScore(70));

    console.log("\n--- Formatted Summary ---");
    console.table(transformer.getFormattedSummary());

    console.log(`\nAverage Score: ${transformer.calculateAverage()}`);
}

run();
