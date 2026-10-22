// // import Select from "react-select";
// // import * as XLSX from "xlsx";
// // import { saveAs } from "file-saver";

// // const toValues = (arr = []) =>
// //     arr.map((item) => ({
// //         value: item,
// //         label: item,
// //     }));


// // export default function DashboardFilters({
// //     stateOptions,
// //     zoneOptions,
// //     agmOptions,
// //     branchOptions,
// //     gradeOptions,

// //     pendingStates,
// //     pendingZones,
// //     pendingAgms,
// //     pendingBranches,
// //     pendingGrades,

// //     setPendingStates,
// //     setPendingZones,
// //     setPendingAgms,
// //     setPendingBranches,
// //     setPendingGrades,

// //     applyFilters,
// //     exportToExcel,
// // }) {

// //     const multiSelectStyles = {
// //         control: (base) => ({
// //             ...base,
// //             minHeight: 38,
// //         }),
// //         valueContainer: (base) => ({
// //             ...base,
// //             flexWrap: "wrap",
// //             maxHeight: 80,
// //             overflowY: "auto",
// //         }),
// //     };


// //     {/* Header */ }
// //     return (
// //         <div className="sbd-header">
// //             <h1 className="sbd-title">Student & Branch Overview</h1>
// //             <div className="sbd-filters">
// //                 {/* AGM */}
// //                 <div className="sbd-select-container">
// //                     <Select
// //                         isMulti
// //                         placeholder="Select AGM"
// //                         styles={multiSelectStyles}
// //                         options={toValues(agmOptions)}
// //                         value={toValues(pendingAgms)}
// //                         onChange={(selected) => {
// //                             const values = selected ? selected.map((x) => x.value) : [];
// //                             setPendingAgms(values);
// //                             setPendingBranches([]);
// //                         }}
// //                     />
// //                 </div>

// //                 {/* State */}
// //                 <div className="sbd-select-container">
// //                     <Select
// //                         isMulti
// //                         placeholder="Select State"
// //                         styles={multiSelectStyles}
// //                         options={toValues(stateOptions)}
// //                         value={toValues(pendingStates)}
// //                         onChange={(selected) => {
// //                             const values = selected ? selected.map((x) => x.value) : [];
// //                             setPendingStates(values);
// //                             setPendingZones([]);
// //                             setPendingAgms([]);
// //                             setPendingBranches([]);
// //                         }}
// //                     />
// //                 </div>

// //                 {/* Zone */}
// //                 <div className="sbd-select-container">
// //                     <Select
// //                         isMulti
// //                         placeholder="Select Zone"
// //                         styles={multiSelectStyles}
// //                         options={toValues(zoneOptions)}
// //                         value={toValues(pendingZones)}
// //                         onChange={(selected) => {
// //                             const values = selected ? selected.map((x) => x.value) : [];
// //                             setPendingZones(values);
// //                             setPendingAgms([]);
// //                             setPendingBranches([]);
// //                         }}
// //                     />
// //                 </div>

// //                 {/* Branch */}
// //                 <div className="sbd-select-container">
// //                     <Select
// //                         isMulti
// //                         placeholder="Select Branch"
// //                         styles={multiSelectStyles}
// //                         options={toValues(branchOptions)}
// //                         value={toValues(pendingBranches)}
// //                         onChange={(selected) => {
// //                             const values = selected ? selected.map((x) => x.value) : [];
// //                             setPendingBranches(values);
// //                         }}
// //                     />
// //                 </div>

// //                 {/* Grade */}
// //                 <div className="sbd-select-container">
// //                     <Select
// //                         isMulti
// //                         placeholder="Select Grade"
// //                         styles={multiSelectStyles}
// //                         options={toValues(gradeOptions)}
// //                         value={toValues(pendingGrades)}
// //                         onChange={(selected) => {
// //                             setPendingGrades(selected ? selected.map((x) => x.value) : []);
// //                         }}
// //                     />
// //                 </div>

// //                 <div
// //                     style={{
// //                         display: "flex",
// //                         justifyContent: "flex-end",
// //                     }}>
// //                     <button
// //                         onClick={exportToExcel}
// //                         style={{
// //                             background: "#1D6F42",
// //                             color: "#fff",
// //                             border: "none",
// //                             padding: "10px 18px",
// //                             borderRadius: "5px",
// //                             cursor: "pointer"
// //                         }}> CSV report</button>
// //                 </div>

// //                 <button
// //                     onClick={applyFilters}
// //                     style={{
// //                         background: "#2f80ed",
// //                         color: "#fff",
// //                         border: "none",
// //                         padding: "10px 18px",
// //                         cursor: "pointer",
// //                         marginRight: "10px"
// //                     }}>  ✓ Apply Filters </button>
// //             </div>
// //         </div>
// //     );
// // };





// import Select from "react-select";

// const toValues = (arr = []) =>
//   arr.map((item) => ({
//     value: item,
//     label: item,
//   }));

// export default function DashboardFilters({
//   stateOptions,
//   zoneOptions,
//   agmOptions,
//   branchOptions,
//   gradeOptions,

//   pendingStates,
//   pendingZones,
//   pendingAgms,
//   pendingBranches,
//   pendingGrades,

