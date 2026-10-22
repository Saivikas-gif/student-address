// // import { useState, useMemo, useEffect, useRef } from "react";
// // import DashboardCards from "./DashboardCards";
// // import DashboardFilters from "./DashboardFilters"

// // import SpinnerDotted from "./loading";
// // import Select from "react-select";
// // import * as XLSX from "xlsx";
// // import { saveAs } from 'file-saver';
// // import "./App.css";

// // function formatIN(num) {
// //   return Number(num || 0).toLocaleString("en-IN");
// // }


// // // Base endpoint. grade/state/zone/agm/branch are all sent to the backend
// // // as query params, built from whatever the user picked and clicked Apply on.
// // const REPORT_ENDPOINT = "http://192.168.0.1/sctsadmissions/student_addres_report_apis.php";

// // function buildReportUrl(grades, states, zones, agms, branches) {

// //   const params = new URLSearchParams();
// //   params.set("endpoint", "report");
// //   const url = `${REPORT_ENDPOINT}?${params.toString()}`;

// //   console.log(url);

// //   return url;

// //   const appendMulti = (key, values) => {
// //     if (values && values.length > 0) {
// //       values.forEach((v) => params.append(`${key}[]`, v));
// //     }
// //   };

// //   appendMulti("grade", grades);
// //   appendMulti("state", states);
// //   appendMulti("zone", zones);
// //   appendMulti("agm", agms);
// //   appendMulti("branch", branches);

// //   console.log("Backend state", states);
// //   console.log("Backend zone", zones);
// //   return `${REPORT_ENDPOINT}?${params.toString()}`;
// // }

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
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // `data` drives the TABLE and KPIs — refreshed on every Apply.
// //   // The backend already filters by grade/state/zone/agm/branch for us,
// //   // so `data` is treated as the "current, correctly filtered" dataset —
// //   // we do NOT re-filter it again on the client (see note on `filtered` below).
// //   const [data, setData] = useState([]);

// //   // `filterOptionsData` is a FROZEN snapshot, populated only from the very
// //   // first (initial) fetch. Dropdown option lists (State/Zone/AGM/Branch)
// //   // are built from this and NEVER change again after that first load,
// //   // regardless of what smaller/filtered dataset comes back from later
// //   // Apply Filters calls.
// //   const [filterOptionsData, setFilterOptionsData] = useState([]);

// //   // pending state — what the user is currently picking in the dropdowns,
// //   // not yet "applied". This is what the Select components bind to.
// //   const [pendingStates, setPendingStates] = useState([]);
// //   const [pendingZones, setPendingZones] = useState([]);
// //   const [pendingAgms, setPendingAgms] = useState([]);
// //   const [pendingGrades, setPendingGrades] = useState([]);
// //   const [pendingBranches, setPendingBranches] = useState([]);

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 5;

// //   const requestIdRef = useRef(0);

// //   // Fetches report data from the backend for the given filter selections.
// //   // grade/state/zone/agm/branch all go into the URL together.
// //   //
// //   // `freezeFilterOptions` should be true ONLY for the very first load —
// //   // that's the one call whose result becomes the permanent source for
// //   // dropdown options. Every later call (from Apply Filters) leaves
// //   // filterOptionsData untouched.
// //   const fetchReportData = (grades, states, zones, agms, branches, freezeFilterOptions = false) => {
// //     console.log("fetchReportData called");
// //     console.log({grades,states,zones,agms,branches});
// //     const thisRequestId = ++requestIdRef.current;
// //     setLoading(true);
// //     setError(null);
// // const url = buildReportUrl(
// //     grades,
// //     states,
// //     zones,
// //     agms,
// //     branches
// // );

// // console.log("URL =", url);

// // fetch(url)
// //     fetch(buildReportUrl(grades, states, zones, agms, branches))

// //       .then((response) => {
// //         if (!response.ok) throw new Error(`HTTP ${response.status}`);
// //         return response.json();
// //       })
// //       .then((result) => {
// //         // If a newer request has started since this one fired, drop this
// //         // response on the floor — it's stale and would clobber fresher data.
// //         if (thisRequestId !== requestIdRef.current) return;

// //         console.log("RAW BACKEND RESPONSE:", result);
// //         const rows = Array.isArray(result) ? result : result?.data ?? result?.records ?? [];

// //         console.log("Rows returned");

// //         console.table(rows);

// //         // Debug: confirm the backend actually honored the state/zone combo
// //         // we asked for. If this list doesn't contain your selected zone,
// //         // the bug is server-side (WHERE clause not ANDing state + zone).
// //         console.log("Requested state/zone:", states, zones);
// //         console.log("Returned rows state/zone:", rows.map((r) => [r.state, r.zone]));

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

// //         if (freezeFilterOptions) {
// //           setFilterOptionsData(mappedData);
// //         }

// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         if (thisRequestId !== requestIdRef.current) return;
// //         setError(`Could not load report data: ${err.message}`);
// //         setLoading(false);
// //       });
// //   };

// //   console.log("Pending States:", pendingStates);
// //   console.log("Pending Zones:", pendingZones);
// //   console.log("Pending AGM:", pendingAgms);
// //   console.log("Pending Branch:", pendingBranches);
// //   console.log("Pending Grade:", pendingGrades);
// //   // Load ALL data automatically on first mount — no filters applied.
// //   // This is the ONLY call that freezes filterOptionsData.
// //   useEffect(() => {
// //     fetchReportData([], [], [], [], [], true);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   // Prune selections against the FROZEN filter dataset (not the live
// //   // table data), since filterOptionsData is now the single source of
// //   // truth for what's a valid State/Zone/AGM/Branch choice.
// //   useEffect(() => {
// //     if (loading) return;

// //     const availableStates = new Set(filterOptionsData.map((x) => x.state));
// //     const availableZones = new Set(filterOptionsData.map((x) => x.zone));
// //     const availableAgms = new Set(filterOptionsData.map((x) => x.agm));
// //     const availableBranches = new Set(filterOptionsData.map((x) => x.branch));

