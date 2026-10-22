// // import React from "react";

// // const coords = [
// //   { x: 22, y: -20 },
// //   { x: 29, y: 0 },
// //   { x: 22, y: 20 },
// //   { x: 0, y: 30 },
// //   { x: -23, y: 20 },
// //   { x: -30, y: 0 },
// //   { x: -23, y: -20 },
// //   { x: 0, y: -30 },
// // ];

// // const KEYFRAMES = `
// // @keyframes sbd-spinner-shrink {
// //   0% { r: var(--sbd-dot-r); opacity: 1; }
// //   100% { r: 0; opacity: 0.2; }
// // }
// // @keyframes sbd-spinner-center {
// //   0% { transform: scale(0); }
// //   50% { transform: scale(1); }
// //   100% { transform: scale(0); }
// // }
// // `;

// // function normalizeSize(size) {
// //   const asNumber = parseFloat(size);
// //   return asNumber.toString() === size.toString() ? `${size}px` : size;
// // }

// // export default function SpinnerDotted({
// //   size = 50,
// //   color = "#38ad48",
// //   speed = 100,
// //   thickness = 100,
// //   still = false,
// //   style = {},
// //   ...svgProps
// // }) {
// //   const duration = 200 / speed;
// //   const dotRadius = 3 * (thickness / 50);
// //   const centerRadius = 6 * (thickness / 100);

// //   return (
// //     <span
// //       style={{
// //         display: "inline-block",
// //         color,
// //         width: normalizeSize(size),
// //         overflow: "visible",
// //         ...style,
// //       }}
// //     >
// //       <style>{KEYFRAMES}</style>
// //       <svg viewBox="0 0 66 66" width="100%" height="100%" fill="none" {...svgProps}>
// //         {coords.map((c, i) => (
// //           <circle
// //             key={`${c.x}-${c.y}`}
// //             cx="33"
// //             cy="33"
// //             r={dotRadius}
// //             fill="currentColor"
// //             style={{
// //               transform: `translate(${c.x}px, ${c.y}px)`,
// //               transformOrigin: "33px 33px",
// //               animation: still
// //                 ? "none"
// //                 : `sbd-spinner-shrink ${duration}s cubic-bezier(0,0.9,0,0.9) ${
// //                     (duration / 20) * i
// //                   }s infinite`,
// //               "--sbd-dot-r": dotRadius,
// //             }}
// //           />
// //         ))}
// //         <circle
// //           cx="33"
// //           cy="33"
// //           r={centerRadius}
// //           fill="currentColor"
// //           style={
// //             still
// //               ? { display: "none" }
// //               : {
// //                   transformOrigin: "center",
// //                   animation: `sbd-spinner-center ${duration}s ease-out infinite`,
// //                 }
// //           }
// //         />
// //       </svg>
// //     </span>
// //   );
// // }







// import React from "react";

// const coords = [
//   { x: 22, y: -20 },
//   { x: 29, y: 0 },
//   { x: 22, y: 20 },
//   { x: 0, y: 30 },
//   { x: -23, y: 20 },
//   { x: -30, y: 0 },
//   { x: -23, y: -20 },
//   { x: 0, y: -30 },
// ];

// const KEYFRAMES = `
// @keyframes sbd-spinner-shrink {
//   0% { r: var(--sbd-dot-r); opacity: 1; }
//   100% { r: 0; opacity: 0.2; }
// }
// @keyframes sbd-spinner-center {
//   0% { transform: scale(0); }
//   50% { transform: scale(1); }
//   100% { transform: scale(0); }
// }
// `;

// function normalizeSize(size) {
//   const asNumber = parseFloat(size);
//   return asNumber.toString() === size.toString() ? `${size}px` : size;
// }

// export default function SpinnerDotted({
//   size = 50,
//   color = "#38ad48",
//   speed = 100,
//   thickness = 100,
//   still = false,
//   style = {},
//   ...svgProps
// }) {
//   const duration = 500 / speed;
//   const dotRadius = 5  * (thickness / 100);
//   const centerRadius = 6 * (thickness / 100);

