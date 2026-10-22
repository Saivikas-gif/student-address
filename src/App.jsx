// // // // // // // import { useState, useMemo, useEffect } from "react";

// // // // // // // // Simple inline icons (no external dependency, avoids React version conflicts)
// // // // // // // function UsersIcon() {
// // // // // // //   return (
// // // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // // //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // // // // // //       <circle cx="9" cy="7" r="4" />
// // // // // // //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// // // // // // //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// // // // // // //     </svg>
// // // // // // //   );
// // // // // // // }

// // // // // // // function BuildingIcon() {
// // // // // // //   return (
// // // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // // //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// // // // // // //       <path d="M9 22v-4h6v4" />
// // // // // // //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// // // // // // //     </svg>
// // // // // // //   );
// // // // // // // }




// // // // // // // // const DATA = buildDataset();

// // // // // // // function formatIN(num) {
// // // // // // //   return Number(num || 0).toLocaleString("en-IN");
// // // // // // // }

// // // // // // // export default function StudentBranchDashboard() {
// // // // // // //   const [year, setYear] = useState("All");
// // // // // // //   const [month, setMonth] = useState("All");
// // // // // // //   const [branch, setBranch] = useState("All");
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const [data, setData] = useState([]);

// // // // // // //   // const YEARS = 2026;

// // // // // // //   // ---- Mock data: one row per branch per year+month ----
// // // // // // //   const YEARS = [...new Set(data.map(item => item.year))];

// // // // // // //   const MONTHS = [...new Set(data.map(item => item.month))];

// // // // // // //   const branches = [...new Set(data.map(item => item.branch))];

// // // // // // //   const filtered = useMemo(() => {
// // // // // // //     return data.filter(
// // // // // // //       (r) =>
// // // // // // //         (year === "All" || r.year === year) &&
// // // // // // //         (month === "All" || r.month === month) &&
// // // // // // //         (branch === "All" ? true : r.branch === branch)
// // // // // // //     );
// // // // // // //   }, [data, year, month, branch]);
// // // // // // //   useEffect(() => {
// // // // // // //     setLoading(true);
// // // // // // //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// // // // // // //       .then((response) => response.json())
// // // // // // //       .then((result) => {

// // // // // // //         console.log(result);

// // // // // // //         const mappedData = result.data.map((item) => ({

// // // // // // //           branch: item.branch_name,
// // // // // // //           year: "All",
// // // // // // //           month: "All",
// // // // // // //           studentCount: Number(item.student_count),
// // // // // // //           addressedCount: Number(item.students_with_address),
// // // // // // //           withoutAddressCount: Number(item.students_without_address)
// // // // // // //         }));

// // // // // // //         console.log("API Result:", result);

// // // // // // //         setData(mappedData);
// // // // // // //         setLoading(false);

// // // // // // //       })
// // // // // // //       .catch((error) => {
// // // // // // //         console.log(error);
// // // // // // //         setLoading(false);
// // // // // // //       });
// // // // // // //   }, []);
// // // // // // //     // console.log("withoutAddressCount",withoutAddressCount);

// // // // // // //   const totalStudents = useMemo(
// // // // // // //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// // // // // // //     [filtered]
// // // // // // //   );

// // // // // // //   const totalBranches = useMemo(() => {
// // // // // // //     return new Set(filtered.map((r) => r.branch)).size;
// // // // // // //   }, [filtered]);

// // // // // // //   const tableRows = useMemo(() => {
// // // // // // //     const byBranch = {};
// // // // // // //     filtered.forEach((r) => {
// // // // // // //       if (!byBranch[r.branch]) {
// // // // // // //         byBranch[r.branch] = { branch: r.branch, studentCount: 0, addressedCount: 0,withoutAddressCount:0 };
// // // // // // //       }
// // // // // // //       byBranch[r.branch].studentCount += r.studentCount;
// // // // // // //       byBranch[r.branch].addressedCount += r.addressedCount;
// // // // // // //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// // // // // // //         console.log("withoutAddressCount",r.withoutAddressCount);
// // // // // // //     });

// // // // // // //     return Object.values(byBranch)
// // // // // // //       .map((row) => ({
// // // // // // //         ...row,
// // // // // // //         percentage:
// // // // // // //           row.studentCount === 0
// // // // // // //             ? 0
// // // // // // //             : (row.addressedCount / row.studentCount) * 100,
// // // // // // //       }))
// // // // // // //       .sort((a, b) => b.studentCount - a.studentCount);
// // // // // // //   }, [filtered]);

// // // // // // //   return (
// // // // // // //     <div style={styles.page}>
// // // // // // //       <div style={styles.container}>
// // // // // // //         {/* Header */}
// // // // // // //         <div style={styles.headerRow}>
// // // // // // //           <h1 style={styles.title}>Student & Branch Overview</h1>

// // // // // // //           <div style={styles.filterGroup}>
// // // // // // //             <select
// // // // // // //               style={styles.select}
// // // // // // //               value={year}
// // // // // // //               onChange={(e) => setYear(e.target.value)}
// // // // // // //             >
// // // // // // //               <option value="All">All Years</option>
// // // // // // //               {YEARS.map((y) => (
// // // // // // //                 <option key={y} value={y}>
// // // // // // //                   {y}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>

// // // // // // //             <select
// // // // // // //               style={styles.select}
// // // // // // //               value={month}
// // // // // // //               onChange={(e) => setMonth(e.target.value)}
// // // // // // //             >
// // // // // // //               <option value="All">All Months</option>
// // // // // // //               {MONTHS.map((m) => (
// // // // // // //                 <option key={m} value={m}>
// // // // // // //                   {m}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>

// // // // // // //             <select
// // // // // // //               style={styles.select}
// // // // // // //               value={branch}
// // // // // // //               onChange={(e) => setBranch(e.target.value)}
// // // // // // //             >
// // // // // // //               <option value="All">All Branches</option>
// // // // // // //               {branches.map((b) => (
// // // // // // //                 <option key={b} value={b}>
// // // // // // //                   {b}
// // // // // // //                 </option>
// // // // // // //               ))}
// // // // // // //             </select>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* KPI Cards */}
// // // // // // //         <div style={styles.kpiRow}>
// // // // // // //           <div style={styles.card}>
// // // // // // //             <div style={{ ...styles.iconCircle, backgroundColor: "#2f80ed" }}>
// // // // // // //               <UsersIcon />
// // // // // // //             </div>
// // // // // // //             <div style={styles.cardLabel}>Total Students</div>
// // // // // // //             <div style={styles.cardValue}>{formatIN(totalStudents)}</div>
// // // // // // //           </div>

// // // // // // //           <div style={styles.card}>
// // // // // // //             <div style={{ ...styles.iconCircle, backgroundColor: "#9b51e0" }}>
// // // // // // //               <BuildingIcon />
// // // // // // //             </div>
// // // // // // //             <div style={styles.cardLabel}>Total Branches</div>
// // // // // // //             <div style={styles.cardValue}>{totalBranches}</div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* Table */}
// // // // // // //         {loading ? (
// // // // // // //           <div style={styles.loading}>
// // // // // // //             Loading report data...
// // // // // // //           </div>
// // // // // // //         ) : (
// // // // // // //           <div style={styles.tableCard}>
// // // // // // //             <table style={styles.table}>
// // // // // // //               <thead>
// // // // // // //                 <tr>
// // // // // // //                   <th style={styles.th}>Branch</th>
// // // // // // //                   <th style={styles.th}>Student Count</th>
// // // // // // //                   <th style={styles.th}>Total Addressed Student Count</th>
// // // // // // //                   <th style={styles.th}>Student Without Address</th>
// // // // // // //                   <th style={styles.th}>Percentage</th>
// // // // // // //                 </tr>
// // // // // // //               </thead>
// // // // // // //               <tbody>
// // // // // // //                 {tableRows.length === 0 ? (
// // // // // // //                   <tr>
// // // // // // //                     <td style={styles.tdEmpty} colSpan={4}>
// // // // // // //                       No data for the selected filters.
// // // // // // //                     </td>
// // // // // // //                   </tr>
// // // // // // //                 ) : (
// // // // // // //                   tableRows.map((row) => (
// // // // // // //                     <tr key={row.branch}>
// // // // // // //                       <td style={styles.td}>{row.branch}</td>
// // // // // // //                       <td style={styles.td}>{formatIN(row.studentCount)}</td>
// // // // // // //                       <td style={styles.td}>{formatIN(row.addressedCount)}</td>
// // // // // // //                       <td style={styles.td}>{formatIN(row.withoutAddressCount)}</td>
// // // // // // //                       <td style={styles.td}>{row.percentage.toFixed(1)}%</td>
// // // // // // //                     </tr>
// // // // // // //                   ))
// // // // // // //                 )}
// // // // // // //               </tbody>
// // // // // // //             </table>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // const styles = {
// // // // // // //   page: {
// // // // // // //     minHeight: "100vh",
// // // // // // //     backgroundColor: "#f4f6fa",
// // // // // // //     fontFamily:
// // // // // // //       "'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif",
// // // // // // //     padding: "24px",
// // // // // // //   },
// // // // // // //   container: {
// // // // // // //     maxWidth: 960,
// // // // // // //     margin: "0 auto",
// // // // // // //   },
// // // // // // //   headerRow: {
// // // // // // //     display: "flex",
// // // // // // //     flexWrap: "wrap",
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "space-between",
// // // // // // //     gap: 12,
// // // // // // //     backgroundColor: "#fff",
// // // // // // //     borderRadius: 10,
// // // // // // //     padding: "16px 20px",
// // // // // // //     marginBottom: 20,
// // // // // // //     boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
// // // // // // //   },
// // // // // // //   title: {
// // // // // // //     fontSize: 20,
// // // // // // //     fontWeight: 700,
// // // // // // //     color: "#1a2b4c",
// // // // // // //     margin: 0,
// // // // // // //   },
// // // // // // //   filterGroup: {
// // // // // // //     display: "flex",
// // // // // // //     gap: 10,
// // // // // // //     flexWrap: "wrap",
// // // // // // //   },
// // // // // // //   select: {
// // // // // // //     padding: "8px 12px",
// // // // // // //     borderRadius: 6,
// // // // // // //     border: "1px solid #dde2ea",
// // // // // // //     backgroundColor: "#fff",
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#333",
// // // // // // //     cursor: "pointer",
// // // // // // //   },
// // // // // // //   kpiRow: {
// // // // // // //     display: "flex",
// // // // // // //     gap: 16,
// // // // // // //     flexWrap: "wrap",
// // // // // // //     marginBottom: 20,
// // // // // // //   },
// // // // // // //   card: {
// // // // // // //     flex: "1 1 200px",
// // // // // // //     backgroundColor: "#fff",
// // // // // // //     borderRadius: 10,
// // // // // // //     padding: "18px 20px",
// // // // // // //     boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
// // // // // // //   },
// // // // // // //   iconCircle: {
// // // // // // //     width: 36,
// // // // // // //     height: 36,
// // // // // // //     borderRadius: "50%",
// // // // // // //     display: "flex",
// // // // // // //     alignItems: "center",
// // // // // // //     justifyContent: "center",
// // // // // // //     marginBottom: 12,
// // // // // // //   },
// // // // // // //   cardLabel: {
// // // // // // //     fontSize: 13,
// // // // // // //     color: "#6b7280",
// // // // // // //     marginBottom: 6,
// // // // // // //   },
// // // // // // //   cardValue: {
// // // // // // //     fontSize: 22,
// // // // // // //     fontWeight: 700,
// // // // // // //     color: "#1a2b4c",
// // // // // // //   },
// // // // // // //   tableCard: {
// // // // // // //     backgroundColor: "#fff",
// // // // // // //     borderRadius: 10,
// // // // // // //     padding: "8px",
// // // // // // //     boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
// // // // // // //     overflowX: "auto",
// // // // // // //   },
// // // // // // //   table: {
// // // // // // //     width: "100%",
// // // // // // //     borderCollapse: "collapse",
// // // // // // //   },
// // // // // // //   th: {
// // // // // // //     textAlign: "left",
// // // // // // //     fontSize: 13,
// // // // // // //     color: "#6b7280",
// // // // // // //     fontWeight: 600,
// // // // // // //     padding: "12px 16px",
// // // // // // //     borderBottom: "2px solid #eef1f6",
// // // // // // //     whiteSpace: "nowrap",
// // // // // // //   },
// // // // // // //   td: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#1a2b4c",
// // // // // // //     padding: "12px 16px",
// // // // // // //     borderBottom: "1px solid #eef1f6",
// // // // // // //     whiteSpace: "nowrap",
// // // // // // //   },
// // // // // // //   tdEmpty: {
// // // // // // //     fontSize: 14,
// // // // // // //     color: "#9ca3af",
// // // // // // //     padding: "20px 16px",
// // // // // // //     textAlign: "center",
// // // // // // //   },
// // // // // // // };






// // // // // // import { useState, useMemo, useEffect } from "react";
// // // // // // import SpinnerDotted from"./loading"


// // // // // // // Simple inline icons (no external dependency, avoids React version conflicts)
// // // // // // function UsersIcon() {
// // // // // //   return (
// // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // // // // //       <circle cx="9" cy="7" r="4" />
// // // // // //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// // // // // //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// // // // // //     </svg>
// // // // // //   );
// // // // // // }

// // // // // // function BuildingIcon() {
// // // // // //   return (
// // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// // // // // //       <path d="M9 22v-4h6v4" />
// // // // // //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// // // // // //     </svg>
// // // // // //   );
// // // // // // }

// // // // // // function AddressCheckIcon() {
// // // // // //   return (
// // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // // // //       <circle cx="12" cy="10" r="3" />
// // // // // //     </svg>
// // // // // //   );
// // // // // // }

// // // // // // function AddressXIcon() {
// // // // // //   return (
// // // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // // // //       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
// // // // // //       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
// // // // // //     </svg>
// // // // // //   );
// // // // // // }

// // // // // // function formatIN(num) {
// // // // // //   return Number(num || 0).toLocaleString("en-IN");
// // // // // // }

// // // // // // // All styling lives here so the dashboard renders correctly with zero
// // // // // // // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// // // // // // const CSS = `
// // // // // // .sbd-page {
// // // // // //   min-height: 100vh;
// // // // // //   background-color: #f4f6fa;
// // // // // //   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
// // // // // //   padding: 24px;
// // // // // //   box-sizing: border-box;
// // // // // // }
// // // // // // .sbd-page *, .sbd-page *::before, .sbd-page *::after {
// // // // // //   box-sizing: border-box;
// // // // // // }
// // // // // // .sbd-container {
// // // // // //   max-width: 1100px;
// // // // // //   margin: 0 auto;
// // // // // // }
// // // // // // .sbd-header {
// // // // // //   display: flex;
// // // // // //   flex-wrap: wrap;
// // // // // //   align-items: center;
// // // // // //   justify-content: space-between;
// // // // // //   gap: 12px;
// // // // // //   background-color: #fff;
// // // // // //   border-radius: 10px;
// // // // // //   padding: 18px 22px;
// // // // // //   margin-bottom: 20px;
// // // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // // // }
// // // // // // .sbd-title {
// // // // // //   font-size: 20px;
// // // // // //   font-weight: 700;
// // // // // //   color: #1a2b4c;
// // // // // //   margin: 0;
// // // // // // }
// // // // // // .sbd-filters {
// // // // // //   display: flex;
// // // // // //   gap: 10px;
// // // // // //   flex-wrap: wrap;
// // // // // // }
// // // // // // .sbd-select {
// // // // // //   padding: 8px 12px;
// // // // // //   border-radius: 6px;
// // // // // //   border: 1px solid #dde2ea;
// // // // // //   background-color: #fff;
// // // // // //   font-size: 14px;
// // // // // //   color: #333;
// // // // // //   cursor: pointer;
// // // // // // }
// // // // // // .sbd-error {
// // // // // //   background-color: #fdecec;
// // // // // //   color: #c0392b;
// // // // // //   border-radius: 8px;
// // // // // //   padding: 10px 16px;
// // // // // //   margin-bottom: 20px;
// // // // // //   font-size: 14px;
// // // // // // }
// // // // // // .sbd-kpi-row {
// // // // // //   display: grid;
// // // // // //   grid-template-columns: repeat(4, 1fr);
// // // // // //   gap: 16px;
// // // // // //   margin-bottom: 20px;
// // // // // // }
// // // // // // @media (max-width: 900px) {
// // // // // //   .sbd-kpi-row {
// // // // // //     grid-template-columns: repeat(2, 1fr);
// // // // // //   }
// // // // // // }
// // // // // // @media (max-width: 520px) {
// // // // // //   .sbd-kpi-row {
// // // // // //     grid-template-columns: 1fr;
// // // // // //   }
// // // // // // }
// // // // // // .sbd-card {
// // // // // //   background-color: #fff;
// // // // // //   border-radius: 10px;
// // // // // //   padding: 18px 20px;
// // // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // // // }
// // // // // // .sbd-icon-circle {
// // // // // //   width: 36px;
// // // // // //   height: 36px;
// // // // // //   border-radius: 50%;
// // // // // //   display: flex;
// // // // // //   align-items: center;
// // // // // //   justify-content: center;
// // // // // //   margin-bottom: 12px;
// // // // // // }
// // // // // // .sbd-card-label {
// // // // // //   font-size: 13px;
// // // // // //   color: #6b7280;
// // // // // //   margin-bottom: 6px;
// // // // // // }
// // // // // // .sbd-card-value {
// // // // // //   font-size: 22px;
// // // // // //   font-weight: 700;
// // // // // //   color: #1a2b4c;
// // // // // // }
// // // // // // .sbd-table-card {
// // // // // //   background-color: #fff;
// // // // // //   border-radius: 10px;
// // // // // //   padding: 8px;
// // // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // // //   overflow-x: auto;
// // // // // // }
// // // // // // .sbd-table {
// // // // // //   width: 100%;
// // // // // //   border-collapse: collapse;
// // // // // // }
// // // // // // .sbd-table th {
// // // // // //   text-align: left;
// // // // // //   font-size: 12px;
// // // // // //   letter-spacing: 0.03em;
// // // // // //   text-transform: uppercase;
// // // // // //   color: #6b7280;
// // // // // //   font-weight: 600;
// // // // // //   padding: 12px 16px;
// // // // // //   border-bottom: 2px solid #eef1f6;
// // // // // //   white-space: nowrap;
// // // // // // }
// // // // // // .sbd-table td {
// // // // // //   font-size: 14px;
// // // // // //   color: #1a2b4c;
// // // // // //   padding: 12px 16px;
// // // // // //   border-bottom: 1px solid #eef1f6;
// // // // // //   white-space: nowrap;
// // // // // // }
// // // // // // .sbd-table tbody tr:hover {
// // // // // //   background-color: #f8fafc;
// // // // // // }
// // // // // // .sbd-table tbody tr:last-child td {
// // // // // //   border-bottom: none;
// // // // // // }
// // // // // // .sbd-empty, .sbd-loading {
// // // // // //   font-size: 14px;
// // // // // //   color: #9ca3af;
// // // // // //   padding: 24px 16px;
// // // // // //   text-align: center;
// // // // // // }
// // // // // // `;