// //     setSelectedStates((prev) => prev.filter((v) => availableStates.has(v)));
// //     setSelectedZones((prev) => prev.filter((v) => availableZones.has(v)));
// //     setSelectedAgms((prev) => prev.filter((v) => availableAgms.has(v)));
// //     setSelectedBranches((prev) => prev.filter((v) => availableBranches.has(v)));
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [filterOptionsData, loading]);

// //   // Reset page on any filter change
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

// //   // ---- TABLE / KPI data pipeline — always reflects the LATEST fetch ----
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

// //   // ---- FILTER OPTIONS pipeline — always reflects the FROZEN initial fetch ----
// //   const frozenYearMonthFiltered = useMemo(() => {
// //     return filterOptionsData.filter(
// //       (x) =>
// //         (year === "All" || x.year === year) &&
// //         (month === "All" || x.month === month)
// //     );
// //   }, [filterOptionsData, year, month]);

// //   const stateOptions = useMemo(
// //     () => [...new Set(frozenYearMonthFiltered.map((x) => x.state))].sort(),
// //     [frozenYearMonthFiltered]
// //   );

// //   const zoneOptions = useMemo(() => {
// //     return [...new Set(
// //       frozenYearMonthFiltered
// //         .filter((x) => pendingStates.length === 0 || pendingStates.includes(x.state))
// //         .map((x) => x.zone)
// //     )].sort();
// //   }, [frozenYearMonthFiltered, pendingStates]);

// //   const agmOptions = useMemo(() => {
// //     return [...new Set(
// //       frozenYearMonthFiltered
// //         .filter((x) =>
// //           (pendingStates.length === 0 || pendingStates.includes(x.state)) &&
// //           (pendingZones.length === 0 || pendingZones.includes(x.zone))
// //         )
// //         .map((x) => x.agm)
// //     )].sort();
// //   }, [frozenYearMonthFiltered, pendingStates, pendingZones]);

// //   // Grade options are a fixed list sent to the backend directly,
// //   // not derived from fetched data.
// //   const gradeOptions = ["pre_primary", "primary", "high_school", "puc"];

// //   const branchOptions = useMemo(() => {
// //     return [...new Set(
// //       frozenYearMonthFiltered
// //         .filter((x) =>
// //           (pendingStates.length === 0 || pendingStates.includes(x.state)) &&
// //           (pendingZones.length === 0 || pendingZones.includes(x.zone)) &&
// //           (pendingAgms.length === 0 || pendingAgms.includes(x.agm))
// //         )
// //         .map((x) => x.branch)
// //     )].sort();
// //   }, [frozenYearMonthFiltered, pendingStates, pendingZones, pendingAgms]);

// //   // ---- Table rows come straight from the backend-filtered `data` ----
// //   // IMPORTANT FIX: previously this block re-filtered `yearMonthFiltered`
// //   // again on the client by state/zone/agm/branch. That was redundant
// //   // with the backend's own filtering (we already send state[]/zone[]/etc
// //   // in the request URL) AND fragile — any mismatch in casing/whitespace,
// //   // or the backend not perfectly combining state+zone in its WHERE clause,
// //   // caused this second filter to silently zero out the table/KPIs even
// //   // though valid rows had come back from the server.
// //   //
// //   // Since the backend is the source of truth for "what matches the
// //   // selected filters", we just use its response directly here.
// //   const filtered = yearMonthFiltered;

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

// //   const overallPercentage = useMemo(() => {
// //     if (totalStudents === 0) return 0;
// //     return (totalAddressed / totalStudents) * 100;
// //   }, [totalAddressed, totalStudents]);

// //   // Group by branch + grade together, not branch alone, so rows from
// //   // different grades don't silently merge into one summed row.
// //   const tableRows = useMemo(() => {
// //     const byBranchGrade = {};
// //     filtered.forEach((r) => {
// //       const key = `${r.branch}__${r.grade}`;
// //       if (!byBranchGrade[key]) {
// //         byBranchGrade[key] = {
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
// //       byBranchGrade[key].studentCount += r.studentCount;
// //       byBranchGrade[key].addressedCount += r.addressedCount;
// //       byBranchGrade[key].withoutAddressCount += r.withoutAddressCount;
// //     });

// //     return Object.values(byBranchGrade)
// //       .map((row) => ({
// //         ...row,
// //         percentage:
// //           row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,
// //       }))
// //       .sort((a, b) => a.studentCount - b.studentCount);
// //   }, [filtered]);

// //   // pagination
// //   const totalPages = Math.ceil(tableRows.length / rowsPerPage) || 1;

// //   const paginationRows = useMemo(() => {
// //     const start = (currentPage - 1) * rowsPerPage;
// //     return tableRows.slice(start, start + rowsPerPage);
// //   }, [tableRows, currentPage]);

// //   const toValues = (arr) => arr.map((x) => ({ value: x, label: x }));

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
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");

// //     const excelBuffer = XLSX.write(workbook, {
// //       bookType: "xlsx",
// //       type: "array"
// //     });

// //     const file = new Blob([excelBuffer], {
// //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
// //     });

// //     saveAs(file, "Student_Branch_Report.xlsx");
// //   };

// //   // Apply Filters is the single trigger point for subsequent backend
// //   // calls. It never passes freezeFilterOptions=true, so filterOptionsData
// //   // (and therefore the dropdown option lists) stays locked to whatever the
// //   // very first mount-time fetch returned.
// //   // const applyFilters = () => {
// //   //   setSelectedGrades(pendingGrades);
// //   //   setSelectedStates(pendingStates);
// //   //   setSelectedZones(pendingZones);
// //   //   setSelectedAgms(pendingAgms);
// //   //   setSelectedBranches(pendingBranches);

// //   //   fetchReportData(pendingGrades, pendingStates, pendingZones, pendingAgms, pendingBranches);
// //   // };

// //   const applyFilters = async () => {
// //     console.log("Apply Filters Clicked");

// //     console.log({
// //       grades: pendingGrades,
// //       states: pendingStates,
// //       zones: pendingZones,
// //       agms: pendingAgms,
// //       branches: pendingBranches,
// //     });