//   setPendingStates,
//   setPendingZones,
//   setPendingAgms,
//   setPendingBranches,
//   setPendingGrades,

//   applyFilters,
//   exportToExcel,
// }) {
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

//   return (
//     <div className="sbd-header">
//       <h1 className="sbd-title">Student & Branch Overview</h1>
//       <div className="sbd-filters">
//         {/* AGM */}
//         <div className="sbd-select-container">
//           <Select
//             isMulti
//             placeholder="Select AGM"
//             styles={multiSelectStyles}
//             options={toValues(agmOptions)}
//             value={toValues(pendingAgms)}
//             onChange={(selected) => {
//               const values = selected ? selected.map((x) => x.value) : [];
//               setPendingAgms(values);
//               setPendingBranches([]);
//             }}
//           />
//         </div>

//         {/* State */}
//         <div className="sbd-select-container">
//           <Select
//             isMulti
//             placeholder="Select State"
//             styles={multiSelectStyles}
//             options={toValues(stateOptions)}
//             value={toValues(pendingStates)}
//             onChange={(selected) => {
//               const values = selected ? selected.map((x) => x.value) : [];
//               setPendingStates(values);
//               setPendingZones([]);
//               setPendingAgms([]);
//               setPendingBranches([]);
//             }}
//           />
//         </div>

//         {/* Zone */}
//         <div className="sbd-select-container">
//           <Select
//             isMulti
//             placeholder="Select Zone"
//             styles={multiSelectStyles}
//             options={toValues(zoneOptions)}
//             value={toValues(pendingZones)}
//             onChange={(selected) => {
//               const values = selected ? selected.map((x) => x.value) : [];
//               setPendingZones(values);
//               setPendingAgms([]);
//               setPendingBranches([]);
//             }}
//           />
//         </div>

//         {/* Branch */}
//         <div className="sbd-select-container">
//           <Select
//             isMulti
//             placeholder="Select Branch"
//             styles={multiSelectStyles}
//             options={toValues(branchOptions)}
//             value={toValues(pendingBranches)}
//             onChange={(selected) => {
//               const values = selected ? selected.map((x) => x.value) : [];
//               setPendingBranches(values);
//             }}
//           />
//         </div>

//         {/* Grade */}
//         <div className="sbd-select-container">
//           <Select
//             isMulti
//             placeholder="Select Grade"
//             styles={multiSelectStyles}
//             options={toValues(gradeOptions)}
//             value={toValues(pendingGrades)}
//             onChange={(selected) => {
//               setPendingGrades(selected ? selected.map((x) => x.value) : []);
//             }}
//           />
//         </div>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//           }}
//         >
//           <button
//             onClick={exportToExcel}
//             style={{
//               background: "#1D6F42",
//               color: "#fff",
//               border: "none",
//               padding: "10px 18px",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             {" "}
//             CSV report
//           </button>
//         </div>

//         <button
//           onClick={applyFilters}
//           style={{
//             background: "#2f80ed",
//             color: "#fff",
//             border: "none",
//             padding: "10px 18px",
//             cursor: "pointer",
//             marginRight: "10px",
//           }}
//         >
//           {" "}
//           ✓ Apply Filters{" "}
//         </button>
//       </div>
//     </div>
//   );
// }



import Select from "react-select";

const toValues = (arr = []) =>
  arr.map((item) => ({
    value: item,
    label: item,
  }));

export default function DashboardFilters({
  stateOptions,
  zoneOptions,
  agmOptions,
  branchOptions,
  gradeOptions,

  pendingStates,
  pendingZones,
  pendingAgms,
  pendingBranches,
  pendingGrades,

  setPendingStates,
  setPendingZones,
  setPendingAgms,
  setPendingBranches,
  setPendingGrades,

  applyFilters,
  exportToExcel,
}) {
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

  return (
    <div className="sbd-header">
      <h1 className="sbd-title">Student & Branch Overview</h1>
      <div className="sbd-filters">
        {/* AGM */}
        <div className="sbd-select-container">
          <Select
            isMulti
            placeholder="Select AGM"
            styles={multiSelectStyles}
            options={toValues(agmOptions)}
            value={toValues(pendingAgms)}
            onChange={(selected) => {
              const values = selected ? selected.map(x => x.value) : [];

              setPendingAgms(values);
              setPendingStates([]);
              setPendingZones([]);
              setPendingBranches([]);
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
              const values = selected ? selected.map(x => x.value) : [];

              setPendingStates(values);
              setPendingZones([]);
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
              const values = selected ? selected.map(x => x.value) : [];

              setPendingZones(values);
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
              setPendingBranches(selected ? selected.map((x) => x.value) : []);
            }}
          />
        </div>

        {/* Grade */}
        <div className="sbd-select-container">
          <Select
            isMulti
            placeholder="Select Grade"
            styles={multiSelectStyles}
            options={toValues(gradeOptions)}
            value={toValues(pendingGrades)}
            onChange={(selected) => {
              setPendingGrades(selected ? selected.map((x) => x.value) : []);
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={exportToExcel}
            style={{
              background: "#1D6F42",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            CSV report
          </button>
        </div>

        <button
          onClick={applyFilters}
          style={{
            background: "#2f80ed",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          ✓ Apply Filters
        </button>
      </div>
    </div>
  );
}