// // // // // // export default function StudentBranchDashboard() {
// // // // // //   const [year, setYear] = useState("All");
// // // // // //   const [month, setMonth] = useState("All");
// // // // // //   const [branch, setBranch] = useState("All");
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [data, setData] = useState([]);

// // // // // //   useEffect(() => {
// // // // // //     setLoading(true);
// // // // // //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// // // // // //       .then((response) => response.json())
// // // // // //       .then((result) => {

// // // // // //         console.log(result);

// // // // // //         const mappedData = result.data.map((item) => ({

// // // // // //           branch: item.branch_name,
// // // // // //           year: "All",
// // // // // //           month: "All",
// // // // // //           studentCount: Number(item.student_count),
// // // // // //           addressedCount: Number(item.students_with_address),
// // // // // //           withoutAddressCount: Number(item.students_without_address)
// // // // // //         }));

// // // // // //         console.log("API Result:", result);

// // // // // //         setData(mappedData);
// // // // // //         setLoading(false);

// // // // // //       })
// // // // // //       .catch((error) => {
// // // // // //         console.log(error);
// // // // // //         setLoading(false);
// // // // // //       });
// // // // // //   }, []);

// // // // // //   const YEARS = useMemo(() => [...new Set(data.map((item) => item.year))], [data]);
// // // // // //   const MONTHS = useMemo(() => [...new Set(data.map((item) => item.month))], [data]);
// // // // // //   const branches = useMemo(() => [...new Set(data.map((item) => item.branch))], [data]);

// // // // // //   const filtered = useMemo(() => {
// // // // // //     return data.filter(
// // // // // //       (r) =>
// // // // // //         (year === "All" || r.year === year) &&
// // // // // //         (month === "All" || r.month === month) &&
// // // // // //         (branch === "All" || r.branch === branch)
// // // // // //     );
// // // // // //   }, [data, year, month, branch]);

// // // // // //   const totalStudents = useMemo(
// // // // // //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// // // // // //     [filtered]
// // // // // //   );

// // // // // //   const totalAddressed = useMemo(
// // // // // //     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
// // // // // //     [filtered]
// // // // // //   );

// // // // // //   const totalWithoutAddress = useMemo(
// // // // // //     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
// // // // // //     [filtered]
// // // // // //   );

// // // // // //   const totalBranches = useMemo(() => {
// // // // // //     return new Set(filtered.map((r) => r.branch)).size;
// // // // // //   }, [filtered]);

// // // // // //   const tableRows = useMemo(() => {
// // // // // //     const byBranch = {};
// // // // // //     filtered.forEach((r) => {
// // // // // //       if (!byBranch[r.branch]) {
// // // // // //         byBranch[r.branch] = {
// // // // // //           branch: r.branch,
// // // // // //           studentCount: 0,
// // // // // //           addressedCount: 0,
// // // // // //           withoutAddressCount: 0,
// // // // // //         };
// // // // // //       }
// // // // // //       byBranch[r.branch].studentCount += r.studentCount;
// // // // // //       byBranch[r.branch].addressedCount += r.addressedCount;
// // // // // //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// // // // // //     });

// // // // // //     return Object.values(byBranch)
// // // // // //       .map((row) => ({
// // // // // //         ...row,
// // // // // //         percentage:
// // // // // //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// // // // // //       }))
// // // // // //       .sort((a, b) => b.studentCount - a.studentCount);
// // // // // //   }, [filtered]);

// // // // // //   return (
// // // // // //     <div className="sbd-page">
// // // // // //       <style>{CSS}</style>
// // // // // //       <div className="sbd-container">
// // // // // //         {/* Header */}
// // // // // //         <div className="sbd-header">
// // // // // //           <h1 className="sbd-title">Student & Branch Overview</h1>

// // // // // //           <div className="sbd-filters">
// // // // // //             <select
// // // // // //               className="sbd-select"
// // // // // //               value={year}
// // // // // //               onChange={(e) => setYear(e.target.value)}
// // // // // //             >
// // // // // //               <option value="All">All Years</option>
// // // // // //               {YEARS.map((y) => (
// // // // // //                 <option key={y} value={y}>
// // // // // //                   {y}
// // // // // //                 </option>
// // // // // //               ))}
// // // // // //             </select>

// // // // // //             <select
// // // // // //               className="sbd-select"
// // // // // //               value={month}
// // // // // //               onChange={(e) => setMonth(e.target.value)}
// // // // // //             >
// // // // // //               <option value="All">All Months</option>
// // // // // //               {MONTHS.map((m) => (
// // // // // //                 <option key={m} value={m}>
// // // // // //                   {m}
// // // // // //                 </option>
// // // // // //               ))}
// // // // // //             </select>

// // // // // //             <select
// // // // // //               className="sbd-select"
// // // // // //               value={branch}
// // // // // //               onChange={(e) => setBranch(e.target.value)}
// // // // // //             >
// // // // // //               <option value="All">All Branches</option>
// // // // // //               {branches.map((b) => (
// // // // // //                 <option key={b} value={b}>
// // // // // //                   {b}
// // // // // //                 </option>
// // // // // //               ))}
// // // // // //             </select>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {error && <div className="sbd-error">{error}</div>}

// // // // // //         {/* KPI Cards */}
// // // // // //         <div className="sbd-kpi-row">
// // // // // //           <div className="sbd-card">
// // // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
// // // // // //               <UsersIcon />
// // // // // //             </div>
// // // // // //             <div className="sbd-card-label">Total Students</div>
// // // // // //             <div className="sbd-card-value">
// // // // // //               {loading ? "…" : formatIN(totalStudents)}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="sbd-card">
// // // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
// // // // // //               <BuildingIcon />
// // // // // //             </div>
// // // // // //             <div className="sbd-card-label">Total Branches</div>
// // // // // //             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
// // // // // //           </div>