// //     // Save applied filters
// //     setSelectedGrades([...pendingGrades]);
// //     setSelectedStates([...pendingStates]);
// //     setSelectedZones([...pendingZones]);
// //     setSelectedAgms([...pendingAgms]);
// //     setSelectedBranches([...pendingBranches]);

// //     // Fetch using pending values
// //     await fetchReportData(
// //       pendingGrades,
// //       pendingStates,
// //       pendingZones,
// //       pendingAgms,
// //       pendingBranches
// //     );
// //   };

// //   return (
// //     <div className="sbd-page">
// //       {/* <style>{CSS}</style> */}
// //       <div className="sbd-container">
// //         {/* Header */}
// //         {/* <div className="sbd-header">
// //           <h1 className="sbd-title">Student & Branch Overview</h1> */}


// //         <DashboardFilters
// //           stateOptions={stateOptions}
// //           zoneOptions={zoneOptions}
// //           agmOptions={agmOptions}
// //           branchOptions={branchOptions}
// //           gradeOptions={gradeOptions}

// //           pendingStates={pendingStates}
// //           pendingZones={pendingZones}
// //           pendingAgms={pendingAgms}
// //           pendingBranches={pendingBranches}
// //           pendingGrades={pendingGrades}

// //           setPendingStates={setPendingStates}
// //           setPendingZones={setPendingZones}
// //           setPendingAgms={setPendingAgms}
// //           setPendingBranches={setPendingBranches}
// //           setPendingGrades={setPendingGrades}

// //           applyFilters={applyFilters}
// //           exportToExcel={exportToExcel}
// //         // toValues = {toValues}
// //         />

// //         {/* <div className="sbd-filters">



// //               {/* AGM */}
// //         {/* <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select AGM"
// //                 styles={multiSelectStyles}
// //                 options={toValues(agmOptions)}
// //                 value={toValues(pendingAgms)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setPendingAgms(values);
// //                   setPendingBranches([]);
// //                 }}
// //               />
// //             </div>

// //             {/* State */}
// //         {/* <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select State"
// //                 styles={multiSelectStyles}
// //                 options={toValues(stateOptions)}
// //                 value={toValues(pendingStates)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setPendingStates(values);
// //                   setPendingZones([]);
// //                   setPendingAgms([]);
// //                   setPendingBranches([]);
// //                 }}
// //               />
// //             </div> */}

// //         {/* Zone */}
// //         {/* <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Zone"
// //                 styles={multiSelectStyles}
// //                 options={toValues(zoneOptions)}
// //                 value={toValues(pendingZones)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setPendingZones(values);
// //                   setPendingAgms([]);
// //                   setPendingBranches([]);
// //                 }}
// //               />
// //             </div> */}

// //         {/* Branch */}
// //         {/* <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Branch"
// //                 styles={multiSelectStyles}
// //                 options={toValues(branchOptions)}
// //                 value={toValues(pendingBranches)}
// //                 onChange={(selected) => {
// //                   const values = selected ? selected.map((x) => x.value) : [];
// //                   setPendingBranches(values);
// //                 }}
// //               />
// //             </div> */}

// //         {/* Grade */}
// //         {/* <div className="sbd-select-container">
// //               <Select
// //                 isMulti
// //                 placeholder="Select Grade"
// //                 styles={multiSelectStyles}
// //                 options={toValues(gradeOptions)}
// //                 value={toValues(pendingGrades)}
// //                 onChange={(selected) => {
// //                   setPendingGrades(selected ? selected.map((x) => x.value) : []);
// //                 }}
// //               />
// //             </div> */}

// //         {/* <div
// //               style={{
// //                 display: "flex",
// //                 justifyContent: "flex-end",
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
// //                 }}> CSV report</button>
// //             </div> */}

// //         {/* <button
// //               onClick={applyFilters}
// //               style={{
// //                 background: "#2f80ed",
// //                 color: "#fff",
// //                 border: "none",
// //                 padding: "10px 18px",
// //                 cursor: "pointer",
// //                 marginRight: "10px"
// //               }}>  ✓ Apply Filters </button> */}
// //         {/* </div>
// //         </div> */}

// //         {error && <div className="sbd-error">{error}</div>}

// //         <DashboardCards
// //           totalStudents={totalStudents}
// //           totalBranches={totalBranches}
// //           totalAddressed={totalAddressed}
// //           totalWithoutAddress={totalWithoutAddress}
// //           overallPercentage={overallPercentage}
// //           loading={loading}
// //         />

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
// //                   {/* <th>Grade</th> */}
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
// //                     <tr key={`${row.branch}__${row.grade}`}>
// //                       <td>{row.agm}</td>
// //                       <td>{row.state}</td>
// //                       <td>{row.zone}</td>
// //                       <td>{row.branch}</td>
// //                       {/* <td>{row.grade}</td> */}
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

// //         {/* <studentTable
// //           rows={paginationRows}
// //           loading={loading}
// //         /> */}

// //         <div
// //           style={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "center",
// //             padding: "15px"
// //           }}>
// //           <button
// //             disabled={currentPage === 1}
// //             onClick={() => setCurrentPage(currentPage - 1)}>
// //             Previous
// //           </button>
// //           <span>page {currentPage} of {totalPages}</span>

// //           <button
// //             disabled={currentPage === totalPages}
// //             onClick={() => setCurrentPage(currentPage + 1)}>
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }







// import { useState, useMemo, useEffect, useRef } from "react";
// import DashboardCards from "./DashboardCards";
// import DashboardFilters from "./DashboardFilters";

// import SpinnerDotted from "./loading";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import "./App.css";

// function formatIN(num) {
//   return Number(num || 0).toLocaleString("en-IN");
// }

// // Base endpoint. grade/state/zone/agm/branch are all sent to the backend
// // as query params, built from whatever the user picked and clicked Apply on.
// const REPORT_ENDPOINT = "http://192.168.0.1/sctsadmissions/student_addres_report_apis.php";