//   return (
//     <span
//       style={{
//         display: "inline-block",
//         color,
//         width: normalizeSize(size),
//         height: normalizeSize(size),
//         overflow: "visible",
//         ...style,
//       }}
//     >
//       <style>{KEYFRAMES}</style>
//       <svg viewBox="0 0 66 66" width="100%" height="100%" fill="none" {...svgProps}>
//         {coords.map((c, i) => (
//           <circle
//             key={`${c.x}-${c.y}`}
//             cx="33"
//             cy="33"
//             r={dotRadius}
//             fill="currentColor"
//             style={{
//               transform: `translate(${c.x}px, ${c.y}px)`,
//               transformOrigin: "33px 33px",
//               animation: still
//                 ? "none"
//                 : `sbd-spinner-shrink ${duration}s cubic-bezier(0,0.9,0,1.5) ${
//                     (duration / 20) * i
//                   }s infinite`,
//               "--sbd-dot-r": dotRadius,
//             }}
//           />
//         ))}
//         <circle
//           cx="33"
//           cy="33"
//           r={centerRadius}
//           fill="currentColor"
//           style={
//             still
//               ? { display: "none" }
//               : {
//                   transformOrigin: "center",
//                   animation: `sbd-spinner-center ${duration}s ease-out infinite`,
//                 }
//           }
//         />
//       </svg>
//     </span>
//   );
// }



import React from "react";

const coords = [
  { x: 22, y: -20 },
  { x: 29, y: 0 },
  { x: 22, y: 20 },
  { x: 0, y: 30 },
  { x: -23, y: 20 },
  { x: -30, y: 0 },
  { x: -23, y: -20 },
  { x: 0, y: -30 },
];

// Classic "activity indicator" style: each dot fades and scales up/down
// in sequence. Animating opacity + transform is smooth and reliable in
// every browser, unlike animating an SVG circle's `r` attribute directly.
const KEYFRAMES = `
@keyframes sbd-dot-pulse {
  0%, 100% { opacity: 0.25; transform: scale(0.55); }
  50% { opacity: 1; transform: scale(1); }
}
@keyframes sbd-spinner-center {
  0%, 100% { transform: scale(0.7); opacity: 0.7; }
  50% { transform: scale(1); opacity: 1; }
}
`;

function normalizeSize(size) {
  const asNumber = parseFloat(size);
  return asNumber.toString() === size.toString() ? `${size}px` : size;
}

export default function SpinnerDotted({
  size = 50,
  color = "#38ad48",
  speed = 100,
  thickness = 100,
  still = false,
  style = {},
  ...svgProps
}) {
  const duration = 1000 / speed; // full cycle length in seconds
  const dotRadius = 5 * (thickness / 100);
  const centerRadius = 6 * (thickness / 100);
  const dotCount = coords.length;

  return (
    <span
      style={{
        display: "inline-block",
        color,
        width: normalizeSize(size),
        height: normalizeSize(size),
        overflow: "visible",
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>
      <svg viewBox="0 0 66 66" width="100%" height="100%" fill="none" {...svgProps}>
        {coords.map((c, i) => {
          // Stagger each dot evenly across the full cycle so the
          // "pulse" travels smoothly around the ring.
          const delay = (duration / dotCount) * i;
          return (
            <g key={`${c.x}-${c.y}`} transform={`translate(${c.x}, ${c.y})`}>
              <circle
                cx="33"
                cy="33"
                r={dotRadius}
                fill="currentColor"
                style={{
                  transformOrigin: "33px 33px",
                  animation: still
                    ? "none"
                    : `sbd-dot-pulse ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            </g>
          );
        })}
        <circle
          cx="33"
          cy="33"
          r={centerRadius}
          fill="currentColor"
          style={
            still
              ? { display: "none" }
              : {
                  transformOrigin: "33px 33px",
                  animation: `sbd-spinner-center ${duration}s ease-in-out infinite`,
                }
          }
        />
      </svg>
    </span>
  );
}