// // // // // //           <div className="sbd-card">
// // // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
// // // // // //               <AddressCheckIcon />
// // // // // //             </div>
// // // // // //             <div className="sbd-card-label">Students With Address</div>
// // // // // //             <div className="sbd-card-value">
// // // // // //               {loading ? "…" : formatIN(totalAddressed)}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <div className="sbd-card">
// // // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// // // // // //               <AddressXIcon />
// // // // // //             </div>
// // // // // //             <div className="sbd-card-label">Student Address Not Updated</div>
// // // // // //             <div className="sbd-card-value">
// // // // // //               {loading ? "…" : formatIN(totalWithoutAddress)}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Table */}
// // // // // //         <div className="sbd-table-card">
// // // // // //           {loading ? (
// // // // // //             <div className="sbd-loading"><SpinnerDotted size={50} thickness={100} speed={100} color="#36ad47" /></div>
// // // // // //           ) : (
// // // // // //             <table className="sbd-table">
// // // // // //               <thead>
// // // // // //                 <tr>
// // // // // //                   <th>Branch</th>
// // // // // //                   <th>Student Count</th>
// // // // // //                   <th>Total Addressed Student Count</th>
// // // // // //                   <th>Student Address Not Updated </th>
// // // // // //                   <th>Percentage</th>
// // // // // //                 </tr>
// // // // // //               </thead>
// // // // // //               <tbody>
// // // // // //                 {tableRows.length === 0 ? (
// // // // // //                   <tr>
// // // // // //                     <td colSpan={5} className="sbd-empty">
// // // // // //                       No data for the selected filters.
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ) : (
// // // // // //                   tableRows.map((row) => (
// // // // // //                     <tr key={row.branch}>
// // // // // //                       <td>{row.branch}</td>
// // // // // //                       <td>{formatIN(row.studentCount)}</td>
// // // // // //                       <td>{formatIN(row.addressedCount)}</td>
// // // // // //                       <td>{formatIN(row.withoutAddressCount)}</td>
// // // // // //                       <td>{row.percentage.toFixed(1)}%</td>
// // // // // //                     </tr>
// // // // // //                   ))
// // // // // //                 )}
// // // // // //               </tbody>
// // // // // //             </table>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }




// // // // // import { useState, useMemo, useEffect } from "react";
// // // // // import SpinnerDotted from "./loading";

// // // // // // Simple inline icons (no external dependency, avoids React version conflicts)
// // // // // function UsersIcon() {
// // // // //   return (
// // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // // // //       <circle cx="9" cy="7" r="4" />
// // // // //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// // // // //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// // // // //     </svg>
// // // // //   );
// // // // // }

// // // // // function BuildingIcon() {
// // // // //   return (
// // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// // // // //       <path d="M9 22v-4h6v4" />
// // // // //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// // // // //     </svg>
// // // // //   );
// // // // // }

// // // // // function AddressCheckIcon() {
// // // // //   return (
// // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // // //       <circle cx="12" cy="10" r="3" />
// // // // //     </svg>
// // // // //   );
// // // // // }

// // // // // function AddressXIcon() {
// // // // //   return (
// // // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // // //       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
// // // // //       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
// // // // //     </svg>
// // // // //   );
// // // // // }

// // // // // function formatIN(num) {
// // // // //   return Number(num || 0).toLocaleString("en-IN");
// // // // // }

// // // // // // All styling lives here so the dashboard renders correctly with zero
// // // // // // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// // // // // const CSS = `
// // // // // .sbd-page {
// // // // //   min-height: 100vh;
// // // // //   background-color: #f4f6fa;
// // // // //   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
// // // // //   padding: 24px;
// // // // //   box-sizing: border-box;
// // // // // }
// // // // // .sbd-page *, .sbd-page *::before, .sbd-page *::after {
// // // // //   box-sizing: border-box;
// // // // // }
// // // // // .sbd-container {
// // // // //   max-width: 1100px;
// // // // //   margin: 0 auto;
// // // // // }
// // // // // .sbd-header {
// // // // //   display: flex;
// // // // //   flex-wrap: wrap;
// // // // //   align-items: center;
// // // // //   justify-content: space-between;
// // // // //   gap: 12px;
// // // // //   background-color: #fff;
// // // // //   border-radius: 10px;
// // // // //   padding: 18px 22px;
// // // // //   margin-bottom: 20px;
// // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // // }
// // // // // .sbd-title {
// // // // //   font-size: 20px;
// // // // //   font-weight: 700;
// // // // //   color: #1a2b4c;
// // // // //   margin: 0;
// // // // // }
// // // // // .sbd-filters {
// // // // //   display: flex;
// // // // //   gap: 10px;
// // // // //   flex-wrap: wrap;
// // // // // }
// // // // // .sbd-select {
// // // // //   padding: 8px 12px;
// // // // //   border-radius: 6px;
// // // // //   border: 1px solid #dde2ea;
// // // // //   background-color: #fff;
// // // // //   font-size: 14px;
// // // // //   color: #333;
// // // // //   cursor: pointer;
// // // // // }
// // // // // .sbd-error {
// // // // //   background-color: #fdecec;
// // // // //   color: #c0392b;
// // // // //   border-radius: 8px;
// // // // //   padding: 10px 16px;
// // // // //   margin-bottom: 20px;
// // // // //   font-size: 14px;
// // // // // }
// // // // // .sbd-kpi-row {
// // // // //   display: grid;
// // // // //   grid-template-columns: repeat(4, 1fr);
// // // // //   gap: 16px;
// // // // //   margin-bottom: 20px;
// // // // // }
// // // // // @media (max-width: 900px) {
// // // // //   .sbd-kpi-row {
// // // // //     grid-template-columns: repeat(2, 1fr);
// // // // //   }
// // // // // }
// // // // // @media (max-width: 520px) {
// // // // //   .sbd-kpi-row {
// // // // //     grid-template-columns: 1fr;
// // // // //   }
// // // // // }
// // // // // .sbd-card {
// // // // //   background-color: #fff;
// // // // //   border-radius: 10px;
// // // // //   padding: 18px 20px;
// // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // // }
// // // // // .sbd-icon-circle {
// // // // //   width: 36px;
// // // // //   height: 36px;
// // // // //   border-radius: 50%;
// // // // //   display: flex;
// // // // //   align-items: center;
// // // // //   justify-content: center;
// // // // //   margin-bottom: 12px;
// // // // // }
// // // // // .sbd-card-label {
// // // // //   font-size: 13px;
// // // // //   color: #6b7280;
// // // // //   margin-bottom: 6px;
// // // // // }
// // // // // .sbd-card-value {
// // // // //   font-size: 22px;
// // // // //   font-weight: 700;
// // // // //   color: #1a2b4c;
// // // // // }
// // // // // .sbd-table-card {
// // // // //   background-color: #fff;
// // // // //   border-radius: 10px;
// // // // //   padding: 8px;
// // // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // //   overflow-x: auto;
// // // // // }
// // // // // .sbd-table {
// // // // //   width: 100%;
// // // // //   border-collapse: collapse;
// // // // // }
// // // // // .sbd-table th {
// // // // //   text-align: left;
// // // // //   font-size: 12px;
// // // // //   letter-spacing: 0.03em;
// // // // //   text-transform: uppercase;
// // // // //   color: #6b7280;
// // // // //   font-weight: 600;
// // // // //   padding: 12px 16px;
// // // // //   border-bottom: 2px solid #eef1f6;
// // // // //   white-space: nowrap;
// // // // // }
// // // // // .sbd-table td {
// // // // //   font-size: 14px;
// // // // //   color: #1a2b4c;
// // // // //   padding: 12px 16px;
// // // // //   border-bottom: 1px solid #eef1f6;
// // // // //   white-space: nowrap;
// // // // // }
// // // // // .sbd-table tbody tr:hover {
// // // // //   background-color: #f8fafc;
// // // // // }
// // // // // .sbd-table tbody tr:last-child td {
// // // // //   border-bottom: none;
// // // // // }
// // // // // .sbd-empty, .sbd-loading {
// // // // //   font-size: 14px;
// // // // //   color: #9ca3af;
// // // // //   padding: 24px 16px;
// // // // //   text-align: center;
// // // // //   display: flex;
// // // // //   align-items: center;
// // // // //   justify-content: center;
// // // // // }
// // // // // `;

// // // // // export default function StudentBranchDashboard() {
// // // // //   const [year, setYear] = useState("All");
// // // // //   const [month, setMonth] = useState("All");
// // // // //   const [branch, setBranch] = useState("All");
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [data, setData] = useState([]);

// // // // //   useEffect(() => {
// // // // //     setLoading(true);
// // // // //     setError(null);

// // // // //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// // // // //       .then((response) => {
// // // // //         if (!response.ok) {
// // // // //           throw new Error(`HTTP ${response.status}`);
// // // // //         }
// // // // //         return response.json();
// // // // //       })
// // // // //       .then((result) => {
// // // // //         console.log("API Result:", result);

// // // // //         const rows = Array.isArray(result) ? result : result?.data ?? [];

// // // // //         const mappedData = rows.map((item) => ({
// // // // //           branch: item.branch_name,
// // // // //           year: item.academic_year ?? "All",
// // // // //           month: item.month_name ?? "All",
// // // // //           studentCount: Number(item.student_count) || 0,
// // // // //           addressedCount: Number(item.students_with_address) || 0,
// // // // //           withoutAddressCount: Number(item.students_without_address) || 0,
// // // // //         }));

// // // // //         setData(mappedData);
// // // // //         setLoading(false);
// // // // //       })
// // // // //       .catch((err) => {
// // // // //         console.log(err);
// // // // //         setError(`Could not load report data: ${err.message}`);
// // // // //         setLoading(false);
// // // // //       });
// // // // //   }, []);

// // // // //   const YEARS = useMemo(() => [...new Set(data.map((item) => item.year))], [data]);
// // // // //   const MONTHS = useMemo(() => [...new Set(data.map((item) => item.month))], [data]);
// // // // //   const branches = useMemo(() => [...new Set(data.map((item) => item.branch))], [data]);

// // // // //   const filtered = useMemo(() => {
// // // // //     return data.filter(
// // // // //       (r) =>
// // // // //         (year === "All" || r.year === year) &&
// // // // //         (month === "All" || r.month === month) &&
// // // // //         (branch === "All" || r.branch === branch)
// // // // //     );
// // // // //   }, [data, year, month, branch]);

// // // // //   const totalStudents = useMemo(
// // // // //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// // // // //     [filtered]
// // // // //   );

// // // // //   const totalAddressed = useMemo(
// // // // //     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
// // // // //     [filtered]
// // // // //   );

// // // // //   const totalWithoutAddress = useMemo(
// // // // //     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
// // // // //     [filtered]
// // // // //   );

// // // // //   const totalBranches = useMemo(() => {
// // // // //     return new Set(filtered.map((r) => r.branch)).size;
// // // // //   }, [filtered]);

// // // // //   const tableRows = useMemo(() => {
// // // // //     const byBranch = {};
// // // // //     filtered.forEach((r) => {
// // // // //       if (!byBranch[r.branch]) {
// // // // //         byBranch[r.branch] = {
// // // // //           branch: r.branch,
// // // // //           studentCount: 0,
// // // // //           addressedCount: 0,
// // // // //           withoutAddressCount: 0,
// // // // //         };
// // // // //       }
// // // // //       byBranch[r.branch].studentCount += r.studentCount;
// // // // //       byBranch[r.branch].addressedCount += r.addressedCount;
// // // // //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// // // // //     });

// // // // //     return Object.values(byBranch)
// // // // //       .map((row) => ({
// // // // //         ...row,
// // // // //         percentage:
// // // // //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// // // // //       }))
// // // // //       .sort((a, b) => a.studentCount - b.studentCount);
// // // // //   }, [filtered]);

// // // // //   return (
// // // // //     <div className="sbd-page">
// // // // //       <style>{CSS}</style>
// // // // //       <div className="sbd-container">
// // // // //         {/* Header */}
// // // // //         <div className="sbd-header">
// // // // //           <h1 className="sbd-title">Student & Branch Overview</h1>

// // // // //           <div className="sbd-filters">
// // // // //             {/* <select
// // // // //               className="sbd-select"
// // // // //               value={year}
// // // // //               onChange={(e) => setYear(e.target.value)}
// // // // //             >
// // // // //               <option value="All">All Years</option>
// // // // //               {YEARS.map((y) => (
// // // // //                 <option key={y} value={y}>
// // // // //                   {y}
// // // // //                 </option>
// // // // //               ))}
// // // // //             </select> */}

// // // // //             {/* <select
// // // // //               className="sbd-select"
// // // // //               value={month}
// // // // //               onChange={(e) => setMonth(e.target.value)}
// // // // //             >
// // // // //               <option value="All">All Months</option>
// // // // //               {MONTHS.map((m) => (
// // // // //                 <option key={m} value={m}>
// // // // //                   {m}
// // // // //                 </option>
// // // // //               ))}
// // // // //             </select> */}

// // // // //              <select
// // // // //               className="sbd-select"
// // // // //               value={branch}
// // // // //               onChange={(e) => setBranch(e.target.value)}
// // // // //             >
// // // // //               <option value="All">All Branches</option>
// // // // //               {branches.map((b) => (
// // // // //                 <option key={b} value={b}>
// // // // //                   {b}
// // // // //                 </option>
// // // // //               ))}
// // // // //             </select> 
// // // // //           </div>
// // // // //         </div>

// // // // //         {error && <div className="sbd-error">{error}</div>}

// // // // //         {/* KPI Cards */}
// // // // //         <div className="sbd-kpi-row">
// // // // //           <div className="sbd-card">
// // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
// // // // //               <UsersIcon />
// // // // //             </div>
// // // // //             <div className="sbd-card-label">Total Students</div>
// // // // //             <div className="sbd-card-value">
// // // // //               {loading ? "…" : formatIN(totalStudents)}
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="sbd-card">
// // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
// // // // //               <BuildingIcon />
// // // // //             </div>
// // // // //             <div className="sbd-card-label">Total Branches</div>
// // // // //             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
// // // // //           </div>

// // // // //           <div className="sbd-card">
// // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
// // // // //               <AddressCheckIcon />
// // // // //             </div>
// // // // //             <div className="sbd-card-label">Students With Address</div>
// // // // //             <div className="sbd-card-value">
// // // // //               {loading ? "…" : formatIN(totalAddressed)}
// // // // //             </div>
// // // // //           </div>

// // // // //           <div className="sbd-card">
// // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// // // // //               <AddressXIcon />
// // // // //             </div>
// // // // //             <div className="sbd-card-label">Student Address Not Updated</div>
// // // // //             <div className="sbd-card-value">
// // // // //               {loading ? "…" : formatIN(totalWithoutAddress)}
// // // // //             </div>
// // // // //           </div>

// // // // //            <div className="sbd-card">
// // // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// // // // //               <AddressXIcon />
// // // // //             </div>
// // // // //             <div className="sbd-card-label">Student Address Not Updated</div>
// // // // //             <div className="sbd-card-value">
// // // // //               {loading ? "…" : formatIN(totalWithoutAddress)}
// // // // //             </div>
// // // // //           </div>

// // // // //         </div>



// // // // //         {/* Table */}
// // // // //         <div className="sbd-table-card">
// // // // //           {loading ? (
// // // // //             <div className="sbd-loading" style={{backgroundColor:"lightblue"}}>
// // // // //               <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
// // // // //             </div>
// // // // //           ) : (
// // // // //             <table className="sbd-table">
// // // // //               <thead>
// // // // //                 <tr>
// // // // //                   <th>Branch</th>
// // // // //                   <th>Student Count</th>
// // // // //                   <th>Total Addressed Student Count</th>
// // // // //                   <th>Student Address Not Updated</th>
// // // // //                   <th>Percentage</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody>
// // // // //                 {tableRows.length === 0 ? (
// // // // //                   <tr>
// // // // //                     <td colSpan={5} className="sbd-empty">
// // // // //                       No data for the selected filters.
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ) : (
// // // // //                   tableRows.map((row) => (
// // // // //                     <tr key={row.branch}>
// // // // //                       <td>{row.branch}</td>
// // // // //                       <td>{formatIN(row.studentCount)}</td>
// // // // //                       <td>{formatIN(row.addressedCount)}</td>
// // // // //                       <td>{formatIN(row.withoutAddressCount)}</td>
// // // // //                       <td>{row.percentage.toFixed(1)}%</td>
// // // // //                     </tr>
// // // // //                   ))
// // // // //                 )}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // import { useState, useMemo, useEffect } from "react";
// // // // import SpinnerDotted from "./loading";
// // // // import Select from "react-select";

// // // // // Simple inline icons (no external dependency, avoids React version conflicts)
// // // // function UsersIcon() {
// // // //   return (
// // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // // //       <circle cx="9" cy="7" r="4" />
// // // //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// // // //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // function BuildingIcon() {
// // // //   return (
// // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// // // //       <path d="M9 22v-4h6v4" />
// // // //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // function AddressCheckIcon() {
// // // //   return (
// // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // //       <circle cx="12" cy="10" r="3" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // function AddressXIcon() {
// // // //   return (
// // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // // //       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
// // // //       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // function PercentIcon() {
// // // //   return (
// // // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // // //       <line x1="19" y1="5" x2="5" y2="19" />
// // // //       <circle cx="6.5" cy="6.5" r="2.5" />
// // // //       <circle cx="17.5" cy="17.5" r="2.5" />
// // // //     </svg>
// // // //   );
// // // // }

// // // // function formatIN(num) {
// // // //   return Number(num || 0).toLocaleString("en-IN");
// // // // }

// // // // // All styling lives here so the dashboard renders correctly with zero
// // // // // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// // // // const CSS = `
// // // // .sbd-page {
// // // //   min-height: 100vh;
// // // //   background-color: #f4f6fa;
// // // //   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
// // // //   padding: 24px;
// // // //   box-sizing: border-box;
// // // // }
// // // // .sbd-page *, .sbd-page *::before, .sbd-page *::after {
// // // //   box-sizing: border-box;
// // // // }
// // // // .sbd-container {
// // // //   max-width: 1200px;
// // // //   margin: 0 auto;
// // // // }
// // // // .sbd-header {
// // // //   display: flex;
// // // //   flex-wrap: wrap;
// // // //   align-items: center;
// // // //   justify-content: space-between;
// // // //   gap: 12px;
// // // //   background-color: #fff;
// // // //   border-radius: 10px;
// // // //   padding: 18px 22px;
// // // //   margin-bottom: 20px;
// // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // }
// // // // .sbd-title {
// // // //   font-size: 20px;
// // // //   font-weight: 700;
// // // //   color: #1a2b4c;
// // // //   margin: 0;
// // // // }
// // // // .sbd-filters {
// // // //   display: flex;
// // // //   gap: 10px;
// // // //   flex-wrap: wrap;
// // // // }
// // // // .sbd-select {
// // // //   padding: 8px 12px;
// // // //   border-radius: 6px;
// // // //   border: 1px solid #dde2ea;
// // // //   background-color: #fff;
// // // //   font-size: 14px;
// // // //   color: #333;
// // // //   cursor: pointer;
// // // // }
// // // // .sbd-error {
// // // //   background-color: #fdecec;
// // // //   color: #c0392b;
// // // //   border-radius: 8px;
// // // //   padding: 10px 16px;
// // // //   margin-bottom: 20px;
// // // //   font-size: 14px;
// // // // }
// // // // .sbd-kpi-row {
// // // //   display: grid;
// // // //   grid-template-columns: repeat(5, 1fr);
// // // //   gap: 16px;
// // // //   margin-bottom: 20px;
// // // // }
// // // // @media (max-width: 1100px) {
// // // //   .sbd-kpi-row {
// // // //     grid-template-columns: repeat(3, 1fr);
// // // //   }
// // // // }
// // // // @media (max-width: 700px) {
// // // //   .sbd-kpi-row {
// // // //     grid-template-columns: repeat(2, 1fr);
// // // //   }
// // // // }
// // // // @media (max-width: 460px) {
// // // //   .sbd-kpi-row {
// // // //     grid-template-columns: 1fr;
// // // //   }
// // // // }
// // // // .sbd-card {
// // // //   background-color: #fff;
// // // //   border-radius: 10px;
// // // //   padding: 18px 20px;
// // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // // }
// // // // .sbd-icon-circle {
// // // //   width: 36px;
// // // //   height: 36px;
// // // //   border-radius: 50%;
// // // //   display: flex;
// // // //   align-items: center;
// // // //   justify-content: center;
// // // //   margin-bottom: 12px;
// // // // }
// // // // .sbd-card-label {
// // // //   font-size: 13px;
// // // //   color: #6b7280;
// // // //   margin-bottom: 6px;
// // // // }
// // // // .sbd-card-value {
// // // //   font-size: 22px;
// // // //   font-weight: 700;
// // // //   color: #1a2b4c;
// // // // }
// // // // .sbd-table-card {
// // // //   background-color: #fff;
// // // //   border-radius: 10px;
// // // //   padding: 8px;
// // // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // //   overflow-x: auto;
// // // // }
// // // // .sbd-table {
// // // //   width: 100%;
// // // //   border-collapse: collapse;
// // // // }
// // // // .sbd-table th {
// // // //   text-align: left;
// // // //   font-size: 12px;
// // // //   letter-spacing: 0.03em;
// // // //   text-transform: uppercase;
// // // //   color: #6b7280;
// // // //   font-weight: 600;
// // // //   padding: 12px 16px;
// // // //   border-bottom: 2px solid #eef1f6;
// // // //   white-space: nowrap;
// // // // }
// // // // .sbd-table td {
// // // //   font-size: 14px;
// // // //   color: #1a2b4c;
// // // //   padding: 12px 16px;
// // // //   border-bottom: 1px solid #eef1f6;
// // // //   white-space: nowrap;
// // // // }
// // // // .sbd-table tbody tr:hover {
// // // //   background-color: #f8fafc;
// // // // }
// // // // .sbd-table tbody tr:last-child td {
// // // //   border-bottom: none;
// // // // }
// // // // .sbd-empty, .sbd-loading {
// // // //   font-size: 14px;
// // // //   color: #9ca3af;
// // // //   padding: 24px 16px;
// // // //   text-align: center;
// // // //   display: flex;
// // // //   align-items: center;
// // // //   justify-content: center;
// // // // }
// // // // `;

// // // // export default function StudentBranchDashboard() {
// // // //   const [year, setYear] = useState("All");
// // // //   const [month, setMonth] = useState("All");
// // // //   const [selectedStates, setSelectedStates] = useState([]);
// // // //   const [selectedZones, setSelectedZones] = useState([]);
// // // //   const [selectedAgms, setSelectedAgms] = useState([]);
// // // //   const [selectedGrades, setSelectedGrades] = useState([]);
// // // //   const [selectedBranches, setSelectedBranches] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [data, setData] = useState([]);

// // // //   useEffect(() => {
// // // //     setLoading(true);
// // // //     setError(null);

// // // //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// // // //       .then((response) => {
// // // //         if (!response.ok) {
// // // //           throw new Error(`HTTP ${response.status}`);
// // // //         }
// // // //         return response.json();
// // // //       })
// // // //       .then((result) => {
// // // //         console.log("API Result:", result);

// // // //         const rows = Array.isArray(result) ? result : result?.data ?? [];

// // // //         const mappedData = rows.map((item) => ({
// // // //           state: item.state,
// // // //           zone: item.zone,
// // // //           agm: item.agm,
// // // //           grade: item.grade,


// // // //           branch: item.branch_name,
// // // //           year: item.academic_year ?? "All",
// // // //           month: item.month_name ?? "All",

// // // //           studentCount: Number(item.student_count) || 0,
// // // //           addressedCount: Number(item.students_with_address) || 0,
// // // //           withoutAddressCount: Number(item.students_without_address) || 0,
// // // //         }));

// // // //         setData(mappedData);
// // // //         setLoading(false);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.log(err);
// // // //         setError(`Could not load report data: ${err.message}`);
// // // //         setLoading(false);
// // // //       });
// // // //   }, []);

// // // //   const stateOptions = useMemo(
// // // //     () => [...new Set(data.map(x => x.state))].sort(),
// // // //     [data]
// // // //   );

// // // //   const zoneOptions = useMemo(() => {
// // // //     return [...new Set(
// // // //       data
// // // //         .filter(x =>
// // // //           selectedStates.length === 0 ||
// // // //           selectedStates.includes(x.state)
// // // //         )
// // // //         .map(x => x.zone)
// // // //     )].sort();
// // // //   }, [data, selectedStates]);

// // // //   const agmOptions = useMemo(() => {
// // // //     return [...new Set(
// // // //       data
// // // //         .filter(x =>
// // // //           (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // // //           (selectedZones.length === 0 || selectedZones.includes(x.zone))
// // // //         )
// // // //         .map(x => x.agm)
// // // //     )].sort();
// // // //   }, [data, selectedStates, selectedZones]);

// // // //   const gradeOptions = useMemo(() => {
// // // //     return [...new Set(
// // // //       data
// // // //         .filter(x =>
// // // //           (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // // //           (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// // // //           (selectedAgms.length === 0 || selectedAgms.includes(x.agm))
// // // //         )
// // // //         .map(x => x.grade)
// // // //     )].sort();
// // // //   }, [data, selectedStates, selectedZones, selectedAgms]);

// // // //   const branchOptions = useMemo(() => {
// // // //     return [...new Set(
// // // //       data
// // // //         .filter(x =>
// // // //           (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // // //           (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// // // //           (selectedAgms.length === 0 || selectedAgms.includes(x.agm)) &&
// // // //           (selectedGrades.length === 0 || selectedGrades.includes(x.grade))
// // // //         )
// // // //         .map(x => x.branch)
// // // //     )].sort();
// // // //   }, [data, selectedStates, selectedZones, selectedAgms, selectedGrades]);



// // // //   const YEARS = useMemo(() => [...new Set(data.map((item) => item.year))], [data]);
// // // //   const MONTHS = useMemo(() => [...new Set(data.map((item) => item.month))], [data]);
// // // //   const branches = useMemo(() => [...new Set(data.map((item) => item.branch))], [data]);

// // // //   const filtered = useMemo(() => {

// // // //     return data.filter(item =>

// // // //       (selectedStates.length === 0 ||
// // // //         selectedStates.includes(item.state))

// // // //       &&

// // // //       (selectedZones.length === 0 ||
// // // //         selectedZones.includes(item.zone))

// // // //       &&

// // // //       (selectedAgms.length === 0 ||
// // // //         selectedAgms.includes(item.agm))

// // // //       &&

// // // //       (selectedGrades.length === 0 ||
// // // //         selectedGrades.includes(item.grade))

// // // //       &&

// // // //       (selectedBranches.length === 0 ||
// // // //         selectedBranches.includes(item.branch))

// // // //     );

// // // //   }, [
// // // //     data,
// // // //     selectedStates,
// // // //     selectedZones,
// // // //     selectedAgms,
// // // //     selectedGrades,
// // // //     selectedBranches
// // // //   ]);

// // // //   const totalStudents = useMemo(
// // // //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// // // //     [filtered]
// // // //   );

// // // //   const totalAddressed = useMemo(
// // // //     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
// // // //     [filtered]
// // // //   );

// // // //   const totalWithoutAddress = useMemo(
// // // //     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
// // // //     [filtered]
// // // //   );

// // // //   const totalBranches = useMemo(() => {
// // // //     return new Set(filtered.map((r) => r.branch)).size;
// // // //   }, [filtered]);

// // // //   // Overall percentage of addressed students across the current filter
// // // //   const overallPercentage = useMemo(() => {
// // // //     if (totalStudents === 0) return 0;
// // // //     return (totalAddressed / totalStudents) * 100;
// // // //   }, [totalAddressed, totalStudents]);

// // // //   const tableRows = useMemo(() => {
// // // //     const byBranch = {};
// // // //     filtered.forEach((r) => {
// // // //       if (!byBranch[r.branch]) {
// // // //         byBranch[r.branch] = {
// // // //           state: r.state,
// // // //           zone: r.zone,
// // // //           agm: r.agm,
// // // //           grade: r.grade,
// // // //           branch: r.branch,
// // // //           studentCount: 0,
// // // //           addressedCount: 0,
// // // //           withoutAddressCount: 0,
// // // //         };
// // // //       }
// // // //       byBranch[r.branch].studentCount += r.studentCount;
// // // //       byBranch[r.branch].addressedCount += r.addressedCount;
// // // //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// // // //     });

// // // //     return Object.values(byBranch)
// // // //       .map((row) => ({
// // // //         ...row,
// // // //         percentage:
// // // //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// // // //       }))
// // // //       .sort((a, b) => a.studentCount - b.studentCount);
// // // //   }, [filtered]);

// // // //   return (
// // // //     <div className="sbd-page">
// // // //       <style>{CSS}</style>
// // // //       <div className="sbd-container">
// // // //         {/* Header */}
// // // //         <div className="sbd-header">
// // // //           <h1 className="sbd-title">Student & Branch Overview</h1>

// // // //           <div className="sbd-filters">
// // // //             {/* state */}
// // // //             <Select
// // // //               isMulti
// // // //               placeholder="Select State"
// // // //               options={stateOptions.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               value={selectedStates.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               onChange={(selected) => {
// // // //                 const values = selected ? selected.map(x => x.value) : [];

// // // //                 setSelectedStates(values);
// // // //                 setSelectedZones([]);
// // // //                 setSelectedAgms([]);
// // // //                 setSelectedGrades([]);
// // // //                 setSelectedBranches([]);
// // // //               }}
// // // //             />

// // // //             {/* zone */}
// // // //             <Select
// // // //               isMulti
// // // //               placeholder="Select Zone"
// // // //               options={zoneOptions.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               value={selectedZones.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               onChange={(selected) => {

// // // //                 const values = selected ? selected.map(x => x.value) : [];

// // // //                 setSelectedZones(values);
// // // //                 setSelectedAgms([]);
// // // //                 setSelectedGrades([]);
// // // //                 setSelectedBranches([]);
// // // //               }}
// // // //             />

// // // //             {/* AGMS */}
// // // //             <Select
// // // //               isMulti
// // // //               placeholder="Select AGM"
// // // //               options={agmOptions.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               value={selectedZones.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               onChange={(selected) => {
// // // //                 const values = selected ? selected.map(x => x.value) : [];

// // // //                 setSelectedAgms(values);
// // // //                 setSelectedGrades([]);
// // // //                 setSelectedBranches([]);
// // // //               }}
// // // //             />

// // // //             {/* Branches */}
// // // //             <Select
// // // //               isMulti
// // // //               placeholder="Select Branch"
// // // //               options={branchOptions.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               value={selectedBranches.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               onChange={(selected) => {
// // // //                 const values = selected ? selected.map(x => x.value) : [];
// // // //                 setSelectedBranches(values);
// // // //               }}
// // // //             />

// // // //             {/* grade Filter */}
// // // //             <Select
// // // //               isMulti
// // // //               placeholder="Select Grade"
// // // //               options={gradeOptions.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               value={selectedGrades.map(x => ({
// // // //                 value: x,
// // // //                 label: x
// // // //               }))}
// // // //               onChange={(selected) => {
// // // //                 const values = selected ? selected.map(x => x.value) : [];
// // // //                 setSelectedGrades(values);
// // // //                 setSelectedBranches([]);
// // // //               }}
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {error && <div className="sbd-error">{error}</div>}

// // // //         {/* KPI Cards */}
// // // //         <div className="sbd-kpi-row">
// // // //           <div className="sbd-card">
// // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
// // // //               <UsersIcon />
// // // //             </div>
// // // //             <div className="sbd-card-label">Total Students</div>
// // // //             <div className="sbd-card-value">
// // // //               {loading ? "…" : formatIN(totalStudents)}
// // // //             </div>
// // // //           </div>

// // // //           <div className="sbd-card">
// // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
// // // //               <BuildingIcon />
// // // //             </div>
// // // //             <div className="sbd-card-label">Total Branches</div>
// // // //             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
// // // //           </div>

// // // //           <div className="sbd-card">
// // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
// // // //               <AddressCheckIcon />
// // // //             </div>
// // // //             <div className="sbd-card-label">Students With Address</div>
// // // //             <div className="sbd-card-value">
// // // //               {loading ? "…" : formatIN(totalAddressed)}
// // // //             </div>
// // // //           </div>

// // // //           <div className="sbd-card">
// // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// // // //               <AddressXIcon />
// // // //             </div>
// // // //             <div className="sbd-card-label">Student Address Not Updated</div>
// // // //             <div className="sbd-card-value">
// // // //               {loading ? "…" : formatIN(totalWithoutAddress)}
// // // //             </div>
// // // //           </div>

// // // //           <div className="sbd-card">
// // // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
// // // //               <PercentIcon />
// // // //             </div>
// // // //             <div className="sbd-card-label">Overall Addressed %</div>
// // // //             <div className="sbd-card-value">
// // // //               {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Table */}
// // // //         <div className="sbd-table-card">
// // // //           {loading ? (
// // // //             <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
// // // //               <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
// // // //             </div>
// // // //           ) : (
// // // //             <table className="sbd-table">
// // // //               <thead>
// // // //                 <tr>
// // // //                   <th>AGM</th>
// // // //                   <th>State</th>
// // // //                   <th>Zone</th>
// // // //                   <th>Branch</th>
// // // //                   <th>Grade</th>
// // // //                   <th>Student Count</th>
// // // //                   <th>Total Addressed Student Count</th>
// // // //                   <th>Student Address Not Updated</th>
// // // //                   <th>Percentage</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody>
// // // //                 {tableRows.length === 0 ? (
// // // //                   <tr>
// // // //                     <td colSpan={5} className="sbd-empty">
// // // //                       No data for the selected filters.
// // // //                     </td>
// // // //                   </tr>
// // // //                 ) : (
// // // //                   tableRows.map((row) => (
// // // //                     <tr key={row.branch}>
// // // //                       <td>{row.agm}</td>
// // // //                       <td>{row.state}</td>
// // // //                       <td>{row.zone}</td>
// // // //                       <td>{row.branch}</td>
// // // //                       <td>{row.grade}</td>
// // // //                       <td>{formatIN(row.studentCount)}</td>
// // // //                       <td>{formatIN(row.addressedCount)}</td>
// // // //                       <td>{formatIN(row.withoutAddressCount)}</td>
// // // //                       <td>{row.percentage.toFixed(1)}%</td>
// // // //                     </tr>
// // // //                   ))
// // // //                 )}
// // // //               </tbody>
// // // //             </table>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }



// // // import { useState, useMemo, useEffect } from "react";
// // // import SpinnerDotted from "./loading";
// // // import Select from "react-select";

// // // // Simple inline icons (no external dependency, avoids React version conflicts)
// // // function UsersIcon() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// // //       <circle cx="9" cy="7" r="4" />
// // //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// // //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// // //     </svg>
// // //   );
// // // }

// // // function BuildingIcon() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// // //       <path d="M9 22v-4h6v4" />
// // //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// // //     </svg>
// // //   );
// // // }

// // // function AddressCheckIcon() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // //       <circle cx="12" cy="10" r="3" />
// // //     </svg>
// // //   );
// // // }

// // // function AddressXIcon() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// // //       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
// // //       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
// // //     </svg>
// // //   );
// // // }

// // // function PercentIcon() {
// // //   return (
// // //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //       <line x1="19" y1="5" x2="5" y2="19" />
// // //       <circle cx="6.5" cy="6.5" r="2.5" />
// // //       <circle cx="17.5" cy="17.5" r="2.5" />
// // //     </svg>
// // //   );
// // // }

// // // function formatIN(num) {
// // //   return Number(num || 0).toLocaleString("en-IN");
// // // }

// // // // All styling lives here so the dashboard renders correctly with zero
// // // // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// // // const CSS = `
// // // .sbd-page {
// // //   min-height: 100vh;
// // //   background-color: #f4f6fa;
// // //   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
// // //   padding: 24px;
// // //   box-sizing: border-box;
// // // }
// // // .sbd-page *, .sbd-page *::before, .sbd-page *::after {
// // //   box-sizing: border-box;
// // // }
// // // .sbd-container {
// // //   max-width: 1200px;
// // //   margin: 0 auto;
// // // }
// // // .sbd-header {
// // //   display: flex;
// // //   flex-wrap: wrap;
// // //   align-items: center;
// // //   justify-content: space-between;
// // //   gap: 12px;
// // //   background-color: #fff;
// // //   border-radius: 10px;
// // //   padding: 18px 22px;
// // //   margin-bottom: 20px;
// // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // }
// // // .sbd-title {
// // //   font-size: 20px;
// // //   font-weight: 700;
// // //   color: #1a2b4c;
// // //   margin: 0;
// // // }
// // // .sbd-filters {
// // //   display: flex;
// // //   gap: 10px;
// // //   flex-wrap: wrap;
// // // }
// // // .sbd-filters > div {
// // //   min-width: 170px;
// // // }
// // // .sbd-select {
// // //   padding: 8px 12px;
// // //   border-radius: 6px;
// // //   border: 1px solid #dde2ea;
// // //   background-color: #fff;
// // //   font-size: 14px;
// // //   color: #333;
// // //   cursor: pointer;
// // // }
// // // .sbd-error {
// // //   background-color: #fdecec;
// // //   color: #c0392b;
// // //   border-radius: 8px;
// // //   padding: 10px 16px;
// // //   margin-bottom: 20px;
// // //   font-size: 14px;
// // // }
// // // .sbd-kpi-row {
// // //   display: grid;
// // //   grid-template-columns: repeat(5, 1fr);
// // //   gap: 16px;
// // //   margin-bottom: 20px;
// // // }
// // // @media (max-width: 1100px) {
// // //   .sbd-kpi-row {
// // //     grid-template-columns: repeat(3, 1fr);
// // //   }
// // // }
// // // @media (max-width: 700px) {
// // //   .sbd-kpi-row {
// // //     grid-template-columns: repeat(2, 1fr);
// // //   }
// // // }
// // // @media (max-width: 460px) {
// // //   .sbd-kpi-row {
// // //     grid-template-columns: 1fr;
// // //   }
// // // }
// // // .sbd-card {
// // //   background-color: #fff;
// // //   border-radius: 10px;
// // //   padding: 18px 20px;
// // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // // }
// // // .sbd-icon-circle {
// // //   width: 36px;
// // //   height: 36px;
// // //   border-radius: 50%;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // //   margin-bottom: 12px;
// // // }
// // // .sbd-card-label {
// // //   font-size: 13px;
// // //   color: #6b7280;
// // //   margin-bottom: 6px;
// // // }
// // // .sbd-card-value {
// // //   font-size: 22px;
// // //   font-weight: 700;
// // //   color: #1a2b4c;
// // // }
// // // .sbd-table-card {
// // //   background-color: #fff;
// // //   border-radius: 10px;
// // //   padding: 8px;
// // //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // //   overflow-x: auto;
// // // }
// // // .sbd-table {
// // //   width: 100%;
// // //   border-collapse: collapse;
// // // }
// // // .sbd-table th {
// // //   text-align: left;
// // //   font-size: 12px;
// // //   letter-spacing: 0.03em;
// // //   text-transform: uppercase;
// // //   color: #6b7280;
// // //   font-weight: 600;
// // //   padding: 12px 16px;
// // //   border-bottom: 2px solid #eef1f6;
// // //   white-space: nowrap;
// // // }
// // // .sbd-table td {
// // //   font-size: 14px;
// // //   color: #1a2b4c;
// // //   padding: 12px 16px;
// // //   border-bottom: 1px solid #eef1f6;
// // //   white-space: nowrap;
// // // }
// // // .sbd-table tbody tr:hover {
// // //   background-color: #f8fafc;
// // // }
// // // .sbd-table tbody tr:last-child td {
// // //   border-bottom: none;
// // // }
// // // .sbd-empty, .sbd-loading {
// // //   font-size: 14px;
// // //   color: #9ca3af;
// // //   padding: 24px 16px;
// // //   text-align: center;
// // //   display: flex;
// // //   align-items: center;
// // //   justify-content: center;
// // // }
// // // `;

// // // export default function StudentBranchDashboard() {
// // //   // NOTE: year/month are single-selects (a row belongs to exactly one
// // //   // academic year + month), everything else is multi-select.
// // //   const [year, setYear] = useState("All");
// // //   const [month, setMonth] = useState("All");
// // //   const [selectedStates, setSelectedStates] = useState([]);
// // //   const [selectedZones, setSelectedZones] = useState([]);
// // //   const [selectedAgms, setSelectedAgms] = useState([]);
// // //   const [selectedGrades, setSelectedGrades] = useState([]);
// // //   const [selectedBranches, setSelectedBranches] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [data, setData] = useState([]);

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     setError(null);

// // //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// // //       .then((response) => {
// // //         if (!response.ok) {
// // //           throw new Error(`HTTP ${response.status}`);
// // //         }
// // //         return response.json();
// // //       })
// // //       .then((result) => {
// // //         const rows = Array.isArray(result) ? result : result?.data ?? [];

// // //         const mappedData = rows.map((item) => ({
// // //           state: item.state,
// // //           zone: item.zone,
// // //           agm: item.agm,
// // //           grade: item.grade,
// // //           branch: item.branch_name,
// // //           year: item.academic_year ?? "All",
// // //           month: item.month_name ?? "All",
// // //           studentCount: Number(item.student_count) || 0,
// // //           addressedCount: Number(item.students_with_address) || 0,
// // //           withoutAddressCount: Number(item.students_without_address) || 0,
// // //         }));

// // //         setData(mappedData);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(`Could not load report data: ${err.message}`);
// // //         setLoading(false);
// // //       });
// // //   }, []);

// // //   // Base pool respecting Year/Month, which sit "above" the cascading
// // //   // state -> zone -> agm -> grade -> branch hierarchy.
// // //   const yearMonthFiltered = useMemo(() => {
// // //     return data.filter(
// // //       (x) =>
// // //         (year === "All" || x.year === year) &&
// // //         (month === "All" || x.month === month)
// // //     );
// // //   }, [data, year, month]);

// // //   const YEARS = useMemo(
// // //     () => [...new Set(data.map((item) => item.year))].sort(),
// // //     [data]
// // //   );
// // //   const MONTHS = useMemo(
// // //     () => [...new Set(data.map((item) => item.month))].sort(),
// // //     [data]
// // //   );

// // //   // Each level's options are derived from everything selected "above" it,
// // //   // so a dropdown only ever shows choices that actually exist given the
// // //   // current selection (cascading filters).
// // //   const stateOptions = useMemo(
// // //     () => [...new Set(yearMonthFiltered.map((x) => x.state))].sort(),
// // //     [yearMonthFiltered]
// // //   );

// // //   const zoneOptions = useMemo(() => {
// // //     return [...new Set(
// // //       yearMonthFiltered
// // //         .filter((x) => selectedStates.length === 0 || selectedStates.includes(x.state))
// // //         .map((x) => x.zone)
// // //     )].sort();
// // //   }, [yearMonthFiltered, selectedStates]);

// // //   const agmOptions = useMemo(() => {
// // //     return [...new Set(
// // //       yearMonthFiltered
// // //         .filter(
// // //           (x) =>
// // //             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // //             (selectedZones.length === 0 || selectedZones.includes(x.zone))
// // //         )
// // //         .map((x) => x.agm)
// // //     )].sort();
// // //   }, [yearMonthFiltered, selectedStates, selectedZones]);

// // //   const gradeOptions = useMemo(() => {
// // //     return [...new Set(
// // //       yearMonthFiltered
// // //         .filter(
// // //           (x) =>
// // //             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // //             (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// // //             (selectedAgms.length === 0 || selectedAgms.includes(x.agm))
// // //         )
// // //         .map((x) => x.grade)
// // //     )].sort();
// // //   }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms]);

// // //   const branchOptions = useMemo(() => {
// // //     return [...new Set(
// // //       yearMonthFiltered
// // //         .filter(
// // //           (x) =>
// // //             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// // //             (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// // //             (selectedAgms.length === 0 || selectedAgms.includes(x.agm)) &&
// // //             (selectedGrades.length === 0 || selectedGrades.includes(x.grade))
// // //         )
// // //         .map((x) => x.branch)
// // //     )].sort();
// // //   }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms, selectedGrades]);

// // //   const filtered = useMemo(() => {
// // //     return yearMonthFiltered.filter(
// // //       (item) =>
// // //         (selectedStates.length === 0 || selectedStates.includes(item.state)) &&
// // //         (selectedZones.length === 0 || selectedZones.includes(item.zone)) &&
// // //         (selectedAgms.length === 0 || selectedAgms.includes(item.agm)) &&
// // //         (selectedGrades.length === 0 || selectedGrades.includes(item.grade)) &&
// // //         (selectedBranches.length === 0 || selectedBranches.includes(item.branch))
// // //     );
// // //   }, [
// // //     yearMonthFiltered,
// // //     selectedStates,
// // //     selectedZones,
// // //     selectedAgms,
// // //     selectedGrades,
// // //     selectedBranches,
// // //   ]);

// // //   const totalStudents = useMemo(
// // //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// // //     [filtered]
// // //   );

// // //   const totalAddressed = useMemo(
// // //     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
// // //     [filtered]
// // //   );

// // //   const totalWithoutAddress = useMemo(
// // //     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
// // //     [filtered]
// // //   );

// // //   const totalBranches = useMemo(() => {
// // //     return new Set(filtered.map((r) => r.branch)).size;
// // //   }, [filtered]);

// // //   // Overall percentage of addressed students across the current filter
// // //   const overallPercentage = useMemo(() => {
// // //     if (totalStudents === 0) return 0;
// // //     return (totalAddressed / totalStudents) * 100;
// // //   }, [totalAddressed, totalStudents]);

// // //   const tableRows = useMemo(() => {
// // //     const byBranch = {};
// // //     filtered.forEach((r) => {
// // //       if (!byBranch[r.branch]) {
// // //         byBranch[r.branch] = {
// // //           state: r.state,
// // //           zone: r.zone,
// // //           agm: r.agm,
// // //           grade: r.grade,
// // //           branch: r.branch,
// // //           studentCount: 0,
// // //           addressedCount: 0,
// // //           withoutAddressCount: 0,
// // //         };
// // //       }
// // //       byBranch[r.branch].studentCount += r.studentCount;
// // //       byBranch[r.branch].addressedCount += r.addressedCount;
// // //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// // //     });

// // //     return Object.values(byBranch)
// // //       .map((row) => ({
// // //         ...row,
// // //         percentage:
// // //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// // //       }))
// // //       .sort((a, b) => a.studentCount - b.studentCount);
// // //   }, [filtered]);

// // //   const toValues = (arr) => arr.map((x) => ({ value: x, label: x }));

// // //   return (
// // //     <div className="sbd-page">
// // //       <style>{CSS}</style>
// // //       <div className="sbd-container">
// // //         {/* Header */}
// // //         <div className="sbd-header">
// // //           <h1 className="sbd-title">Student & Branch Overview</h1>

// // //           <div className="sbd-filters">
// // //             {/* Year */}
// // //             <select
// // //               className="sbd-select"
// // //               value={year}
// // //               onChange={(e) => setYear(e.target.value)}
// // //             >
// // //               <option value="All">All Years</option>
// // //               {YEARS.map((y) => (
// // //                 <option key={y} value={y}>{y}</option>
// // //               ))}
// // //             </select>

// // //             {/* Month */}
// // //             <select
// // //               className="sbd-select"
// // //               value={month}
// // //               onChange={(e) => setMonth(e.target.value)}
// // //             >
// // //               <option value="All">All Months</option>
// // //               {MONTHS.map((m) => (
// // //                 <option key={m} value={m}>{m}</option>
// // //               ))}
// // //             </select>

// // //             {/* State */}
// // //             <Select
// // //               isMulti
// // //               placeholder="Select State"
// // //               options={toValues(stateOptions)}
// // //               value={toValues(selectedStates)}
// // //               onChange={(selected) => {
// // //                 const values = selected ? selected.map((x) => x.value) : [];
// // //                 setSelectedStates(values);
// // //                 setSelectedZones([]);
// // //                 setSelectedAgms([]);
// // //                 setSelectedGrades([]);
// // //                 setSelectedBranches([]);
// // //               }}
// // //             />

// // //             {/* Zone */}
// // //             <Select
// // //               isMulti
// // //               placeholder="Select Zone"
// // //               options={toValues(zoneOptions)}
// // //               value={toValues(selectedZones)}
// // //               onChange={(selected) => {
// // //                 const values = selected ? selected.map((x) => x.value) : [];
// // //                 setSelectedZones(values);
// // //                 setSelectedAgms([]);
// // //                 setSelectedGrades([]);
// // //                 setSelectedBranches([]);
// // //               }}
// // //             />

// // //             {/* AGM */}
// // //             <Select
// // //               isMulti
// // //               placeholder="Select AGM"
// // //               options={toValues(agmOptions)}
// // //               value={toValues(selectedAgms)}
// // //               onChange={(selected) => {
// // //                 const values = selected ? selected.map((x) => x.value) : [];
// // //                 setSelectedAgms(values);
// // //                 setSelectedGrades([]);
// // //                 setSelectedBranches([]);
// // //               }}
// // //             />

// // //             {/* Grade */}
// // //             <Select
// // //               isMulti
// // //               placeholder="Select Grade"
// // //               options={toValues(gradeOptions)}
// // //               value={toValues(selectedGrades)}
// // //               onChange={(selected) => {
// // //                 const values = selected ? selected.map((x) => x.value) : [];
// // //                 setSelectedGrades(values);
// // //                 setSelectedBranches([]);
// // //               }}
// // //             />

// // //             {/* Branch */}
// // //             <Select
// // //               isMulti
// // //               placeholder="Select Branch"
// // //               options={toValues(branchOptions)}
// // //               value={toValues(selectedBranches)}
// // //               onChange={(selected) => {
// // //                 const values = selected ? selected.map((x) => x.value) : [];
// // //                 setSelectedBranches(values);
// // //               }}
// // //             />
// // //           </div>
// // //         </div>

// // //         {error && <div className="sbd-error">{error}</div>}

// // //         {/* KPI Cards */}
// // //         <div className="sbd-kpi-row">
// // //           <div className="sbd-card">
// // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
// // //               <UsersIcon />
// // //             </div>
// // //             <div className="sbd-card-label">Total Students</div>
// // //             <div className="sbd-card-value">
// // //               {loading ? "…" : formatIN(totalStudents)}
// // //             </div>
// // //           </div>

// // //           <div className="sbd-card">
// // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
// // //               <BuildingIcon />
// // //             </div>
// // //             <div className="sbd-card-label">Total Branches</div>
// // //             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
// // //           </div>

// // //           <div className="sbd-card">
// // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
// // //               <AddressCheckIcon />
// // //             </div>
// // //             <div className="sbd-card-label">Students With Address</div>
// // //             <div className="sbd-card-value">
// // //               {loading ? "…" : formatIN(totalAddressed)}
// // //             </div>
// // //           </div>

// // //           <div className="sbd-card">
// // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// // //               <AddressXIcon />
// // //             </div>
// // //             <div className="sbd-card-label">Student Address Not Updated</div>
// // //             <div className="sbd-card-value">
// // //               {loading ? "…" : formatIN(totalWithoutAddress)}
// // //             </div>
// // //           </div>

// // //           <div className="sbd-card">
// // //             <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
// // //               <PercentIcon />
// // //             </div>
// // //             <div className="sbd-card-label">Overall Addressed %</div>
// // //             <div className="sbd-card-value">
// // //               {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Table */}
// // //         <div className="sbd-table-card">
// // //           {loading ? (
// // //             <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
// // //               <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
// // //             </div>
// // //           ) : (
// // //             <table className="sbd-table">
// // //               <thead>
// // //                 <tr>
// // //                   <th>AGM</th>
// // //                   <th>State</th>
// // //                   <th>Zone</th>
// // //                   <th>Branch</th>
// // //                   <th>Grade</th>
// // //                   <th>Student Count</th>
// // //                   <th>Total Addressed Student Count</th>
// // //                   <th>Student Address Not Updated</th>
// // //                   <th>Percentage</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {tableRows.length === 0 ? (
// // //                   <tr>
// // //                     <td colSpan={9} className="sbd-empty">
// // //                       No data for the selected filters.
// // //                     </td>
// // //                   </tr>
// // //                 ) : (
// // //                   tableRows.map((row) => (
// // //                     <tr key={row.branch}>
// // //                       <td>{row.agm}</td>
// // //                       <td>{row.state}</td>
// // //                       <td>{row.zone}</td>
// // //                       <td>{row.branch}</td>
// // //                       <td>{row.grade}</td>
// // //                       <td>{formatIN(row.studentCount)}</td>
// // //                       <td>{formatIN(row.addressedCount)}</td>
// // //                       <td>{formatIN(row.withoutAddressCount)}</td>
// // //                       <td>{row.percentage.toFixed(1)}%</td>
// // //                     </tr>
// // //                   ))
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // import { useState, useMemo, useEffect } from "react";
// // import SpinnerDotted from "./loading";
// // import Select from "react-select";
// // import * as XLSX from "xlsx";
// // import { saveAs } from 'file-saver';
// // import { BookType } from "lucide-react";

// // // Simple inline icons (no external dependency, avoids React version conflicts)
// // function UsersIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
// //       <circle cx="9" cy="7" r="4" />
// //       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
// //       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
// //     </svg>
// //   );
// // }

// // function BuildingIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
// //       <path d="M9 22v-4h6v4" />
// //       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
// //     </svg>
// //   );
// // }

// // function AddressCheckIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// //       <circle cx="12" cy="10" r="3" />
// //     </svg>
// //   );
// // }

// // function AddressXIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
// //       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
// //       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
// //     </svg>
// //   );
// // }

// // function PercentIcon() {
// //   return (
// //     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <line x1="19" y1="5" x2="5" y2="19" />
// //       <circle cx="6.5" cy="6.5" r="2.5" />
// //       <circle cx="17.5" cy="17.5" r="2.5" />
// //     </svg>
// //   );
// // }

// // function formatIN(num) {
// //   return Number(num || 0).toLocaleString("en-IN");
// // }

// // // All styling lives here so the dashboard renders correctly with zero
// // // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// // const CSS = `
// // .sbd-page {
// //   min-height: 100vh;
// //   background-color: #f4f6fa;
// //   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
// //   padding: 24px;
// //   box-sizing: border-box;
// // }
// // .sbd-page *, .sbd-page *::before, .sbd-page *::after {
// //   box-sizing: border-box;
// // }
// // .sbd-container {
// //   max-width: 1200px;
// //   margin: 0 auto;
// // }
// // .sbd-header {
// //   display: flex;
// //   flex-wrap: wrap;
// //   align-items: center;
// //   justify-content: space-between;
// //   gap: 12px;
// //   background-color: #fff;
// //   border-radius: 10px;
// //   padding: 18px 22px;
// //   margin-bottom: 20px;
// //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // }
// // .sbd-title {
// //   font-size: 20px;
// //   font-weight: 700;
// //   color: #1a2b4c;
// //   margin: 0;
// // }
// // .sbd-filters {
// //   display: flex;
// //   gap: 10px;
// //   flex-wrap: wrap;
// // }
// // .sbd-filters > div {
// //   min-width: 170px;
// // }
// // .sbd-select-container {
// //   width: 220px;
// // }
// // .sbd-select {
// //   padding: 8px 12px;
// //   border-radius: 6px;
// //   border: 1px solid #dde2ea;
// //   background-color: #fff;
// //   font-size: 14px;
// //   color: #333;
// //   cursor: pointer;
// // }
// // .sbd-error {
// //   background-color: #fdecec;
// //   color: #c0392b;
// //   border-radius: 8px;
// //   padding: 10px 16px;
// //   margin-bottom: 20px;
// //   font-size: 14px;
// // }
// // .sbd-kpi-row {
// //   display: grid;
// //   grid-template-columns: repeat(5, 1fr);
// //   gap: 16px;
// //   margin-bottom: 20px;
// // }
// // @media (max-width: 1100px) {
// //   .sbd-kpi-row {
// //     grid-template-columns: repeat(3, 1fr);
// //   }
// // }
// // @media (max-width: 700px) {
// //   .sbd-kpi-row {
// //     grid-template-columns: repeat(2, 1fr);
// //   }
// // }
// // @media (max-width: 460px) {
// //   .sbd-kpi-row {
// //     grid-template-columns: 1fr;
// //   }
// // }
// // .sbd-card {
// //   background-color: #fff;
// //   border-radius: 10px;
// //   padding: 18px 20px;
// //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// // }
// // .sbd-icon-circle {
// //   width: 36px;
// //   height: 36px;
// //   border-radius: 50%;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// //   margin-bottom: 12px;
// // }
// // .sbd-card-label {
// //   font-size: 13px;
// //   color: #6b7280;
// //   margin-bottom: 6px;
// // }
// // .sbd-card-value {
// //   font-size: 22px;
// //   font-weight: 700;
// //   color: #1a2b4c;
// // }
// // .sbd-table-card {
// //   background-color: #fff;
// //   border-radius: 10px;
// //   padding: 8px;
// //   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// //   overflow-x: auto;
// // }
// // .sbd-table {
// //   width: 100%;
// //   border-collapse: collapse;
// // }
// // .sbd-table th {
// //   text-align: left;
// //   font-size: 12px;
// //   letter-spacing: 0.03em;
// //   text-transform: uppercase;
// //   color: #6b7280;
// //   font-weight: 600;
// //   padding: 12px 16px;
// //   border-bottom: 2px solid #eef1f6;
// //   white-space: nowrap;
// // }
// // .sbd-table td {
// //   font-size: 14px;
// //   color: #1a2b4c;
// //   padding: 12px 16px;
// //   border-bottom: 1px solid #eef1f6;
// //   white-space: nowrap;
// // }
// // .sbd-table tbody tr:hover {
// //   background-color: #f8fafc;
// // }
// // .sbd-table tbody tr:last-child td {
// //   border-bottom: none;
// // }
// // .sbd-empty, .sbd-loading {
// //   font-size: 14px;
// //   color: #9ca3af;
// //   padding: 24px 16px;
// //   text-align: center;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // }
// // `;

// // export default function StudentBranchDashboard() {
// //   // NOTE: year/month are single-selects (a row belongs to exactly one
// //   // academic year + month), everything else is multi-select.
// //   const [year, setYear] = useState("All");
// //   const [month, setMonth] = useState("All");
// //   const [selectedStates, setSelectedStates] = useState([]);
// //   const [selectedZones, setSelectedZones] = useState([]);
// //   const [selectedAgms, setSelectedAgms] = useState([]);
// //   const [selectedGrades, setSelectedGrades] = useState([]);
// //   const [selectedBranches, setSelectedBranches] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [data, setData] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 10;

// //   useEffect(() => {
// //     setLoading(true);
// //     setError(null);

// //     fetch("http://192.168.0.1/sctsadmissions/student_addres_report_apis.php?endpoint=report")
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error(`HTTP ${response.status}`);
// //         }
// //         return response.json();
// //       })
// //       .then((result) => {
// //         const rows = Array.isArray(result) ? result : result?.data ?? [];

// //         const mappedData = rows.map((item) => ({
// //           state: item.state,
// //           zone: item.zone,
// //           agm: item.agm,
// //           grade: item.grade,
// //           branch: item.branch_name,
// //           year: item.academic_year ?? "All",
// //           month: item.month_name ?? "All",
// //           studentCount: Number(item.student_count) || 0,
// //           addressedCount: Number(item.students_with_address) || 0,
// //           withoutAddressCount: Number(item.students_without_address) || 0,
// //         }));



// //         setData(mappedData);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(`Could not load report data: ${err.message}`);
// //         setLoading(false);
// //       });
// //   }, []);




// //   // Reset page filter changes

// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [
// //     selectedStates,
// //     selectedZones,
// //     selectedAgms,
// //     selectedGrades,
// //     selectedBranches,
// //     year,
// //     month
// //   ]);



// //   // Base pool respecting Year/Month, which sit "above" the cascading
// //   // state -> zone -> agm -> grade -> branch hierarchy.
// //   const yearMonthFiltered = useMemo(() => {
// //     return data.filter(
// //       (x) =>
// //         (year === "All" || x.year === year) &&
// //         (month === "All" || x.month === month)
// //     );
// //   }, [data, year, month]);

// //   const YEARS = useMemo(
// //     () => [...new Set(data.map((item) => item.year))].sort(),
// //     [data]
// //   );
// //   const MONTHS = useMemo(
// //     () => [...new Set(data.map((item) => item.month))].sort(),
// //     [data]
// //   );

// //   // Each level's options are derived from everything selected "above" it,
// //   // so a dropdown only ever shows choices that actually exist given the
// //   // current selection (cascading filters).
// //   const stateOptions = useMemo(
// //     () => [...new Set(yearMonthFiltered.map((x) => x.state))].sort(),
// //     [yearMonthFiltered]
// //   );

// //   const zoneOptions = useMemo(() => {
// //     return [...new Set(
// //       yearMonthFiltered
// //         .filter((x) => selectedStates.length === 0 || selectedStates.includes(x.state))
// //         .map((x) => x.zone)
// //     )].sort();
// //   }, [yearMonthFiltered, selectedStates]);

// //   const agmOptions = useMemo(() => {
// //     return [...new Set(
// //       yearMonthFiltered
// //         .filter(
// //           (x) =>
// //             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// //             (selectedZones.length === 0 || selectedZones.includes(x.zone))
// //         )
// //         .map((x) => x.agm)
// //     )].sort();
// //   }, [yearMonthFiltered, selectedStates, selectedZones]);

// //   // const gradeOptions = useMemo(() => {
// //   //   return [...new Set(
// //   //     yearMonthFiltered
// //   //       .filter(
// //   //         (x) =>
// //   //           (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// //   //           (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// //   //           (selectedAgms.length === 0 || selectedAgms.includes(x.agm))
// //   //       )
// //   //       .map((x) => x.grade)
// //   //   )].sort();
// //   // }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms]);

// //   const gradeOptions = [
// //     "pre_primary",
// //     "primary",
// //     "high_school",
// //     "puc"
// //   ];

// //   const branchOptions = useMemo(() => {
// //     return [...new Set(
// //       yearMonthFiltered
// //         .filter(
// //           (x) =>
// //             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
// //             (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
// //             (selectedAgms.length === 0 || selectedAgms.includes(x.agm)) &&
// //             (selectedGrades.length === 0 || selectedGrades.includes(x.grade))
// //         )
// //         .map((x) => x.branch)
// //     )].sort();
// //   }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms, selectedGrades]);

// //   const filtered = useMemo(() => {
// //     return yearMonthFiltered.filter(
// //       (item) =>
// //         (selectedStates.length === 0 || selectedStates.includes(item.state)) &&
// //         (selectedZones.length === 0 || selectedZones.includes(item.zone)) &&
// //         (selectedAgms.length === 0 || selectedAgms.includes(item.agm)) &&
// //         (selectedGrades.length === 0 || selectedGrades.includes(item.grade)) &&
// //         (selectedBranches.length === 0 || selectedBranches.includes(item.branch))
// //     );
// //   }, [
// //     yearMonthFiltered,
// //     selectedStates,
// //     selectedZones,
// //     selectedAgms,
// //     selectedGrades,
// //     selectedBranches,
// //   ]);

// //   const totalStudents = useMemo(
// //     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
// //     [filtered]
// //   );

// //   const totalAddressed = useMemo(
// //     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
// //     [filtered]
// //   );

// //   const totalWithoutAddress = useMemo(
// //     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
// //     [filtered]
// //   );

// //   const totalBranches = useMemo(() => {
// //     return new Set(filtered.map((r) => r.branch)).size;
// //   }, [filtered]);

// //   // Overall percentage of addressed students across the current filter
// //   const overallPercentage = useMemo(() => {
// //     if (totalStudents === 0) return 0;
// //     return (totalAddressed / totalStudents) * 100;
// //   }, [totalAddressed, totalStudents]);

// //   const tableRows = useMemo(() => {
// //     const byBranch = {};
// //     filtered.forEach((r) => {
// //       if (!byBranch[r.branch]) {
// //         byBranch[r.branch] = {
// //           state: r.state,
// //           zone: r.zone,
// //           agm: r.agm,
// //           grade: r.grade,
// //           branch: r.branch,
// //           studentCount: 0,
// //           addressedCount: 0,
// //           withoutAddressCount: 0,
// //         };
// //       }
// //       byBranch[r.branch].studentCount += r.studentCount;
// //       byBranch[r.branch].addressedCount += r.addressedCount;
// //       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
// //     });

// //     return Object.values(byBranch)
// //       .map((row) => ({
// //         ...row,
// //         percentage:
// //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// //       }))
// //       .sort((a, b) => a.studentCount - b.studentCount);
// //   }, [filtered]);


// //   // paganation
// //   const totalPages = Math.ceil(tableRows.length / rowsPerPage);

// //   const paginationRows = useMemo(() => {
// //     const start = (currentPage - 1) * rowsPerPage;
// //     return tableRows.slice(start, start + rowsPerPage);
// //   }, [tableRows, currentPage]);

// //   const toValues = (arr) => arr.map((x) => ({ value: x, label: x }));

// //   // Forces tags to wrap onto new lines and caps the box height (with a
// //   // vertical scrollbar) instead of letting the control grow sideways.
// //   const multiSelectStyles = {
// //     control: (base) => ({
// //       ...base,
// //       minHeight: 38,
// //     }),
// //     valueContainer: (base) => ({
// //       ...base,
// //       flexWrap: "wrap",
// //       maxHeight: 80,
// //       overflowY: "auto",
// //     }),
// //   };

// //   // Exccel code
// //   const exportToExcel = () => {

// //     const excelData = tableRows.map((row) => ({
// //       AGM: row.agm,
// //       State: row.state,
// //       Zone: row.zone,
// //       Branch: row.branch,
// //       Grade: row.grade,
// //       "Student Count": row.studentCount,
// //       "Students With Address": row.addressedCount,
// //       "Students Without Address": row.withoutAddressCount,
// //       Percentage: row.percentage.toFixed(1) + "%"
// //     }));

// //     const worksheet = XLSX.utils.json_to_sheet(excelData);

// //     const workbook = XLSX.utils.book_new();

// //     XLSX.utils.book_append_sheet(
// //       workbook,
// //       worksheet,
// //       "Student Report"
// //     );

// //     const excelBuffer = XLSX.write(workbook, {
// //       bookType: "xlsx",
// //       type: "array"
// //     });

// //     const file = new Blob(
// //       [excelBuffer],
// //       {
// //         type:
// //           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
// //       }
// //     );

// //     saveAs(file, "Student_Branch_Report.xlsx");
// //   };


// //   return (
// //     <div className="sbd-page">
// //       <style>{CSS}</style>
// //       <div className="sbd-container">
// //         {/* Header */}
// //         <div className="sbd-header">
// //           <h1 className="sbd-title">Student & Branch Overview</h1>

// //           <div className="sbd-filters">
// //             {/* Year */}
// //             {/* <select
// //               className="sbd-select"
// //               value={year}
// //               onChange={(e) => setYear(e.target.value)}
// //             >
// //               <option value="All">All Years</option>
// //               {YEARS.map((y) => (
// //                 <option key={y} value={y}>{y}</option>
// //               ))}
// //             </select>

// //             {/* Month */}
// //             {/* <select
// //               className="sbd-select"
// //               value={month}
// //               onChange={(e) => setMonth(e.target.value)}
// //             >
// //               <option value="All">All Months</option>
// //               {MONTHS.map((m) => (
// //                 <option key={m} value={m}>{m}</option>
// //               ))}
// //             </select> */}

// //             {/* State */}
// //             <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select State"
// //                 styles={multiSelectStyles}
// //                 options={toValues(stateOptions)}
// //                 value={toValues(selectedStates)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setSelectedStates(values);
// //                   setSelectedZones([]);
// //                   setSelectedAgms([]);
// //                   setSelectedGrades([]);
// //                   setSelectedBranches([]);
// //                 }}
// //               />
// //             </div>

// //             {/* Zone */}
// //             <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Zone"
// //                 styles={multiSelectStyles}
// //                 options={toValues(zoneOptions)}
// //                 value={toValues(selectedZones)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setSelectedZones(values);
// //                   setSelectedAgms([]);
// //                   setSelectedGrades([]);
// //                   setSelectedBranches([]);
// //                 }}
// //               />
// //             </div>

// //             {/* AGM */}
// //             <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select AGM"
// //                 styles={multiSelectStyles}
// //                 options={toValues(agmOptions)}
// //                 value={toValues(selectedAgms)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setSelectedAgms(values);
// //                   setSelectedGrades([]);
// //                   setSelectedBranches([]);
// //                 }}
// //               />
// //             </div>

// //             {/* Grade */}
// //             <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Grade"
// //                 styles={multiSelectStyles}
// //                 options={toValues(gradeOptions)}
// //                 value={toValues(selectedGrades)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setSelectedGrades(values);
// //                   setSelectedBranches([]);
// //                 }}
// //               />
// //             </div>

// //             {/* Branch */}
// //             <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Branch"
// //                 styles={multiSelectStyles}
// //                 options={toValues(branchOptions)}
// //                 value={toValues(selectedBranches)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setSelectedBranches(values);
// //                 }}
// //               />
// //             </div>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "flex-end",
// //                 marginBottom: "15px"
// //               }}>
// //               <button
// //                 onClick={exportToExcel}
// //                 style={{
// //                   background: "#1D6F42",
// //                   color: "#fff",
// //                   border: "none",
// //                   padding: "10px 18px",
// //                   borderRadius: "5px",
// //                   cursor: "pointer"
// //                 }}> Download Excel</button>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <div className="sbd-error">{error}</div>}

// //         {/* KPI Cards */}
// //         <div className="sbd-kpi-row">
// //           <div className="sbd-card">
// //             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
// //               <UsersIcon />
// //             </div>
// //             <div className="sbd-card-label">Total Students</div>
// //             <div className="sbd-card-value">
// //               {loading ? "…" : formatIN(totalStudents)}
// //             </div>
// //           </div>

// //           <div className="sbd-card">
// //             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
// //               <BuildingIcon />
// //             </div>
// //             <div className="sbd-card-label">Total Branches</div>
// //             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
// //           </div>

// //           <div className="sbd-card">
// //             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
// //               <AddressCheckIcon />
// //             </div>
// //             <div className="sbd-card-label">Students With Address</div>
// //             <div className="sbd-card-value">
// //               {loading ? "…" : formatIN(totalAddressed)}
// //             </div>
// //           </div>

// //           <div className="sbd-card">
// //             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
// //               <AddressXIcon />
// //             </div>
// //             <div className="sbd-card-label">Student Address Not Updated</div>
// //             <div className="sbd-card-value">
// //               {loading ? "…" : formatIN(totalWithoutAddress)}
// //             </div>
// //           </div>

// //           <div className="sbd-card">
// //             <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
// //               <PercentIcon />
// //             </div>
// //             <div className="sbd-card-label">Overall Addressed %</div>
// //             <div className="sbd-card-value">
// //               {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="sbd-table-card">
// //           {loading ? (
// //             <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
// //               <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
// //             </div>
// //           ) : (
// //             <table className="sbd-table">
// //               <thead>
// //                 <tr>
// //                   <th>AGM</th>
// //                   <th>State</th>
// //                   <th>Zone</th>
// //                   <th>Branch</th>
// //                   <th>Grade</th>
// //                   <th>Student Count</th>
// //                   <th>Total Addressed Student Count</th>
// //                   <th>Student Address Not Updated</th>
// //                   <th>Percentage</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {tableRows.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={9} className="sbd-empty">
// //                       No data for the selected filters.
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   paginationRows.map((row) => (
// //                     <tr key={row.branch}>
// //                       <td>{row.agm}</td>
// //                       <td>{row.state}</td>
// //                       <td>{row.zone}</td>
// //                       <td>{row.branch}</td>
// //                       <td>{row.grade}</td>
// //                       <td>{formatIN(row.studentCount)}</td>
// //                       <td>{formatIN(row.addressedCount)}</td>
// //                       <td>{formatIN(row.withoutAddressCount)}</td>
// //                       <td>{row.percentage.toFixed(1)}%</td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //       <div
// //         style={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           padding: "15px"
// //         }}>
// //         <button
// //           disabled={currentPage === 1}
// //           onClick={() => setCurrentPage(currentPage - 1)}>
// //           Previous
// //         </button>
// //         <span>page {currentPage} of {totalPages}</span>

// //         <button
// //           disabled={currentPage === totalPages}
// //           onClick={() => setCurrentPage(currentPage + 1)}>
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }




// import { useState, useMemo, useEffect } from "react";
// import SpinnerDotted from "./loading";
// import Select from "react-select";
// import * as XLSX from "xlsx";
// import { saveAs } from 'file-saver';

// // Simple inline icons (no external dependency, avoids React version conflicts)
// function UsersIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// }

// function BuildingIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
//       <path d="M9 22v-4h6v4" />
//       <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
//     </svg>
//   );
// }

// function AddressCheckIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
//       <circle cx="12" cy="10" r="3" />
//     </svg>
//   );
// }

// function AddressXIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
//       <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
//       <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
//     </svg>
//   );
// }

// function PercentIcon() {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <line x1="19" y1="5" x2="5" y2="19" />
//       <circle cx="6.5" cy="6.5" r="2.5" />
//       <circle cx="17.5" cy="17.5" r="2.5" />
//     </svg>
//   );
// }

// function formatIN(num) {
//   return Number(num || 0).toLocaleString("en-IN");
// }

// // All styling lives here so the dashboard renders correctly with zero
// // external CSS dependencies (no Bootstrap CDN or build-step import needed).
// const CSS = `
// .sbd-page {
//   min-height: 100vh;
//   background-color: #f4f6fa;
//   font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
//   padding: 24px;
//   box-sizing: border-box;
// }
// .sbd-page *, .sbd-page *::before, .sbd-page *::after {
//   box-sizing: border-box;
// }
// .sbd-container {
//   max-width: 1200px;
//   margin: 0 auto;
// }
// .sbd-header {
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   justify-content: space-between;
//   gap: 12px;
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 18px 22px;
//   margin-bottom: 20px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// }
// .sbd-title {
//   font-size: 20px;
//   font-weight: 700;
//   color: #1a2b4c;
//   margin: 0;
// }
// .sbd-filters {
//   display: flex;
//   gap: 10px;
//   flex-wrap: wrap;
// }
// .sbd-filters > div {
//   min-width: 170px;
// }
// .sbd-select-container {
//   width: 220px;
// }
// .sbd-select {
//   padding: 8px 12px;
//   border-radius: 6px;
//   border: 1px solid #dde2ea;
//   background-color: #fff;
//   font-size: 14px;
//   color: #333;
//   cursor: pointer;
// }
// .sbd-error {
//   background-color: #fdecec;
//   color: #c0392b;
//   border-radius: 8px;
//   padding: 10px 16px;
//   margin-bottom: 20px;
//   font-size: 14px;
// }
// .sbd-kpi-row {
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 16px;
//   margin-bottom: 20px;
// }
// @media (max-width: 1100px) {
//   .sbd-kpi-row {
//     grid-template-columns: repeat(3, 1fr);
//   }
// }
// @media (max-width: 700px) {
//   .sbd-kpi-row {
//     grid-template-columns: repeat(2, 1fr);
//   }
// }
// @media (max-width: 460px) {
//   .sbd-kpi-row {
//     grid-template-columns: 1fr;
//   }
// }
// .sbd-card {
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 18px 20px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// }
// .sbd-icon-circle {
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 12px;
// }
// .sbd-card-label {
//   font-size: 13px;
//   color: #6b7280;
//   margin-bottom: 6px;
// }
// .sbd-card-value {
//   font-size: 22px;
//   font-weight: 700;
//   color: #1a2b4c;
// }
// .sbd-table-card {
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 8px;
//   box-shadow: 0 1px 3px rgba(0,0,0,0.06);
//   overflow-x: auto;
// }
// .sbd-table {
//   width: 100%;
//   border-collapse: collapse;
// }
// .sbd-table th {
//   text-align: left;
//   font-size: 12px;
//   letter-spacing: 0.03em;
//   text-transform: uppercase;
//   color: #6b7280;
//   font-weight: 600;
//   padding: 12px 16px;
//   border-bottom: 2px solid #eef1f6;
//   white-space: nowrap;
// }
// .sbd-table td {
//   font-size: 14px;
//   color: #1a2b4c;
//   padding: 12px 16px;
//   border-bottom: 1px solid #eef1f6;
//   white-space: nowrap;
// }
// .sbd-table tbody tr:hover {
//   background-color: #f8fafc;
// }
// .sbd-table tbody tr:last-child td {
//   border-bottom: none;
// }
// .sbd-empty, .sbd-loading {
//   font-size: 14px;
//   color: #9ca3af;
//   padding: 24px 16px;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }
// `;

// // Base endpoint. Only `grade` is sent to the backend as a query param —
// // State/Zone/AGM/Branch stay purely client-side filters over whatever the
// // backend returns for the selected grade(s).
// const REPORT_ENDPOINT = "http://192.168.0.1/sctsadmissions/student_addres_report_apis.php";

// function buildReportUrl(grades) {
//   const params = new URLSearchParams();
//   params.set("endpoint", "report");

//   if (grades && grades.length > 0) {
//     // Sent as a single comma-separated value, e.g. grade=primary,puc
//     // Backend should read $_GET['grade'], explode(',', ...) and filter
//     // with a SQL "WHERE grade IN (...)".
//     params.set("grade", grades.join(","));
//   }

//   return `${REPORT_ENDPOINT}?${params.toString()}`;
// }

// export default function StudentBranchDashboard() {
//   // NOTE: year/month are single-selects (a row belongs to exactly one
//   // academic year + month), everything else is multi-select.
//   const [year, setYear] = useState("All");
//   const [month, setMonth] = useState("All");
//   const [selectedStates, setSelectedStates] = useState([]);
//   const [selectedZones, setSelectedZones] = useState([]);
//   const [selectedAgms, setSelectedAgms] = useState([]);
//   const [selectedGrades, setSelectedGrades] = useState([]);
//   const [selectedBranches, setSelectedBranches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   // Fetches report data from the backend for the given grade selection.
//   // Only `grade` goes into the URL — every other filter is applied
//   // afterwards on the client against whatever rows come back.
//   const fetchReportData = (grades) => {
//     setLoading(true);
//     setError(null);

//     fetch(buildReportUrl(grades))
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((result) => {
//         const rows = Array.isArray(result) ? result : result?.data ?? [];

//         const mappedData = rows.map((item) => ({
//           state: item.state,
//           zone: item.zone,
//           agm: item.agm,
//           grade: item.grade,
//           branch: item.branch_name,
//           year: item.academic_year ?? "All",
//           month: item.month_name ?? "All",
//           studentCount: Number(item.student_count) || 0,
//           addressedCount: Number(item.students_with_address) || 0,
//           withoutAddressCount: Number(item.students_without_address) || 0,
//         }));

//         setData(mappedData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(`Could not load report data: ${err.message}`);
//         setLoading(false);
//       });
//   };

//   // Whenever the Grade filter changes (including the initial empty
//   // selection on mount), re-hit the backend with the grade(s) in the URL.
//   useEffect(() => {
//     fetchReportData(selectedGrades);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedGrades]);

//   // Reset page on any filter change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [
//     selectedStates,
//     selectedZones,
//     selectedAgms,
//     selectedGrades,
//     selectedBranches,
//     year,
//     month
//   ]);

//   // Base pool respecting Year/Month, which sit "above" the cascading
//   // state -> zone -> agm -> branch hierarchy. (Grade is no longer
//   // filtered here since the backend already returned only the selected
//   // grade(s).)
//   const yearMonthFiltered = useMemo(() => {
//     return data.filter(
//       (x) =>
//         (year === "All" || x.year === year) &&
//         (month === "All" || x.month === month)
//     );
//   }, [data, year, month]);

//   const YEARS = useMemo(
//     () => [...new Set(data.map((item) => item.year))].sort(),
//     [data]
//   );
//   const MONTHS = useMemo(
//     () => [...new Set(data.map((item) => item.month))].sort(),
//     [data]
//   );

//   // Each level's options are derived from everything selected "above" it,
//   // so a dropdown only ever shows choices that actually exist given the
//   // current selection (cascading filters).
//   const stateOptions = useMemo(
//     () => [...new Set(yearMonthFiltered.map((x) => x.state))].sort(),
//     [yearMonthFiltered]
//   );

//   const zoneOptions = useMemo(() => {
//     return [...new Set(
//       yearMonthFiltered
//         .filter((x) => selectedStates.length === 0 || selectedStates.includes(x.state))
//         .map((x) => x.zone)
//     )].sort();
//   }, [yearMonthFiltered, selectedStates]);

//   const agmOptions = useMemo(() => {
//     return [...new Set(
//       yearMonthFiltered
//         .filter(
//           (x) =>
//             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
//             (selectedZones.length === 0 || selectedZones.includes(x.zone))
//         )
//         .map((x) => x.agm)
//     )].sort();
//   }, [yearMonthFiltered, selectedStates, selectedZones]);

//   // Grade options are a fixed list sent to the backend directly,
//   // not derived from fetched data.
//   const gradeOptions = ["pre_primary", "primary", "high_school", "puc"];

//   const branchOptions = useMemo(() => {
//     return [...new Set(
//       yearMonthFiltered
//         .filter(
//           (x) =>
//             (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
//             (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
//             (selectedAgms.length === 0 || selectedAgms.includes(x.agm))
//         )
//         .map((x) => x.branch)
//     )].sort();
//   }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms]);

//   // Grade is intentionally NOT filtered here — the backend already
//   // returned only rows matching the selected grade(s).
//   const filtered = useMemo(() => {
//     return yearMonthFiltered.filter(
//       (item) =>
//         (selectedStates.length === 0 || selectedStates.includes(item.state)) &&
//         (selectedZones.length === 0 || selectedZones.includes(item.zone)) &&
//         (selectedAgms.length === 0 || selectedAgms.includes(item.agm)) &&
//         (selectedBranches.length === 0 || selectedBranches.includes(item.branch))
//     );
//   }, [
//     yearMonthFiltered,
//     selectedStates,
//     selectedZones,
//     selectedAgms,
//     selectedBranches,
//   ]);

//   const totalStudents = useMemo(
//     () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
//     [filtered]
//   );

//   const totalAddressed = useMemo(
//     () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
//     [filtered]
//   );

//   const totalWithoutAddress = useMemo(
//     () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
//     [filtered]
//   );

//   const totalBranches = useMemo(() => {
//     return new Set(filtered.map((r) => r.branch)).size;
//   }, [filtered]);

//   // Overall percentage of addressed students across the current filter
//   const overallPercentage = useMemo(() => {
//     if (totalStudents === 0) return 0;
//     return (totalAddressed / totalStudents) * 100;
//   }, [totalAddressed, totalStudents]);

//   const tableRows = useMemo(() => {
//     const byBranch = {};
//     filtered.forEach((r) => {
//       if (!byBranch[r.branch]) {
//         byBranch[r.branch] = {
//           state: r.state,
//           zone: r.zone,
//           agm: r.agm,
//           grade: r.grade,
//           branch: r.branch,
//           studentCount: 0,
//           addressedCount: 0,
//           withoutAddressCount: 0,
//         };
//       }
//       byBranch[r.branch].studentCount += r.studentCount;
//       byBranch[r.branch].addressedCount += r.addressedCount;
//       byBranch[r.branch].withoutAddressCount += r.withoutAddressCount;
//     });

//     return Object.values(byBranch)
//       .map((row) => ({
//         ...row,
//         percentage:
//           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
//       }))
//       .sort((a, b) => a.studentCount - b.studentCount);
//   }, [filtered]);

//   // pagination
//   const totalPages = Math.ceil(tableRows.length / rowsPerPage) || 1;

//   const paginationRows = useMemo(() => {
//     const start = (currentPage - 1) * rowsPerPage;
//     return tableRows.slice(start, start + rowsPerPage);
//   }, [tableRows, currentPage]);

//   const toValues = (arr) => arr.map((x) => ({ value: x, label: x }));

//   // Forces tags to wrap onto new lines and caps the box height (with a
//   // vertical scrollbar) instead of letting the control grow sideways.
//   const multiSelectStyles = {
//     control: (base) => ({
//       ...base,
//       minHeight: 38,
//     }),
//     valueContainer: (base) => ({
//       ...base,
//       flexWrap: "wrap",
//       maxHeight: 80,
//       overflowY: "auto",
//     }),
//   };

//   // Excel export
//   const exportToExcel = () => {
//     const excelData = tableRows.map((row) => ({
//       AGM: row.agm,
//       State: row.state,
//       Zone: row.zone,
//       Branch: row.branch,
//       Grade: row.grade,
//       "Student Count": row.studentCount,
//       "Students With Address": row.addressedCount,
//       "Students Without Address": row.withoutAddressCount,
//       Percentage: row.percentage.toFixed(1) + "%"
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array"
//     });

//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
//     });

//     saveAs(file, "Student_Branch_Report.xlsx");
//   };

//   return (
//     <div className="sbd-page">
//       <style>{CSS}</style>
//       <div className="sbd-container">
//         {/* Header */}
//         <div className="sbd-header">
//           <h1 className="sbd-title">Student & Branch Overview</h1>

//           <div className="sbd-filters">
//             {/* State */}
//             <div className="sbd-select-container">
//               <Select
//                 isMulti
//                 placeholder="Select State"
//                 styles={multiSelectStyles}
//                 options={toValues(stateOptions)}
//                 value={toValues(selectedStates)}
//                 onChange={(selected) => {
//                   const values = selected ? selected.map((x) => x.value) : [];
//                   setSelectedStates(values);
//                   setSelectedZones([]);
//                   setSelectedAgms([]);
//                   setSelectedBranches([]);
//                 }}
//               />
//             </div>

//             {/* Zone */}
//             <div className="sbd-select-container">
//               <Select
//                 isMulti
//                 placeholder="Select Zone"
//                 styles={multiSelectStyles}
//                 options={toValues(zoneOptions)}
//                 value={toValues(selectedZones)}
//                 onChange={(selected) => {
//                   const values = selected ? selected.map((x) => x.value) : [];
//                   setSelectedZones(values);
//                   setSelectedAgms([]);
//                   setSelectedBranches([]);
//                 }}
//               />
//             </div>

//             {/* AGM */}
//             <div className="sbd-select-container">
//               <Select
//                 isMulti
//                 placeholder="Select AGM"
//                 styles={multiSelectStyles}
//                 options={toValues(agmOptions)}
//                 value={toValues(selectedAgms)}
//                 onChange={(selected) => {
//                   const values = selected ? selected.map((x) => x.value) : [];
//                   setSelectedAgms(values);
//                   setSelectedBranches([]);
//                 }}
//               />
//             </div>



//             {/* Branch */}
//             <div className="sbd-select-container">
//               <Select
//                 isMulti
//                 placeholder="Select Branch"
//                 styles={multiSelectStyles}
//                 options={toValues(branchOptions)}
//                 value={toValues(selectedBranches)}
//                 onChange={(selected) => {
//                   const values = selected ? selected.map((x) => x.value) : [];
//                   setSelectedBranches(values);
//                 }}
//               />
//             </div>

//             {/* Grade — the only filter sent to the backend via the URL */}
//             <div className="sbd-select-container">
//               <Select
//                 isMulti
//                 placeholder="Select Grade"
//                 styles={multiSelectStyles}
//                 options={toValues(gradeOptions)}
//                 value={toValues(selectedGrades)}
//                 onChange={(selected) => {
//                   const values = selected ? selected.map((x) => x.value) : [];
//                   setSelectedGrades(values);
//                   setSelectedBranches([]);
//                 }}
//               />
//             </div>


//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 marginBottom: "15px"
//               }}>
//               <button
//                 onClick={exportToExcel}
//                 style={{
//                   background: "#1D6F42",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 18px",
//                   borderRadius: "5px",
//                   cursor: "pointer"
//                 }}> Download Excel</button>
//             </div>
//           </div>
//         </div>

//         {error && <div className="sbd-error">{error}</div>}

//         {/* KPI Cards */}
//         <div className="sbd-kpi-row">
//           <div className="sbd-card">
//             <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
//               <UsersIcon />
//             </div>
//             <div className="sbd-card-label">Total Students</div>
//             <div className="sbd-card-value">
//               {loading ? "…" : formatIN(totalStudents)}
//             </div>
//           </div>

//           <div className="sbd-card">
//             <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
//               <BuildingIcon />
//             </div>
//             <div className="sbd-card-label">Total Branches</div>
//             <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
//           </div>

//           <div className="sbd-card">
//             <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
//               <AddressCheckIcon />
//             </div>
//             <div className="sbd-card-label">Students With Address</div>
//             <div className="sbd-card-value">
//               {loading ? "…" : formatIN(totalAddressed)}
//             </div>
//           </div>

//           <div className="sbd-card">
//             <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
//               <AddressXIcon />
//             </div>
//             <div className="sbd-card-label">Student Address Not Updated</div>
//             <div className="sbd-card-value">
//               {loading ? "…" : formatIN(totalWithoutAddress)}
//             </div>
//           </div>

//           <div className="sbd-card">
//             <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
//               <PercentIcon />
//             </div>
//             <div className="sbd-card-label">Overall Addressed %</div>
//             <div className="sbd-card-value">
//               {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="sbd-table-card">
//           {loading ? (
//             <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
//               <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
//             </div>
//           ) : (
//             <table className="sbd-table">
//               <thead>
//                 <tr>
//                   <th>AGM</th>
//                   <th>State</th>
//                   <th>Zone</th>
//                   <th>Branch</th>
//                   <th>Grade</th>
//                   <th>Student Count</th>
//                   <th>Total Addressed Student Count</th>
//                   <th>Student Address Not Updated</th>
//                   <th>Percentage</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableRows.length === 0 ? (
//                   <tr>
//                     <td colSpan={9} className="sbd-empty">
//                       No data for the selected filters.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginationRows.map((row) => (
//                     <tr key={row.branch}>
//                       <td>{row.agm}</td>
//                       <td>{row.state}</td>
//                       <td>{row.zone}</td>
//                       <td>{row.branch}</td>
//                       <td>{row.grade}</td>
//                       <td>{formatIN(row.studentCount)}</td>
//                       <td>{formatIN(row.addressedCount)}</td>
//                       <td>{formatIN(row.withoutAddressCount)}</td>
//                       <td>{row.percentage.toFixed(1)}%</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "15px"
//         }}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}>
//           Previous
//         </button>
//         <span>page {currentPage} of {totalPages}</span>

//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }









import { useState, useMemo, useEffect, useRef } from "react";

import SpinnerDotted from "./loading";
import Select from "react-select";
import * as XLSX from "xlsx";
import { saveAs } from 'file-saver';

// Simple inline icons (no external dependency, avoids React version conflicts)
function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </svg>
  );
}

function AddressCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AddressXIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
      <line x1="9.5" y1="7.5" x2="14.5" y2="12.5" />
      <line x1="14.5" y1="7.5" x2="9.5" y2="12.5" />
    </svg>
  );
}

function PercentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function formatIN(num) {
  return Number(num || 0).toLocaleString("en-IN");
}

// All styling lives here so the dashboard renders correctly with zero
// external CSS dependencies (no Bootstrap CDN or build-step import needed).

// Base endpoint. Only `grade` is sent to the backend as a query param —
// State/Zone/AGM/Branch stay purely client-side filters over whatever the
// backend returns for the selected grade(s).
const REPORT_ENDPOINT = "http://192.168.0.1/sctsadmissions/student_addres_report_apis.php";

// function buildReportUrl(grades) {
//   const params = new URLSearchParams();
//   params.set("endpoint", "report");

//   if (grades && grades.length > 0) {
//     // Sent as a single comma-separated value, e.g. grade=primary,puc
//     // Backend should read $_GET['grade'], explode(',', ...) and filter
//     // with a SQL "WHERE grade IN (...)".
//     params.set("grade", grades.join(","));
//   }

//   return `${REPORT_ENDPOINT}?${params.toString()}`;
// }


function buildReportUrl(grades, states, zones, agms, branches) {
  const params = new URLSearchParams();
  params.set("endpoint", "report");

  if (grades && grades.length > 0) {
    params.set("grade", grades.join(","));
  }
  if (states && states.length > 0) {
    params.set("state", states.join(","));
  }
  if (zones && zones.length > 0) {
    params.set("zone", zones.join(","));
  }
  if (agms && agms.length > 0) {
    params.set("agm", agms.join(","));
  }
  if (branches && branches.length > 0) {
    params.set("branch", branches.join(","));
  }

  return `${REPORT_ENDPOINT}?${params.toString()}`;
}