// function buildReportUrl(grades, states, zones, agms, branches) {
//   const params = new URLSearchParams();
//   params.set("endpoint", "report");

//   const appendMulti = (key, values) => {
//     if (values && values.length > 0) {
//       values.forEach((v) => params.append(`${key}[]`, v));
//     }
//   };

//   appendMulti("grade", grades);
//   appendMulti("state", states);
//   appendMulti("zone", zones);
//   appendMulti("agm", agms);
//   appendMulti("branch", branches);

//   const url = `${REPORT_ENDPOINT}?${params.toString()}`;

//   console.log("Backend state", states);
//   console.log("Backend zone", zones);
//   console.log("Request URL:", url);

//   return url;
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
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // `data` drives the TABLE and KPIs — refreshed on every Apply.
//   // The backend already filters by grade/state/zone/agm/branch for us,
//   // so `data` is treated as the "current, correctly filtered" dataset —
//   // we do NOT re-filter it again on the client (see note on `filtered` below).
//   const [data, setData] = useState([]);

//   // `filterOptionsData` is a FROZEN snapshot, populated only from the very
//   // first (initial) fetch. Dropdown option lists (State/Zone/AGM/Branch)
//   // are built from this and NEVER change again after that first load,
//   // regardless of what smaller/filtered dataset comes back from later
//   // Apply Filters calls.
//   const [filterOptionsData, setFilterOptionsData] = useState([]);

//   // pending state — what the user is currently picking in the dropdowns,
//   // not yet "applied". This is what the Select components bind to.
//   const [pendingStates, setPendingStates] = useState([]);
//   const [pendingZones, setPendingZones] = useState([]);
//   const [pendingAgms, setPendingAgms] = useState([]);
//   const [pendingGrades, setPendingGrades] = useState([]);
//   const [pendingBranches, setPendingBranches] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   const requestIdRef = useRef(0);

//   // Fetches report data from the backend for the given filter selections.
//   // grade/state/zone/agm/branch all go into the URL together.
//   //
//   // `freezeFilterOptions` should be true ONLY for the very first load —
//   // that's the one call whose result becomes the permanent source for
//   // dropdown options. Every later call (from Apply Filters) leaves
//   // filterOptionsData untouched.
//   const fetchReportData = (grades, states, zones, agms, branches, freezeFilterOptions = false) => {
//     console.log("fetchReportData called");
//     console.log({ grades, states, zones, agms, branches });

//     const thisRequestId = ++requestIdRef.current;
//     setLoading(true);
//     setError(null);

//     const url = buildReportUrl(grades, states, zones, agms, branches);

//     fetch(url)
//       .then((response) => {
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
//         return response.json();
//       })
//       .then((result) => {
//         // If a newer request has started since this one fired, drop this
//         // response on the floor — it's stale and would clobber fresher data.
//         if (thisRequestId !== requestIdRef.current) return;

//         console.log("RAW BACKEND RESPONSE:", result);
//         const rows = Array.isArray(result) ? result : result?.data ?? result?.records ?? [];

//         console.log("Rows returned");
//         console.table(rows);

//         // Debug: confirm the backend actually honored the state/zone combo
//         // we asked for. If this list doesn't contain your selected zone,
//         // the bug is server-side (WHERE clause not ANDing state + zone).
//         console.log("Requested state/zone:", states, zones);
//         console.log("Returned rows state/zone:", rows.map((r) => [r.state, r.zone]));

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

//         if (freezeFilterOptions) {
//           setFilterOptionsData(mappedData);
//         }

//         setLoading(false);
//       })
//       .catch((err) => {
//         if (thisRequestId !== requestIdRef.current) return;
//         setError(`Could not load report data: ${err.message}`);
//         setLoading(false);
//       });
//   };

//   // Load ALL data automatically on first mount — no filters applied.
//   // This is the ONLY call that freezes filterOptionsData.
//   useEffect(() => {
//     fetchReportData([], [], [], [], [], true);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Prune selections against the FROZEN filter dataset (not the live
//   // table data), since filterOptionsData is now the single source of
//   // truth for what's a valid State/Zone/AGM/Branch choice.
//   useEffect(() => {
//     if (loading) return;

//     const availableStates = new Set(filterOptionsData.map((x) => x.state));
//     const availableZones = new Set(filterOptionsData.map((x) => x.zone));
//     const availableAgms = new Set(filterOptionsData.map((x) => x.agm));
//     const availableBranches = new Set(filterOptionsData.map((x) => x.branch));

//     setSelectedStates((prev) => prev.filter((v) => availableStates.has(v)));
//     setSelectedZones((prev) => prev.filter((v) => availableZones.has(v)));
//     setSelectedAgms((prev) => prev.filter((v) => availableAgms.has(v)));
//     setSelectedBranches((prev) => prev.filter((v) => availableBranches.has(v)));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [filterOptionsData, loading]);

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
//     month,
//   ]);



//   // ---- TABLE / KPI data pipeline — always reflects the LATEST fetch ----
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

//   // ---- FILTER OPTIONS pipeline — always reflects the FROZEN initial fetch ----
//   const frozenYearMonthFiltered = useMemo(() => {
//     return filterOptionsData.filter(
//       (x) =>
//         (year === "All" || x.year === year) &&
//         (month === "All" || x.month === month)
//     );
//   }, [filterOptionsData, year, month]);

//   const stateOptions = useMemo(
//     () => [...new Set(frozenYearMonthFiltered.map((x) => x.state))].sort(),
//     [frozenYearMonthFiltered]
//   );

//   const zoneOptions = useMemo(() => {
//     return [
//       ...new Set(
//         frozenYearMonthFiltered
//           .filter((x) => pendingStates.length === 0 || pendingStates.includes(x.state))
//           .map((x) => x.zone)
//       ),
//     ].sort();
//   }, [frozenYearMonthFiltered, pendingStates]);

