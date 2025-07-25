const templates = {
  linear: {
    arrayTraversal: `// Array Traversal in C++
void traverse(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }
}`,
stack: `// Stack using STL
stack<int> s;
s.push(10);
s.pop();
int top = s.top();`,
    queue: `// Queue using STL
queue<int> q;
q.push(1);
q.pop();
int front = q.front();`
  },
  nonLinear: {
    binaryTree: `// Binary Tree Node
struct Node {
  int data;
  Node *left, *right;
  Node(int val) {
    data = val;
    left = right = NULL;
  }
};`,
    dfs: `// DFS
void DFS(int node, vector<bool> &visited, vector<int> adj[]) {
  visited[node] = true;
  for (int child : adj[node]) {
    if (!visited[child]) {
      DFS(child, visited, adj);
    }
  }
}`,
    bfs: `// BFS
void BFS(int start, vector<bool> &visited, vector<int> adj[]) {
  queue<int> q;
  q.push(start);
  visited[start] = true;
  while (!q.empty()) {
    int node = q.front(); q.pop();
    for (int neighbor : adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        q.push(neighbor);
      }
    }
  }
}`
  }
};
document.getElementById("categorySelector").addEventListener("change", function () {
  const selectedCategory = this.value;
  const algoSelector = document.getElementById("algoSelector");
  algoSelector.innerHTML = '<option value="">--Select Algorithm--</option>';

  if (selectedCategory && templates[selectedCategory]) {
    for (let algo in templates[selectedCategory]) {
      const option = document.createElement("option");
      option.value = algo;
      option.textContent = algo.charAt(0).toUpperCase() + algo.slice(1);
      algoSelector.appendChild(option);
    }
  }

  document.getElementById("templateOutput").textContent = "// Algorithm template will appear here";
});
document.getElementById("algoSelector").addEventListener("change", function () {
  const cat = document.getElementById("categorySelector").value;
  const algo = this.value;

  if (cat && algo && templates[cat][algo]) {
    document.getElementById("templateOutput").textContent = templates[cat][algo];
  }
});
document.getElementById("copyBtn").addEventListener("click", function () {
  const code = document.getElementById("templateOutput").textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
});
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
const contests = [
  { platform: "LeetCode", name: "Weekly Contest 410", time: "Sunday 10:30 AM IST" },
  { platform: "CodeChef", name: "Starters 130", time: "Wednesday 8:00 PM IST" },
  { platform: "CodeChef", name: "Lunchtime 130", time: "Saturday 8:00 PM IST" }
];
function loadContests() {
  const list = document.getElementById("contestList");
  list.innerHTML = "";

  contests.forEach(contest => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${contest.platform}</strong>: ${contest.name} – <em>${contest.time}</em>`;
    list.appendChild(li);
  });
}
loadContests();