const CSS = `
.sbd-page {
  min-height: 100vh;
  background-color: #f4f6fa;
  font-family: 'Segoe UI', Roboto, -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 24px;
  box-sizing: border-box;
}
.sbd-page *, .sbd-page *::before, .sbd-page *::after {
  box-sizing: border-box;
}
.sbd-container {
  max-width: 1200px;
  margin: 0 auto;
}
.sbd-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: #fff;
  border-radius: 10px;
  padding: 18px 22px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sbd-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a2b4c;
  margin: 0;
}
.sbd-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.sbd-filters > div {
  min-width: 170px;
}
.sbd-select-container {
  width: 220px;
}
.sbd-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #dde2ea;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.sbd-error {
  background-color: #fdecec;
  color: #c0392b;
  border-radius: 8px;
  padding: 10px 16px;
  margin-bottom: 20px;
  font-size: 14px;
}
.sbd-kpi-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
@media (max-width: 1100px) {
  .sbd-kpi-row {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 700px) {
  .sbd-kpi-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 460px) {
  .sbd-kpi-row {
    grid-template-columns: 1fr;
  }
}
.sbd-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.sbd-icon-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}
.sbd-card-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
}
.sbd-card-value {
  font-size: 22px;
  font-weight: 700;
  color: #1a2b4c;
}
.sbd-table-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  overflow-x: auto;
}
.sbd-table {
  width: 100%;
  border-collapse: collapse;
}
.sbd-table th {
  text-align: left;
  font-size: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #6b7280;
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 2px solid #eef1f6;
  white-space: nowrap;
}
.sbd-table td {
  font-size: 14px;
  color: #1a2b4c;
  padding: 12px 16px;
  border-bottom: 1px solid #eef1f6;
  white-space: nowrap;
}
.sbd-table tbody tr:hover {
  background-color: #f8fafc;
}
.sbd-table tbody tr:last-child td {
  border-bottom: none;
}
.sbd-empty, .sbd-loading {
  font-size: 14px;
  color: #9ca3af;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export default function StudentBranchDashboard() {
  // NOTE: year/month are single-selects (a row belongs to exactly one
  // academic year + month), everything else is multi-select.
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedAgms, setSelectedAgms] = useState([]);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // NEW: pending state — what the user is currently picking in the dropdowns,
  // not yet "applied". This is what the Select components bind to.

  const [pendingStates, setPendingStates] = useState([]);
  const [pendingZones, setPendingZones] = useState([]);
  const [pendingAgms, setPendingAgms] = useState([]);
  const [pendingGrades, setPendingGrades] = useState([]);
  const [pendingBranches, setPendingBranches] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const requestIdRef = useRef(0);

  // Fetches report data from the backend for the given grade selection.
  // Only `grade` goes into the URL — every other filter is applied
  // afterwards on the client against whatever rows come back.
  // const fetchReportData = (grades) => {
  //   const thisRequestId = ++requestIdRef.current;
  //   setLoading(true);
  //   setError(null);

  //   fetch(buildReportUrl(grades))
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((result) => {
  //       // If a newer request has started since this one fired, drop this
  //       // response on the floor — it's stale and would clobber fresher data.
  //       if (thisRequestId !== requestIdRef.current) return;

  //       const rows = Array.isArray(result) ? result : result?.data ?? [];

  //       const mappedData = rows.map((item) => ({

  //         state: item.state,
  //         zone: item.zone,
  //         agm: item.agm,
  //         grade: item.grade,
  //         branch: item.branch_name,
  //         year: item.academic_year ?? "All",
  //         month: item.month_name ?? "All",
  //         studentCount: Number(item.student_count) || 0,
  //         addressedCount: Number(item.students_with_address) || 0,
  //         withoutAddressCount: Number(item.students_without_address) || 0,
  //       }));

  //       setData(mappedData);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (thisRequestId !== requestIdRef.current) return;
  //       setError(`Could not load report data: ${err.message}`);
  //       setLoading(false);
  //     });
  // };

  const fetchReportData = (grades, states, zones, agms, branches) => {
    const thisRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    fetch(buildReportUrl(grades, states, zones, agms, branches))
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((result) => {
        if (thisRequestId !== requestIdRef.current) return;
        const rows = Array.isArray(result) ? result : result?.data ?? [];
        const mappedData = rows.map((item) => ({
          state: item.state,
          zone: item.zone,
          agm: item.agm,
          grade: item.grade,
          branch: item.branch_name,
          year: item.academic_year ?? "All",
          month: item.month_name ?? "All",
          studentCount: Number(item.student_count) || 0,
          addressedCount: Number(item.students_with_address) || 0,
          withoutAddressCount: Number(item.students_without_address) || 0,
        }));
        setData(mappedData);
        setLoading(false);
      })
      .catch((err) => {
        if (thisRequestId !== requestIdRef.current) return;
        setError(`Could not load report data: ${err.message}`);
        setLoading(false);
      });
  };

  // Whenever the Grade filter changes (including the initial empty
  // selection on mount), re-hit the backend with the grade(s) in the URL.
  // useEffect(() => {
  //   // fetchReportData(selectedGrades);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   if (!selectedGrades || selectedGrades.length === 0) {
  //     setData([]);
  //     setLoading(false);
  //     setError(null);
  //     return;
  //   }
  //   fetchReportData(selectedGrades);
  // }, [selectedGrades]);

  // useEffect(() => {
  //   if (!selectedGrades || selectedGrades.length === 0) {
  //     setData([]);
  //     setLoading(false);
  //     setError(null);
  //     return;
  //   }
  //   fetchReportData(selectedGrades);
  // }, [selectedGrades]);

  // IMPORTANT FIX: instead of wiping State/Zone/AGM/Branch the instant
  // Grade changes (which made it impossible to keep a Branch selected
  // while also picking a Grade), we PRUNE only the selections that no
  // longer exist in the freshly-fetched data. Anything still valid stays
  // selected. This runs after every successful fetch (state/zone/agm/
  // branch are all independent dimensions of the same dataset, so each
  // is pruned against the raw values actually present in `data`).
  useEffect(() => {
    if (loading) return;

    const availableStates = new Set(data.map((x) => x.state));
    const availableZones = new Set(data.map((x) => x.zone));
    const availableAgms = new Set(data.map((x) => x.agm));
    const availableBranches = new Set(data.map((x) => x.branch));

    setSelectedStates((prev) => prev.filter((v) => availableStates.has(v)));
    setSelectedZones((prev) => prev.filter((v) => availableZones.has(v)));
    setSelectedAgms((prev) => prev.filter((v) => availableAgms.has(v)));
    setSelectedBranches((prev) => prev.filter((v) => availableBranches.has(v)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  // Reset page on any filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedStates,
    selectedZones,
    selectedAgms,
    selectedGrades,
    selectedBranches,
    year,
    month
  ]);

  // Base pool respecting Year/Month, which sit "above" the cascading
  // state -> zone -> agm -> branch hierarchy. (Grade is no longer
  // filtered here since the backend already returned only the selected
  // grade(s).)
  const yearMonthFiltered = useMemo(() => {
    return data.filter(
      (x) =>
        (year === "All" || x.year === year) &&
        (month === "All" || x.month === month)
    );
  }, [data, year, month]);

  const YEARS = useMemo(
    () => [...new Set(data.map((item) => item.year))].sort(),
    [data]
  );
  const MONTHS = useMemo(
    () => [...new Set(data.map((item) => item.month))].sort(),
    [data]
  );

  // Each level's options are derived from everything selected "above" it,
  // so a dropdown only ever shows choices that actually exist given the
  // current selection (cascading filters).
  const stateOptions = useMemo(
    () => [...new Set(yearMonthFiltered.map((x) => x.state))].sort(),
    [yearMonthFiltered]
  );

  const zoneOptions = useMemo(() => {
    return [...new Set(
      yearMonthFiltered
        .filter((x) => selectedStates.length === 0 || selectedStates.includes(x.state))
        .map((x) => x.zone)
    )].sort();
  }, [yearMonthFiltered, selectedStates]);

  const agmOptions = useMemo(() => {
    return [...new Set(
      yearMonthFiltered
        .filter(
          (x) =>
            (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
            (selectedZones.length === 0 || selectedZones.includes(x.zone))
        )
        .map((x) => x.agm)
    )].sort();
  }, [yearMonthFiltered, selectedStates, selectedZones]);

  // Grade options are a fixed list sent to the backend directly,
  // not derived from fetched data.
  const gradeOptions = ["pre_primary", "primary", "high_school", "puc"];

  const branchOptions = useMemo(() => {
    return [...new Set(
      yearMonthFiltered
        .filter(
          (x) =>
            (selectedStates.length === 0 || selectedStates.includes(x.state)) &&
            (selectedZones.length === 0 || selectedZones.includes(x.zone)) &&
            (selectedAgms.length === 0 || selectedAgms.includes(x.agm))
        )
        .map((x) => x.branch)
    )].sort();
  }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms]);

  // Grade is intentionally NOT filtered here — the backend already
  // returned only rows matching the selected grade(s).
  const filtered = useMemo(() => {
    return yearMonthFiltered.filter(
      (item) =>
        (selectedStates.length === 0 || selectedStates.includes(item.state)) &&
        (selectedZones.length === 0 || selectedZones.includes(item.zone)) &&
        (selectedAgms.length === 0 || selectedAgms.includes(item.agm)) &&
        (selectedBranches.length === 0 || selectedBranches.includes(item.branch))
    );
  }, [
    yearMonthFiltered,
    selectedStates,
    selectedZones,
    selectedAgms,
    selectedBranches,
  ]);

  const totalStudents = useMemo(
    () => filtered.reduce((sum, r) => sum + r.studentCount, 0),
    [filtered]
  );

  const totalAddressed = useMemo(
    () => filtered.reduce((sum, r) => sum + r.addressedCount, 0),
    [filtered]
  );

  const totalWithoutAddress = useMemo(
    () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
    [filtered]
  );

  const totalBranches = useMemo(() => {
    return new Set(filtered.map((r) => r.branch)).size;
  }, [filtered]);

  // Overall percentage of addressed students across the current filter
  const overallPercentage = useMemo(() => {
    if (totalStudents === 0) return 0;
    return (totalAddressed / totalStudents) * 100;
  }, [totalAddressed, totalStudents]);

  // FIX: group by branch + grade together, not branch alone. Grouping by
  // branch only was silently merging rows from different grades into a
  // single row (summing their counts) and showing just one grade's label
  // — which is exactly the "wrong data in the table" symptom.
  const tableRows = useMemo(() => {
    const byBranchGrade = {};
    filtered.forEach((r) => {
      const key = `${r.branch}__${r.grade}`;
      if (!byBranchGrade[key]) {
        byBranchGrade[key] = {
          state: r.state,
          zone: r.zone,
          agm: r.agm,
          grade: r.grade,
          branch: r.branch,
          studentCount: 0,
          addressedCount: 0,
          withoutAddressCount: 0,
        };
      }
      byBranchGrade[key].studentCount += r.studentCount;
      byBranchGrade[key].addressedCount += r.addressedCount;
      byBranchGrade[key].withoutAddressCount += r.withoutAddressCount;
    });

    return Object.values(byBranchGrade)
      .map((row) => ({
        ...row,
        percentage:
          row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
      }))
      .sort((a, b) => a.studentCount - b.studentCount);
  }, [filtered]);

  // pagination
  const totalPages = Math.ceil(tableRows.length / rowsPerPage) || 1;

  const paginationRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return tableRows.slice(start, start + rowsPerPage);
  }, [tableRows, currentPage]);

  const toValues = (arr) => arr.map((x) => ({ value: x, label: x }));

  // Forces tags to wrap onto new lines and caps the box height (with a
  // vertical scrollbar) instead of letting the control grow sideways.
  const multiSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: 38,
    }),
    valueContainer: (base) => ({
      ...base,
      flexWrap: "wrap",
      maxHeight: 80,
      overflowY: "auto",
    }),
  };

  // Excel export
  // const exportToExcel = () => {
  //   const excelData = tableRows.map((row) => ({
  //     AGM: row.agm,
  //     State: row.state,
  //     Zone: row.zone,
  //     Branch: row.branch,
  //     Grade: row.grade,
  //     "Student Count": row.studentCount,
  //     "Students With Address": row.addressedCount,
  //     "Students Without Address": row.withoutAddressCount,
  //     Percentage: row.percentage.toFixed(1) + "%"
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(excelData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array"
  //   });

  //   const file = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  //   });

  //   saveAs(file, "Student_Branch_Report.xlsx");
  // };

  // Excel export
  const exportToExcel = () => {
    const excelData = tableRows.map((row) => {
      const updatedPercentage =
        row.studentCount === 0
          ? 0
          : (row.addressedCount / row.studentCount) * 100;

      const notUpdatedPercentage =
        row.studentCount === 0
          ? 0
          : (row.withoutAddressCount / row.studentCount) * 100;

      return {
        AGM: row.agm,
        State: row.state,
        Zone: row.zone,
        Branch: row.branch,
        Grade: row.grade,
        "Student Count": row.studentCount,
        "Students With Address": row.addressedCount,
        "Students Without Address": row.withoutAddressCount,
        "Student Address Updated %": updatedPercentage.toFixed(1) + "%",
        "Student Address Not Updated %": notUpdatedPercentage.toFixed(1) + "%"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Student Report"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(file, "Student_Branch_Report.xlsx");
  };

  const applyFilters = () => {
    setSelectedGrades(pendingGrades);
    setSelectedStates(pendingStates);
    setSelectedZones(pendingZones);
    setSelectedAgms(pendingAgms);
    setSelectedBranches(pendingBranches);

    if (!pendingGrades || pendingGrades.length === 0) {
      setData([]);
      setError(null);
      return;
    }

    fetchReportData(pendingGrades, pendingStates, pendingZones, pendingAgms, pendingBranches);
  };

  // NEW: load data automatically on first mount, using all grades as the
  // default so the dashboard isn't empty until the user manually applies
  // filters. This mirrors exactly what clicking "Apply Filters" would do.
  useEffect(() => {
    const defaultGrades = gradeOptions; // e.g. ["pre_primary","primary","high_school","puc"]

    setPendingGrades(defaultGrades);
    setSelectedGrades(defaultGrades);

    fetchReportData(defaultGrades, [], [], [], []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sbd-page">
      <style>{CSS}</style>
      <div className="sbd-container">
        {/* Header */}
        <div className="sbd-header">
          <h1 className="sbd-title">Student & Branch Overview</h1>

          <div className="sbd-filters">
            {/* Grade — the only filter sent to the backend via the URL.
                Placed first because it drives a full data refetch;
                State/Zone/AGM/Branch below are purely client-side
                narrowing filters over whatever comes back. */}
            <div className="sbd-select-container">
              <Select
                isMulti
                placeholder="Select Grade"
                styles={multiSelectStyles}
                options={toValues(gradeOptions)}
                value={toValues(pendingGrades)}
                onChange={(selected) => {
                  // const values = selected ? selected.map((x) => x.value) : [];
                  // setSelectedGrades(values);
                  setPendingGrades(selected ? selected.map((x) => x.value) : []);
                  // No longer force-clearing State/Zone/AGM/Branch here —
                  // the prune effect above will drop only the selections
                  // that don't exist in the newly fetched data once it
                  // arrives, keeping everything still valid intact.
                }}
              />
            </div>

            {/* State */}
            <div className="sbd-select-container">
              <Select
                isMulti
                placeholder="Select State"
                styles={multiSelectStyles}
                options={toValues(stateOptions)}
                value={toValues(pendingStates)}
                onChange={(selected) => {
                  const values = selected ? selected.map((x) => x.value) : [];
                  setPendingStates(values);
                  setPendingZones([]);
                  setPendingAgms([]);
                  setPendingBranches([]);
                }}
              />
            </div>

            {/* Zone */}
            <div className="sbd-select-container">
              <Select
                isMulti
                placeholder="Select Zone"
                styles={multiSelectStyles}
                options={toValues(zoneOptions)}
                value={toValues(pendingZones)}
                onChange={(selected) => {
                  const values = selected ? selected.map((x) => x.value) : [];
                  setPendingZones(values);
                  setPendingAgms([]);
                  setPendingBranches([]);
                }}
              />
            </div>

            {/* AGM */}
            <div className="sbd-select-container">
              <Select
                isMulti
                placeholder="Select AGM"
                styles={multiSelectStyles}
                options={toValues(agmOptions)}
                value={toValues(pendingAgms)}
                onChange={(selected) => {
                  const values = selected ? selected.map((x) => x.value) : [];
                  setPendingAgms(values);
                  setPendingBranches([]);
                }}
              />
            </div>

            {/* Branch */}
            <div className="sbd-select-container">
              <Select
                isMulti
                placeholder="Select Branch"
                styles={multiSelectStyles}
                options={toValues(branchOptions)}
                value={toValues(pendingBranches)}
                onChange={(selected) => {
                  const values = selected ? selected.map((x) => x.value) : [];
                  setPendingBranches(values);
                  // nothing below Branch in the hierarchy, so no further cascading reset needed
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "15px"
              }}>
              <button
                onClick={exportToExcel}
                style={{
                  background: "#1D6F42",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}> Download Excel</button>
            </div>

            <button
              onClick={applyFilters}
              style={{
                background: "#2f80ed",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                cursor: "pointer",
                marginRight: "10px"
              }}>  ✓ Apply Filters </button>
          </div>
        </div>

        {error && <div className="sbd-error">{error}</div>}

        {/* KPI Cards */}
        <div className="sbd-kpi-row">
          <div className="sbd-card">
            <div className="sbd-icon-circle" style={{ backgroundColor: "#2f80ed" }}>
              <UsersIcon />
            </div>
            <div className="sbd-card-label">Total Students</div>
            <div className="sbd-card-value">
              {loading ? "…" : formatIN(totalStudents)}
            </div>
          </div>

          <div className="sbd-card">
            <div className="sbd-icon-circle" style={{ backgroundColor: "#9b51e0" }}>
              <BuildingIcon />
            </div>
            <div className="sbd-card-label">Total Branches</div>
            <div className="sbd-card-value">{loading ? "…" : totalBranches}</div>
          </div>

          <div className="sbd-card">
            <div className="sbd-icon-circle" style={{ backgroundColor: "#27ae60" }}>
              <AddressCheckIcon />
            </div>
            <div className="sbd-card-label">Students With Address</div>
            <div className="sbd-card-value">
              {loading ? "…" : formatIN(totalAddressed)}
            </div>
          </div>

          <div className="sbd-card">
            <div className="sbd-icon-circle" style={{ backgroundColor: "#eb5757" }}>
              <AddressXIcon />
            </div>
            <div className="sbd-card-label">Student Address Not Updated</div>
            <div className="sbd-card-value">
              {loading ? "…" : formatIN(totalWithoutAddress)}
            </div>
          </div>

          <div className="sbd-card">
            <div className="sbd-icon-circle" style={{ backgroundColor: "#f2994a" }}>
              <PercentIcon />
            </div>
            <div className="sbd-card-label">Overall Addressed %</div>
            <div className="sbd-card-value">
              {loading ? "…" : `${overallPercentage.toFixed(1)}%`}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="sbd-table-card">
          {loading ? (
            <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
              <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
            </div>
          ) :
            selectedGrades.length === 0 ? (
              <div className="sbd-empty" style={{ padding: "20px", textAlign: "center" }}>
                Please select at least one Grade to load data.
              </div>
            ) :
              (
                <table className="sbd-table">
                  <thead>
                    <tr>
                      <th>AGM</th>
                      <th>State</th>
                      <th>Zone</th>
                      <th>Branch</th>
                      <th>Grade</th>
                      <th>Student Count</th>
                      <th>Total Addressed Student Count</th>
                      <th>Student Address Not Updated(%)</th>
                      <th>Student Address Updated Percentage(%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="sbd-empty">
                          No data for the selected filters.
                        </td>
                      </tr>
                    ) : (
                      paginationRows.map((row) => (
                        <tr key={`${row.branch}__${row.grade}`}>
                          <td>{row.agm}</td>
                          <td>{row.state}</td>
                          <td>{row.zone}</td>
                          <td>{row.branch}</td>
                          <td>{row.grade}</td>
                          <td>{formatIN(row.studentCount)}</td>
                          <td>{formatIN(row.addressedCount)}</td>
                          <td>{formatIN(row.withoutAddressCount)}</td>
                          <td>{row.percentage.toFixed(1)}%</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px"
        }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>page {currentPage} of {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}