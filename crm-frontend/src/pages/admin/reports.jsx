import DashboardCards from "../../components/DashboardCards";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Reports({ data }) {
  if (!data) return <p>Loading reports...</p>;

  /* ================= ISSUE STATUS DATA ================= */
  const issueStatusCounts = data.issues.reduce((acc, issue) => {
    acc[issue.status] = (acc[issue.status] || 0) + 1;
    return acc;
  }, {});

  const issueBarData = {
    labels: Object.keys(issueStatusCounts),
    datasets: [
      {
        label: "Issues",
        data: Object.values(issueStatusCounts),
        backgroundColor: "#1976D2"
      }
    ]
  };

  /* ================= EMPLOYEE PERFORMANCE DATA ================= */
  const employeeBarData = {
    labels: data.employees.map(emp => emp.username),
    datasets: [
      {
        label: "Issues Solved",
        data: data.employees.map(emp => emp.issuesSolved),
        backgroundColor: "#2E7D32"
      }
    ]
  };

  /* ================= CHART OPTIONS ================= */
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  return (
    <>
      <h2>Reports & Analytics</h2>

      {/* ================= SUMMARY CARDS ================= */}
      <DashboardCards data={data} />

      {/* ================= CHARTS SECTION ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "32px",
          marginTop: "30px",
          width: "100%"
        }}
      >
        {/* ISSUE STATUS CHART */}
        <div
          style={{
            width: "100%",
            height: "420px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>Issue Status</h4>
          <div style={{ height: "340px", width: "100%" }}>
            <Bar data={issueBarData} options={chartOptions} />
          </div>
        </div>

        {/* EMPLOYEE PERFORMANCE CHART */}
        <div
          style={{
            width: "100%",
            height: "420px",
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>Employee Performance</h4>
          <div style={{ height: "340px", width: "100%" }}>
            <Bar data={employeeBarData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
}