//   const agmOptions = useMemo(() => {
//     return [
//       ...new Set(
//         frozenYearMonthFiltered
//           .filter(
//             (x) =>
//               (pendingStates.length === 0 || pendingStates.includes(x.state)) &&
//               (pendingZones.length === 0 || pendingZones.includes(x.zone))
//           )
//           .map((x) => x.agm)
//       ),
//     ].sort();
//   }, [frozenYearMonthFiltered, pendingStates, pendingZones]);

//   // Grade options are a fixed list sent to the backend directly,
//   // not derived from fetched data.
//   const gradeOptions = ["pre_primary", "primary", "high_school", "puc"];

//   const branchOptions = useMemo(() => {
//     return [
//       ...new Set(
//         frozenYearMonthFiltered
//           .filter(
//             (x) =>
//               (pendingStates.length === 0 || pendingStates.includes(x.state)) &&
//               (pendingZones.length === 0 || pendingZones.includes(x.zone)) &&
//               (pendingAgms.length === 0 || pendingAgms.includes(x.agm))
//           )
//           .map((x) => x.branch)
//       ),
//     ].sort();
//   }, [frozenYearMonthFiltered, pendingStates, pendingZones, pendingAgms]);

//   // ---- Table rows come straight from the backend-filtered `data` ----
//   // The backend is the source of truth for "what matches the selected
//   // filters" (state[]/zone[]/agm[]/branch[]/grade[] are sent in the
//   // request URL), so we don't re-filter `yearMonthFiltered` again here.
//   // const filtered = yearMonthFiltered;

//   // ---- Table rows come straight from the backend-filtered `data` ----
//   // The backend is the source of truth for "what matches the selected
//   // filters" (state[]/zone[]/agm[]/branch[]/grade[] are sent in the
//   // request URL), so we don't re-filter `yearMonthFiltered` again here.
//   const filtered = yearMonthFiltered;
//   // Client-side safety net: the backend is unreliable at ANDing multiple
//   // params together (state[]+zone[], state[]+grade[], agm[]+branch[], etc.
//   // all can return extra rows). state/zone/agm/branch options are derived
//   // from real data (filterOptionsData), so re-checking them here is always
//   // an exact match and safely narrows whatever the backend over-returns.
//   // grade is intentionally excluded — gradeOptions is a hardcoded list, not
//   // derived from real data, so re-checking it risks zeroing out rows the
//   // backend already filtered correctly.
//   const filtered = useMemo(() => {
//     return yearMonthFiltered.filter((r) => {
//       const stateOk = selectedStates.length === 0 || selectedStates.includes(r.state);
//       const zoneOk = selectedZones.length === 0 || selectedZones.includes(r.zone);
//       const agmOk = selectedAgms.length === 0 || selectedAgms.includes(r.agm);
//       const branchOk = selectedBranches.length === 0 || selectedBranches.includes(r.branch);
//       return stateOk && zoneOk && agmOk && branchOk;
//     });
//   }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms, selectedBranches]);
//   // const filtered = useMemo(() => {
//   //   return yearMonthFiltered.filter((r) => {
//   //     const stateOk = selectedStates.length === 0 || selectedStates.includes(r.state);
//   //     const zoneOk = selectedZones.length === 0 || selectedZones.includes(r.zone);
//   //     const agmOk = selectedAgms.length === 0 || selectedAgms.includes(r.agm);
//   //     const branchOk = selectedBranches.length === 0 || selectedBranches.includes(r.branch);
//   //     const gradeOk = selectedGrades.length === 0 || selectedGrades.includes(r.grade);
//   //     return stateOk && zoneOk && agmOk && branchOk && gradeOk;
//   //   });
//   // }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms, selectedBranches, selectedGrades]);

//   // Keep pending selections in sync with the now-mutually-filtered option lists.
//   // Whenever a choice becomes invalid because of what's selected elsewhere,
//   // drop it — this replaces the old one-directional manual resets.
//   useEffect(() => {
//     setPendingStates((prev) => prev.filter((v) => stateOptions.includes(v)));
//     setPendingZones((prev) => prev.filter((v) => zoneOptions.includes(v)));
//     setPendingAgms((prev) => prev.filter((v) => agmOptions.includes(v)));
//     setPendingBranches((prev) => prev.filter((v) => branchOptions.includes(v)));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [stateOptions, zoneOptions, agmOptions, branchOptions]);

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

//   const overallPercentage = useMemo(() => {
//     if (totalStudents === 0) return 0;
//     return (totalAddressed / totalStudents) * 100;
//   }, [totalAddressed, totalStudents]);

//   // Group by branch + grade together, not branch alone, so rows from
//   // different grades don't silently merge into one summed row.
//   const tableRows = useMemo(() => {
//     const byBranchGrade = {};
//     filtered.forEach((r) => {
//       const key = `${r.branch}__${r.grade}`;
//       if (!byBranchGrade[key]) {
//         byBranchGrade[key] = {
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
//       byBranchGrade[key].studentCount += r.studentCount;
//       byBranchGrade[key].addressedCount += r.addressedCount;
//       byBranchGrade[key].withoutAddressCount += r.withoutAddressCount;
//     });

