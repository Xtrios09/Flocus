// import React from "react";

// // Placeholder for future chart/visualization imports
// // import { PieChart, BarChart, LineChart, Heatmap } from 'some-chart-library';
// // import { LineChart } from '@mui/x-charts';

// export default function Dashboard() {
//   // Example: Get Pomodoro sessions per day from localStorage (simulate for now)
//   // In a real app, you would update this data on each session complete
//   let pomodoroHistory: { date: string; count: number }[] = [];
//   if (typeof window !== 'undefined') {
//     const stored = localStorage.getItem('pomodoro-history');
//     if (stored) pomodoroHistory = JSON.parse(stored);
//     else {
//       // Simulate 7 days of data for demo
//       const today = new Date();
//       for (let i = 6; i >= 0; i--) {
//         const d = new Date(today);
//         d.setDate(today.getDate() - i);
//         pomodoroHistory.push({ date: d.toLocaleDateString(), count: Math.floor(Math.random() * 8) });
//       }
//     }
//   }

//   const xLabels = pomodoroHistory.map(d => d.date);
//   const yData = pomodoroHistory.map(d => d.count);

//   return (
//     <div className="w-full max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Productivity Dashboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Summary Cards */}
//         <div className="bg-[#232323] rounded-xl p-6 text-center shadow border border-[#333]">
//           <div className="text-2xl font-bold">Total Pomodoros</div>
//           <div className="text-4xl mt-2 text-pink-400">{pomodoroHistory.reduce((a, b) => a + b.count, 0)}</div>
//         </div>
//         <div className="bg-[#232323] rounded-xl p-6 text-center shadow border border-[#333]">
//           <div className="text-2xl font-bold">Total Focused Hours</div>
//           <div className="text-4xl mt-2 text-blue-400">{((pomodoroHistory.reduce((a, b) => a + b.count, 0) * 25) / 60).toFixed(1)}</div>
//         </div>
//         <div className="bg-[#232323] rounded-xl p-6 text-center shadow border border-[#333]">
//           <div className="text-2xl font-bold">Current Streak</div>
//           <div className="text-4xl mt-2 text-yellow-400">{pomodoroHistory.filter(d => d.count > 0).length} days</div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         {/* Real chart for Pomodoros Over Time */}
//         <div className="bg-[#232323] rounded-xl p-6 shadow border border-[#333] h-80 flex flex-col items-center justify-center">
//           <div className="text-lg font-semibold mb-2">Pomodoros Over Time</div>
//           {/* <LineChart
//             xAxis={[{ data: xLabels, scaleType: 'point' }]}
//             series={[{ data: yData, label: 'Pomodoros' }]}
//             width={400}
//             height={250}
//             sx={{ background: 'transparent', color: 'white' }}
//           /> */}
//         </div>
//         <div className="bg-[#232323] rounded-xl p-6 shadow border border-[#333] h-80 flex flex-col items-center justify-center">
//           <div className="text-lg font-semibold mb-2">Focus Time Heatmap</div>
//           <div className="text-gray-400">[Heatmap Placeholder]</div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-[#232323] rounded-xl p-6 shadow border border-[#333] h-64 flex flex-col items-center justify-center">
//           <div className="text-lg font-semibold mb-2">Task Completion by Category</div>
//           <div className="text-gray-400">[Pie/Bar Chart Placeholder]</div>
//         </div>
//         <div className="bg-[#232323] rounded-xl p-6 shadow border border-[#333] h-64 flex flex-col items-center justify-center">
//           <div className="text-lg font-semibold mb-2">Work vs Break Ratio</div>
//           <div className="text-gray-400">[Pie Chart Placeholder]</div>
//         </div>
//       </div>
//     </div>
//   );
// }
