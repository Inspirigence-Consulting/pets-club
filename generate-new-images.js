var fs = require("fs");
var path = require("path");

var OUTPUT_DIR = path.join(__dirname, "public", "images");

var puppies = [
  {
    filename: "puppy-pom-3.svg",
    name: "Black & Tan Pomeranian",
    breed: "Pomeranian",
    bgGrad: [
      { offset: "0%", color: "#1a1a2e" },
      { offset: "50%", color: "#2d1b3d" },
      { offset: "100%", color: "#0f0f1a" }
    ],
    bodyColor: "#1c1c1c",
    bodyStroke: "#333333",
    accentColor: "#c8923a",
    earColor: "#1c1c1c",
    headHighlight: "#2a2a2a",
    tanPatches: true,
    tanColor: "#d4a04a",
    whitePatches: false,
    whiteColor: "",
    merlePatches: false,
    merleColor1: "",
    merleColor2: "",
    bokehColors: ["#c8923a", "#e8c06a", "#8b6914", "#ffdfaa", "#a07828"],
    vignetteOpacity: "0.6",
    textColor: "#e8c06a",
    isAussie: false
  },
  {
    filename: "puppy-pom-4.svg",
    name: "Orange Pomeranian",
    breed: "Pomeranian",
    bgGrad: [
      { offset: "0%", color: "#3d1e06" },
      { offset: "50%", color: "#5a2d0e" },
      { offset: "100%", color: "#2a1504" }
    ],
    bodyColor: "#e87820",
    bodyStroke: "#c46218",
    accentColor: "#ffaa44",
    earColor: "#d06a18",
    headHighlight: "#f09030",
    tanPatches: false,
    tanColor: "",
    whitePatches: false,
    whiteColor: "",
    merlePatches: false,
    merleColor1: "",
    merleColor2: "",
    bokehColors: ["#ff9933", "#ffcc66", "#ff7711", "#ffddaa", "#ee8822"],
    vignetteOpacity: "0.55",
    textColor: "#ffcc66",
    isAussie: false
  },
  {
    filename: "puppy-pom-5.svg",
    name: "Sable Pomeranian",
    breed: "Pomeranian",
    bgGrad: [
      { offset: "0%", color: "#2e2010" },
      { offset: "50%", color: "#453218" },
      { offset: "100%", color: "#1a1208" }
    ],
    bodyColor: "#c49a3c",
    bodyStroke: "#a07828",
    accentColor: "#e8c868",
    earColor: "#8b6914",
    headHighlight: "#d4aa44",
    tanPatches: true,
    tanColor: "#3a2a10",
    whitePatches: false,
    whiteColor: "",
    merlePatches: false,
    merleColor1: "",
    merleColor2: "",
    bokehColors: ["#e8c868", "#c49a3c", "#f0d878", "#a08030", "#dbb850"],
    vignetteOpacity: "0.5",
    textColor: "#f0d878",
    isAussie: false
  },
  {
    filename: "puppy-aussie-3.svg",
    name: "Black Tri Australian Shepherd",
    breed: "Australian Shepherd",
    bgGrad: [
      { offset: "0%", color: "#0d1117" },
      { offset: "50%", color: "#1a1f2e" },
      { offset: "100%", color: "#080b10" }
    ],
    bodyColor: "#111111",
    bodyStroke: "#2a2a2a",
    accentColor: "#cc7733",
    earColor: "#0e0e0e",
    headHighlight: "#1e1e1e",
    tanPatches: true,
    tanColor: "#cc7733",
    whitePatches: true,
    whiteColor: "#e8e8e8",
    merlePatches: false,
    merleColor1: "",
    merleColor2: "",
    bokehColors: ["#cc7733", "#ffffff", "#88aacc", "#ddaa66", "#aaccee"],
    vignetteOpacity: "0.65",
    textColor: "#aaccee",
    isAussie: true
  },
  {
    filename: "puppy-aussie-4.svg",
    name: "Red Merle Australian Shepherd",
    breed: "Australian Shepherd",
    bgGrad: [
      { offset: "0%", color: "#2a1218" },
      { offset: "50%", color: "#3d1a22" },
      { offset: "100%", color: "#1a0a10" }
    ],
    bodyColor: "#a0442e",
    bodyStroke: "#803828",
    accentColor: "#d4885a",
    earColor: "#8a3828",
    headHighlight: "#b85538",
    tanPatches: true,
    tanColor: "#d4885a",
    whitePatches: true,
    whiteColor: "#f0e8e0",
    merlePatches: true,
    merleColor1: "#c06040",
    merleColor2: "#e8b090",
    bokehColors: ["#d4885a", "#f0e8e0", "#c06040", "#e8b090", "#aa5544"],
    vignetteOpacity: "0.55",
    textColor: "#e8b090",
    isAussie: true
  }
];