//     return Object.values(byBranchGrade)
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
//       Percentage: row.percentage.toFixed(1) + "%",
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(excelData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const file = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//     });

//     saveAs(file, "Student_Branch_Report.xlsx");
//   };

//   // Apply Filters is the single trigger point for subsequent backend
//   // calls. It never passes freezeFilterOptions=true, so filterOptionsData
//   // (and therefore the dropdown option lists) stays locked to whatever the
//   // very first mount-time fetch returned.
//   // const applyFilters = async () => {
//   //   console.log("Apply Filters Clicked", {
//   //     grades: pendingGrades,
//   //     states: pendingStates,
//   //     zones: pendingZones,
//   //     agms: pendingAgms,
//   //     branches: pendingBranches,
//   //   });

//   //   // Save applied filters
//   //   setSelectedGrades([...pendingGrades]);
//   //   setSelectedStates([...pendingStates]);
//   //   setSelectedZones([...pendingZones]);
//   //   setSelectedAgms([...pendingAgms]);
//   //   setSelectedBranches([...pendingBranches]);

//   //   // Fetch using pending values
//   //   fetchReportData(
//   //     pendingGrades,
//   //     pendingStates,
//   //     pendingZones,
//   //     pendingAgms,
//   //     pendingBranches
//   //   );
//   // };

//   const applyFilters = async () => {
//     // Test case 1 : Single alone
//     // save applied filters
//     setSelectedGrades([...pendingGrades]);
//     setSelectedStates([...pendingStates]);
//     setSelectedZones([...pendingZones]);
//     setSelectedAgms([...pendingAgms]);
//     setSelectedBranches([...pendingBranches]);

//     const hasGrade = pendingGrades.length > 0;
//     const hasAnyOtherFilter =
//       pendingStates.length > 0 ||
//       pendingZones.length > 0 ||
//       pendingAgms.length > 0 ||
//       pendingBranches.length > 0;

//     // Test Case 2 : grade selected (alone or combined with state/zone/agm/branch)
//     // -> must hit the backend, since grade filtering is server-side
//     if (hasGrade) {
//       fetchReportData(
//         pendingGrades,
//         pendingStates,
//         pendingZones,
//         pendingAgms,
//         pendingBranches
//       );
//       return;
//     }

//     // TEST CASE 1: only state/zone/agm/branch selected (no grade)
//     // -> filter the FROZEN full dataset (filterOptionsData) on the client.
//     //No backend call at all.
//     if (hasAnyOtherFilter) {
//       setError(null);
//       const clientFiltered = filterOptionsData.filter((r) => {
//         const stateOk = pendingStates.length === 0 || pendingStates.includes(r.state);
//         const zoneOk = pendingZones.length === 0 || pendingZones.includes(r.zone);
//         const agmOk = pendingAgms.length === 0 || pendingAgms.includes(r.agm);
//         const branchOk = pendingBranches.length === 0 || pendingBranches.includes(r.branch);
//         return stateOk && zoneOk && agmOk && branchOk;
//       });
//       setData(clientFiltered);
//       return;
//     }

//     // Nothing selected at all -. restore full data (this is your "click wrong,
//     //  get all data again" / reset case) - again, no backend hit needed.
//     setError(null);
//     setData(filterOptionsData);
//   }

//   return (
//     <div className="sbd-page">
//       <div className="sbd-container">
//         <DashboardFilters
//           stateOptions={stateOptions}
//           zoneOptions={zoneOptions}
//           agmOptions={agmOptions}
//           branchOptions={branchOptions}
//           gradeOptions={gradeOptions}
//           pendingStates={pendingStates}
//           pendingZones={pendingZones}
//           pendingAgms={pendingAgms}
//           pendingBranches={pendingBranches}
//           pendingGrades={pendingGrades}
//           setPendingStates={setPendingStates}
//           setPendingZones={setPendingZones}
//           setPendingAgms={setPendingAgms}
//           setPendingBranches={setPendingBranches}
//           setPendingGrades={setPendingGrades}
//           applyFilters={applyFilters}
//           exportToExcel={exportToExcel}
//         />

//         {error && <div className="sbd-error">{error}</div>}

//         <DashboardCards
//           totalStudents={totalStudents}
//           totalBranches={totalBranches}
//           totalAddressed={totalAddressed}
//           totalWithoutAddress={totalWithoutAddress}
//           overallPercentage={overallPercentage}
//           loading={loading}
//         />

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
//                     <tr key={`${row.branch}__${row.grade}`}>
//                       <td>{row.agm}</td>
//                       <td>{row.state}</td>
//                       <td>{row.zone}</td>
//                       <td>{row.branch}</td>
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

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "15px",
//           }}
//         >
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Previous
//           </button>
//           <span>
//             page {currentPage} of {totalPages}
//           </span>

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState, useMemo, useEffect, useRef } from "react";
import DashboardCards from "./DashboardCards";
import DashboardFilters from "./DashboardFilters";

import SpinnerDotted from "./loading";
import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import "./App.css";

function formatIN(num) {
  return Number(num || 0).toLocaleString("en-IN");
}

// Base endpoint. grade/state/zone/agm/branch are all sent to the backend
// as query params, built from whatever the user picked and clicked Apply on.
const REPORT_ENDPOINT = "http://192.168.0.1/sctsadmissions/student_addres_report_apis.php";

