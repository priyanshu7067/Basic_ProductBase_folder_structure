import React, { useEffect, useState } from "react";
import TableComponent from "../../../Component/ui/TableComponent";

// 👉 Add Your OpenAI API Key
const OPENAI_KEY = "Bearer OPENAI_API_KEY";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiQuery, setAiQuery] = useState("");

  // 🔄 Fetch Users From API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔍 BASIC SEARCH (NO AI)
  function simpleSearch(input) {
    const term = input.toLowerCase();

    const results = users.filter((u) =>
      u.name.toLowerCase().includes(term) ||
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.address.city.toLowerCase().includes(term) ||
      u.company.name.toLowerCase().includes(term)
    );

    return results;
  }

  // 🤖 AI SEARCH HANDLER (ONLY IF SIMPLE SEARCH FAILS)
  async function smartSearch() {
    if (!aiQuery.trim()) return;

    // 1️⃣ Try Simple Search First
    const basicResult = simpleSearch(aiQuery);

    if (basicResult.length > 0) {
      setFiltered(basicResult);
      return; // 👍 NO AI NEEDED
    }

    // 2️⃣ If no match → Call AI Agent
    handleAIQuery();
  }

  // 🤖 AI Agent (Natural Language → JSON Filters)
  async function handleAIQuery() {
    const prompt = `
      Convert user's query into JSON filters for this dataset.
      Dataset fields: name, username, email, address.city, company.name.

      User Query: "${aiQuery}"

      Output ONLY valid JSON. Example:
      { "city": "South Elvis" }
    `;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPENAI_KEY,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await res.json();
      const json = JSON.parse(result.choices[0].message.content);

      applyAIFilter(json);

    } catch (err) {
      console.error("AI Error:", err);
    }
  }

  // 🔎 APPLY AI FILTERS TO TABLE
  function applyAIFilter(filters) {
    let temp = [...users];

    if (filters.name) {
      temp = temp.filter((u) =>
        u.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.username) {
      temp = temp.filter((u) =>
        u.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      temp = temp.filter((u) =>
        u.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    if (filters.city) {
      temp = temp.filter((u) =>
        u.address.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.company) {
      temp = temp.filter((u) =>
        u.company.name.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    setFiltered(temp);
  }

  // 📊 TABLE COLUMNS
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Username", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "City", render: (row) => row.address.city },
    { header: "Company", render: (row) => row.company.name },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">
        User List (AI Smart Search Enabled)
      </h2>

      {/* 🤖 AI SEARCH BOX */}
      <div className="mb-4 p-3 border rounded-lg bg-gray-50">
        <label className="text-sm text-gray-600 font-medium">AI Agent 🤖</label>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder='Ask AI: "show users from city South Elvis"'
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            className="flex-1 p-2 border rounded-md outline-none"
          />

          <button
            onClick={smartSearch}
            className="px-4 bg-green-600 text-white rounded-md"
          >
            Search AI
          </button>
        </div>
      </div>

      {/* TABLE */}
      <TableComponent
        columns={columns}
        data={filtered}
        loading={loading}
        rowsPerPage={5}
        emptyMessage="No users found"
      />
    </div>
  );
}
