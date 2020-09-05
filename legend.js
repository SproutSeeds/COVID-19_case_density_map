let ul = document.getElementById("legend_list");

// const color_array = [
//   "#FFE5E5",
//   "#FFCCCC",
//   "#FFB2B2",
//   "#FF7F7F",
//   "#FF6565",
//   "#FF4C4C",
//   "#FF3232"
// ];

const color_description = [
  "0.00% > 0.1%",
  "0.01% > 0.3%",
  "0.03% > 0.5%",
  "0.05% > 0.8%",
  "0.08% > 1.1%",
  "0.11% > 2%",
  "0.2%"
];

for (color in color_description) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`${color_description[color]}`));
  li.setAttribute("id", `color_${parseInt(color)}`);
  ul.appendChild(li);
}