function buildReportUrl(grades, states, zones, agms, branches) {
  const params = new URLSearchParams();
  params.set("endpoint", "report");

  const appendMulti = (key, values) => {
    if (values && values.length > 0) {
      values.forEach((v) => params.append(`${key}[]`, v));
    }
  };

  appendMulti("grade", grades);
  // appendMulti("state", states);
  // appendMulti("zone", zones);
  // appendMulti("agm", agms);
  // appendMulti("branch", branches);
  console.log("State", states);
  console.log("Zone", zones);

  return `${REPORT_ENDPOINT}?${params.toString()}`;
}

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

  // `data` drives the TABLE and KPIs — refreshed on every Apply.
  const [data, setData] = useState([]);

  // `filterOptionsData` is a FROZEN snapshot, populated only from the very
  // first (initial) fetch. Dropdown option lists (State/Zone/AGM/Branch)
  // are built from this and NEVER change again after that first load.
  const [filterOptionsData, setFilterOptionsData] = useState([]);

  // pending state — what the user is currently picking in the dropdowns,
  // not yet "applied". This is what the Select components bind to.
  const [pendingStates, setPendingStates] = useState([]);
  const [pendingZones, setPendingZones] = useState([]);
  const [pendingAgms, setPendingAgms] = useState([]);
  const [pendingGrades, setPendingGrades] = useState([]);
  const [pendingBranches, setPendingBranches] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const requestIdRef = useRef(0);

  // Fetches report data from the backend for the given filter selections.
  // `freezeFilterOptions` should be true ONLY for the very first load —
  // that's the one call whose result becomes the permanent source for
  // dropdown options. Every later call (from Apply Filters) leaves
  // filterOptionsData untouched.
  const fetchReportData = (grades, states, zones, agms, branches, freezeFilterOptions = false) => {
    const thisRequestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    const url = buildReportUrl(grades, states, zones, agms, branches);

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((result) => {
        // If a newer request has started since this one fired, drop this
        // response on the floor — it's stale and would clobber fresher data.
        if (thisRequestId !== requestIdRef.current) return;

        const rows = Array.isArray(result) ? result : result?.data ?? result?.records ?? [];

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

        if (freezeFilterOptions) {
          setFilterOptionsData(mappedData);
        }

        setLoading(false);
      })
      .catch((err) => {
        if (thisRequestId !== requestIdRef.current) return;
        setError(`Could not load report data: ${err.message}`);
        setLoading(false);
      });
  };

  // Load ALL data automatically on first mount — no filters applied.
  // This is the ONLY call that freezes filterOptionsData.
  useEffect(() => {
    fetchReportData([], [], [], [], [], true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    month,
  ]);

  // ---- TABLE / KPI data pipeline — always reflects the LATEST fetch ----
  const yearMonthFiltered = useMemo(() => {
    return data.filter(
      (x) => (year === "All" || x.year === year) && (month === "All" || x.month === month)
    );
  }, [data, year, month]);

  const YEARS = useMemo(() => [...new Set(data.map((item) => item.year))].sort(), [data]);
  const MONTHS = useMemo(() => [...new Set(data.map((item) => item.month))].sort(), [data]);

  // ---- FILTER OPTIONS pipeline — always reflects the FROZEN initial fetch ----
  const frozenYearMonthFiltered = useMemo(() => {
    return filterOptionsData.filter(
      (x) => (year === "All" || x.year === year) && (month === "All" || x.month === month)
    );
  }, [filterOptionsData, year, month]);

  // Every option list below is now MUTUALLY filtered against every other
  // pending selection (not just "upstream" ones) — so picking AGM first
  // correctly narrows State/Zone/Branch, and vice versa in any order.
  const stateOptions = useMemo(() => {
    return [
      ...new Set(
        frozenYearMonthFiltered
          .filter(
            x =>
              pendingAgms.length === 0 ||
              pendingAgms.includes(x.agm)
          )
          .map(x => x.state)
      ),
    ].sort();
  }, [frozenYearMonthFiltered, pendingAgms]);

  const zoneOptions = useMemo(() => {
    return [
      ...new Set(
        frozenYearMonthFiltered
          .filter(
            x =>
              (pendingAgms.length === 0 ||
                pendingAgms.includes(x.agm)) &&
              (pendingStates.length === 0 ||
                pendingStates.includes(x.state))
          )
          .map(x => x.zone)
      ),
    ].sort();
  }, [frozenYearMonthFiltered, pendingAgms, pendingStates]);


  const agmOptions = useMemo(() => {
    return [...new Set(
      frozenYearMonthFiltered.map(x => x.agm)
    )].sort();
  }, [frozenYearMonthFiltered]);

  // Grade options are a fixed list sent to the backend directly,
  // not derived from fetched data.
  const gradeOptions = ["pre_primary", "primary", "high_school", "puc"];

  const branchOptions = useMemo(() => {
    return [
      ...new Set(
        frozenYearMonthFiltered
          .filter(
            x =>
              (pendingAgms.length === 0 ||
                pendingAgms.includes(x.agm)) &&
              (pendingStates.length === 0 ||
                pendingStates.includes(x.state)) &&
              (pendingZones.length === 0 ||
                pendingZones.includes(x.zone))
          )
          .map(x => x.branch)
      ),
    ].sort();
  }, [
    frozenYearMonthFiltered,
    pendingAgms,
    pendingStates,
    pendingZones,
  ]);


  // Keep pending selections in sync with the now-mutually-filtered option
  // lists — if a choice becomes invalid because of what's picked elsewhere,
  // drop it automatically.



  // Client-side safety net: the backend is unreliable at ANDing multiple
  // params together (state[]+zone[], state[]+grade[], agm[]+branch[], etc.
  // can all return extra rows). state/zone/agm/branch options are derived
  // from real data (filterOptionsData), so re-checking them here is always
  // an exact match and safely narrows whatever the backend over-returns.
  // grade is intentionally excluded — gradeOptions is a hardcoded list, not
  // derived from real data, so re-checking it risks zeroing out rows the
  // backend already filtered correctly.
  const filtered = useMemo(() => {
    return yearMonthFiltered.filter((r) => {
      const stateOk = selectedStates.length === 0 || selectedStates.includes(r.state);
      const zoneOk = selectedZones.length === 0 || selectedZones.includes(r.zone);
      const agmOk = selectedAgms.length === 0 || selectedAgms.includes(r.agm);
      const branchOk = selectedBranches.length === 0 || selectedBranches.includes(r.branch);
      const gradeOk = selectedGrades.length === 0 || selectedGrades.includes(r.grade);
      return stateOk && zoneOk && agmOk && branchOk;

      return stateOk && zoneOk && agmOk && branchOk && gradeOk;
    });

  }, [yearMonthFiltered, selectedStates, selectedZones, selectedAgms, selectedBranches, selectedGrades]);


  const totalStudents = useMemo(() => filtered.reduce((sum, r) => sum + r.studentCount, 0), [filtered]);
  const totalAddressed = useMemo(() => filtered.reduce((sum, r) => sum + r.addressedCount, 0), [filtered]);
  const totalWithoutAddress = useMemo(
    () => filtered.reduce((sum, r) => sum + r.withoutAddressCount, 0),
    [filtered]
  );
  const totalBranches = useMemo(() => new Set(filtered.map((r) => r.branch)).size, [filtered]);

  // Address updated percentage
  const overallPercentage = useMemo(() => {
    if (totalStudents === 0) return 0;
    return (totalAddressed / totalStudents) * 100;
  }, [totalAddressed, totalStudents]);

  // Address Without Updated Percentage
  const overallNotUpdatedPercentage = useMemo(() => {
    if (totalStudents === 0) return 0;
    return (totalWithoutAddress / totalStudents) * 100;
  }, [totalWithoutAddress, totalStudents]);


  // Group by branch + grade together, not branch alone, so rows from
  // different grades don't silently merge into one summed row.
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
        percentage: row.studentCount === 0 ? 0 : (row.addressedCount / row.studentCount) * 100,

        notUpdatedPercentage: row.studentCount === 0
          ? 0
          : (row.withoutAddressCount / row.studentCount) * 100,
      }))
      .sort((a, b) => a.studentCount - b.studentCount);
  }, [filtered]);

  // pagination
  const totalPages = Math.ceil(tableRows.length / rowsPerPage) || 1;

  const paginationRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return tableRows.slice(start, start + rowsPerPage);
  }, [tableRows, currentPage]);

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
  //     Percentage: row.percentage.toFixed(1) + "%",
  //   }));

  //   const worksheet = XLSX.utils.json_to_sheet(excelData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Student Report");

  //   const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  //   const file = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  //   });

  //   saveAs(file, "Student_Branch_Report.xlsx");
  // };

  // Apply Filters is the single trigger point for subsequent backend calls.
  // It never passes freezeFilterOptions=true, so filterOptionsData (and
  // therefore the dropdown option lists) stays locked to whatever the very
  // first mount-time fetch returned.

  const exportToExcel = () => {
    const excelexcelData = tableRows.map((row) => {
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
        // Grade: row.grade,
        "Student Count": row.studentCount,
        "Students With Address": row.addressedCount,
        "Student Address Updated (%)": updatedPercentage.toFixed(1) + "%",
        "Students Without Address": row.withoutAddressCount,
        "Student Address Not Updated (%)": notUpdatedPercentage.toFixed(1) + "%"
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(excelexcelData);

    // Header background color and text style
    // Header background color and text style
    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);

    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({
        r: 0,
        c: col
      });

      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          fill: {
            fgColor: { rgb: "1F4E78" }
          },
          font: {
            bold: true,
            color: { rgb: "FFFFFF" }
          },
          alignment: {
            horizontal: "center",
            vertical: "center"
          }
        };
      }
    }


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

  const applyFilters = async () => {
    // Save applied filters
    setSelectedGrades([...pendingGrades]);
    setSelectedStates([...pendingStates]);
    setSelectedZones([...pendingZones]);
    setSelectedAgms([...pendingAgms]);
    setSelectedBranches([...pendingBranches]);

    const hasGrade = pendingGrades.length > 0;
    const hasAnyOtherFilter =
      pendingStates.length > 0 ||
      pendingZones.length > 0 ||
      pendingAgms.length > 0 ||
      pendingBranches.length > 0;

    // Grade selected (alone or combined with state/zone/agm/branch)
    // -> must hit the backend, since grade filtering is server-side.
    if (hasGrade) {
      fetchReportData(pendingGrades, pendingStates, pendingZones, pendingAgms, pendingBranches);
      return;
    }

    // Only state/zone/agm/branch selected (no grade)
    // -> filter the FROZEN full dataset (filterOptionsData) on the client.
    // No backend call at all.
    if (hasAnyOtherFilter) {
      setError(null);
      const clientFiltered = filterOptionsData.filter((r) => {
        const stateOk = pendingStates.length === 0 || pendingStates.includes(r.state);
        const zoneOk = pendingZones.length === 0 || pendingZones.includes(r.zone);
        const agmOk = pendingAgms.length === 0 || pendingAgms.includes(r.agm);
        const branchOk = pendingBranches.length === 0 || pendingBranches.includes(r.branch);
        return stateOk && zoneOk && agmOk && branchOk;
      });
      setData(clientFiltered);
      return;
    }

    // Nothing selected at all -> restore full data. No backend hit needed.
    setError(null);
    setData(filterOptionsData);
  };

  return (
    <div className="sbd-page">
      <div className="sbd-container">
        <DashboardFilters
          stateOptions={stateOptions}
          zoneOptions={zoneOptions}
          agmOptions={agmOptions}
          branchOptions={branchOptions}
          gradeOptions={gradeOptions}
          pendingStates={pendingStates}
          pendingZones={pendingZones}
          pendingAgms={pendingAgms}
          pendingBranches={pendingBranches}
          pendingGrades={pendingGrades}
          setPendingStates={setPendingStates}
          setPendingZones={setPendingZones}
          setPendingAgms={setPendingAgms}
          setPendingBranches={setPendingBranches}
          setPendingGrades={setPendingGrades}
          applyFilters={applyFilters}
          exportToExcel={exportToExcel}
        />

        {error && <div className="sbd-error">{error}</div>}

        <DashboardCards
          totalStudents={totalStudents}
          totalBranches={totalBranches}
          totalAddressed={totalAddressed}
          totalWithoutAddress={totalWithoutAddress}
          overallPercentage={overallPercentage}
          overallNotUpdatedPercentage={overallNotUpdatedPercentage}
          loading={loading}
        />

        {/* Table */}
        <div className="sbd-table-card">
          {loading ? (
            <div className="sbd-loading" style={{ backgroundColor: "lightblue" }}>
              <SpinnerDotted size={50} thickness={100} speed={500} color="#36ad47" />
            </div>
          ) : (
            <table className="sbd-table">
              <thead>
                <tr>
                  <th>AGM</th>
                  <th>State</th>
                  <th>Zone</th>
                  <th>Branch</th>
                  <th>Student<br /> Count</th>
                  <th>Total Addressed<br /> Student Count</th>
                  <th>Student Address<br /> Not Updated</th>
                  <th>Student Address<br /> Updated %</th>
                  <th>Student Address<br /> Not Updated %</th>
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
                      <td>{formatIN(row.studentCount)}</td>
                      <td>{formatIN(row.addressedCount)}</td>
                      <td>{formatIN(row.withoutAddressCount)}</td>
                      <td>{row.percentage.toFixed(1)}%</td>
                      <td>{row.notUpdatedPercentage.toFixed(1)}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px",
          }}
        >
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
          <span>
            page {currentPage} of {totalPages}
          </span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}