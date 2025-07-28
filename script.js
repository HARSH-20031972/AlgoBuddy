const algoTemplates = {
  binarySearch: `// Binary Search in C++\nint binarySearch(int arr[], int n, int key) {\n  int low = 0, high = n - 1;\n  while (low <= high) {\n    int mid = (low + high) / 2;\n    if (arr[mid] == key) return mid;\n    else if (arr[mid] < key) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,

  dfs: `// DFS using Adjacency List\nvoid DFS(int node, vector<bool> &visited, vector<int> adj[]) {\n  visited[node] = true;\n  for (int child : adj[node]) {\n    if (!visited[child]) {\n      DFS(child, visited, adj);\n    }\n  }\n}`,

  bfs: `// BFS using Queue\nvoid BFS(int start, vector<bool> &visited, vector<int> adj[]) {\n  queue<int> q;\n  q.push(start);\n  visited[start] = true;\n\n  while (!q.empty()) {\n    int node = q.front(); q.pop();\n    for (int neighbor : adj[node]) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        q.push(neighbor);\n      }\n    }\n  }\n}`
};

document.getElementById("algoSelector").addEventListener("change", function () {
  const selected = this.value;
  document.getElementById("templateOutput").textContent = algoTemplates[selected] || "";
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const code = document.getElementById("templateOutput").textContent;
  if (code) {
    navigator.clipboard.writeText(code)
      .then(() => alert("✅ Code copied!"))
      .catch(() => alert("❌ Failed to copy!"));
  }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const contestListEl = document.getElementById("contestList");

function loadContests() {
  fetch("https://competeapi.vercel.app/contests/upcoming/")
    .then((res) => res.json())
    .then((data) => {
      contestListEl.innerHTML = "";
      data.forEach((contest) => {
        const startTime = new Date(contest.startTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        const durationHrs = (contest.duration / 3600000).toFixed(1) + " hrs";
        const rating = contest.rating ? `⭐ ${contest.rating}` : "";

        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${contest.url}" target="_blank">
            [${contest.site || contest.platform}] ${contest.title}
          </a>
          <br>
          ⏰ ${startTime} IST | ⌛ ${durationHrs} ${rating}
        `;
        contestListEl.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching contests:", error);
      contestListEl.innerHTML = "<li>Failed to load contest data.</li>";
    });
}

loadContests();

// Dummy user handles
const leetcodeHandle = "Open_truce";
const codeforcesHandle = "Open_truce";

// LeetCode API (Unofficial)
fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeHandle}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("lc-stats").innerText = `${data.totalSolved} solved, Rating: ${data.contributionPoints || "N/A"}`;
  })
  .catch(() => document.getElementById("lc-stats").innerText = "Unavailable");

// Codeforces API
fetch(`https://codeforces.com/api/user.info?handles=${codeforcesHandle}`)
  .then(res => res.json())
  .then(data => {
    const user = data.result[0];
    document.getElementById("cf-stats").innerText = `${user.rating} (${user.rank})`;
  })
  .catch(() => document.getElementById("cf-stats").innerText = "Unavailable");









