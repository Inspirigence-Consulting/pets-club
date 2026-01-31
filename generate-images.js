const fs = require("fs");
const path = require("path");
const d = path.join(__dirname, "public", "images");

function b(n, c, o) {
  let s = "";
  for (let i = 0; i < n; i++) {
    let cx = Math.random() * 100;
    let cy = Math.random() * 100;
    let r = 2 + Math.random() * 8;
    let cl = c[Math.floor(Math.random() * c.length)];
    let op = (o + Math.random() * 0.08).toFixed(3);
    s += '<circle cx="' + cx.toFixed(1) + '%" cy="' + cy.toFixed(1) + '%" r="' + r.toFixed(1) + '%" fill="' + cl + '" opacity="' + op + '"/>';
  }
  return s;
}

function pw(n, c, o) {
  let s = "";
  for (let i = 0; i < n; i++) {
    let x = 10 + Math.random() * 80;
    let y = 10 + Math.random() * 80;
    let r = Math.random() * 360;
    let sc = 0.3 + Math.random() * 0.4;
    s += '<g transform="translate(' + x.toFixed(0) + '%,' + y.toFixed(0) + '%) rotate(' + r.toFixed(0) + ') scale(' + sc.toFixed(2) + ')" fill="' + c + '" opacity="' + o + '">';
    s += '<ellipse cx="0" cy="6" rx="5" ry="7"/>';
    s += '<circle cx="-5" cy="-3" r="2.5"/>';
    s += '<circle cx="5" cy="-3" r="2.5"/>';
    s += '<circle cx="-3" cy="-6" r="2"/>';
    s += '<circle cx="3" cy="-6" r="2"/>';
    s += '</g>';
  }
  return s;
}

var gf = '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>';
var gr = '<rect width="100%" height="100%" filter="url(#grain)" opacity="0.04"/>';

function hero() {
  var s = '<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">';
  s += '<defs>';
  s += '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">';
  s += '<stop offset="0%" stop-color="#0a1f14"/>';
  s += '<stop offset="40%" stop-color="#1a3a2a"/>';
  s += '<stop offset="100%" stop-color="#0f2419"/>';
  s += '</linearGradient>';
  s += '<radialGradient id="w" cx="70%" cy="40%" r="50%">';
  s += '<stop offset="0%" stop-color="#c5a55a" stop-opacity="0.15"/>';
  s += '<stop offset="100%" stop-color="#1a3a2a" stop-opacity="0"/>';
  s += '</radialGradient>';
  s += '<radialGradient id="sp" cx="30%" cy="50%" r="40%">';
  s += '<stop offset="0%" stop-color="#fff" stop-opacity="0.04"/>';
  s += '<stop offset="100%" stop-color="transparent"/>';
  s += '</radialGradient>';
  s += gf;
  s += '</defs>';
  s += '<rect width="1920" height="1080" fill="url(#bg)"/>';
  s += '<rect width="1920" height="1080" fill="url(#w)"/>';
  s += '<rect width="1920" height="1080" fill="url(#sp)"/>';
  s += b(30, ["#c5a55a", "#d4bc7c", "#ffffff", "#8fa88b"], 0.05);
  s += '<circle cx="75%" cy="35%" r="15%" fill="none" stroke="#c5a55a" stroke-width="0.5" opacity="0.07"/>';
  s += '<circle cx="75%" cy="35%" r="20%" fill="none" stroke="#c5a55a" stroke-width="0.3" opacity="0.05"/>';
  s += '<circle cx="75%" cy="35%" r="25%" fill="none" stroke="#c5a55a" stroke-width="0.2" opacity="0.03"/>';
  s += '<g transform="translate(1200,380)" fill="#c5a55a" opacity="0.07">';
  s += '<ellipse cx="0" cy="0" rx="180" ry="160"/>';
  s += '<ellipse cx="-110" cy="-130" rx="55" ry="80" transform="rotate(-20,-110,-130)"/>';
  s += '<ellipse cx="110" cy="-130" rx="55" ry="80" transform="rotate(20,110,-130)"/>';
  s += '<ellipse cx="0" cy="130" rx="200" ry="160"/>';
  s += '<ellipse cx="-70" cy="260" rx="45" ry="90"/>';
  s += '<ellipse cx="70" cy="260" rx="45" ry="90"/>';
  s += '</g>';
  s += pw(12, "#c5a55a", 0.025);
  s += '<line x1="10%" y1="85%" x2="45%" y2="85%" stroke="#c5a55a" stroke-width="1" opacity="0.12"/>';
  s += '<line x1="10%" y1="87%" x2="25%" y2="87%" stroke="#c5a55a" stroke-width="0.5" opacity="0.08"/>';
  s += gr;
  s += '</svg>';
  return s;
}

function ri(w, h, gs, ge, ac) {
  var s = '<svg width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">';
  s += '<defs>';
  s += '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">';
  s += '<stop offset="0%" stop-color="' + gs + '"/>';
  s += '<stop offset="100%" stop-color="' + ge + '"/>';
  s += '</linearGradient>';
  s += '<radialGradient id="gl" cx="50%" cy="42%" r="55%">';
  s += '<stop offset="0%" stop-color="' + ac + '" stop-opacity="0.2"/>';
  s += '<stop offset="100%" stop-color="' + ge + '" stop-opacity="0"/>';
  s += '</radialGradient>';
  s += '<radialGradient id="v" cx="50%" cy="50%" r="70%">';
  s += '<stop offset="0%" stop-color="transparent"/>';
  s += '<stop offset="100%" stop-color="#000" stop-opacity="0.3"/>';
  s += '</radialGradient>';
  s += gf;
  s += '</defs>';
  s += '<rect width="' + w + '" height="' + h + '" fill="url(#bg)"/>';
  s += '<rect width="' + w + '" height="' + h + '" fill="url(#gl)"/>';
  s += b(14, [ac, "#fff", gs], 0.07);
  s += '<g transform="translate(' + (w / 2) + ',' + (h * 0.42) + ')" fill="' + ac + '" opacity="0.1">';
  s += '<ellipse cx="0" cy="0" rx="' + (w * 0.18) + '" ry="' + (h * 0.15) + '"/>';
  s += '<ellipse cx="' + (-w * 0.12) + '" cy="' + (-h * 0.12) + '" rx="' + (w * 0.06) + '" ry="' + (h * 0.08) + '"/>';
  s += '<ellipse cx="' + (w * 0.12) + '" cy="' + (-h * 0.12) + '" rx="' + (w * 0.06) + '" ry="' + (h * 0.08) + '"/>';
  s += '<ellipse cx="0" cy="' + (h * 0.07) + '" rx="' + (w * 0.09) + '" ry="' + (h * 0.06) + '"/>';
  s += '</g>';
  s += pw(6, ac, 0.04);
  s += '<rect width="' + w + '" height="' + h + '" fill="url(#v)"/>';
  s += gr;
  s += '</svg>';
  return s;
}

function ph(w, h, gs, ge, ac) {
  var s = '<svg width="' + w + '" height="' + h + '" xmlns="http://www.w3.org/2000/svg">';
  s += '<defs>';
  s += '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">';
  s += '<stop offset="0%" stop-color="' + gs + '"/>';
  s += '<stop offset="100%" stop-color="' + ge + '"/>';
  s += '</linearGradient>';
  s += '<radialGradient id="gl" cx="60%" cy="50%" r="60%">';
  s += '<stop offset="0%" stop-color="' + ac + '" stop-opacity="0.12"/>';
  s += '<stop offset="100%" stop-color="' + ge + '" stop-opacity="0"/>';
  s += '</radialGradient>';
  s += gf;
  s += '</defs>';
  s += '<rect width="' + w + '" height="' + h + '" fill="url(#bg)"/>';
  s += '<rect width="' + w + '" height="' + h + '" fill="url(#gl)"/>';
  s += b(20, [ac, "#fff", gs], 0.05);
  s += pw(10, ac, 0.025);
  s += gr;
  s += '</svg>';
  return s;
}

function av(sz, i) {
  var bgs = ["#2d5a42", "#8B6914", "#5c4033"];
  var acs = ["#c5a55a", "#d4bc7c", "#8fa88b"];
  var s = '<svg width="' + sz + '" height="' + sz + '" xmlns="http://www.w3.org/2000/svg">';
  s += '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">';
  s += '<stop offset="0%" stop-color="' + bgs[i % 3] + '"/>';
  s += '<stop offset="100%" stop-color="#0f2419"/>';
  s += '</linearGradient></defs>';
  s += '<rect width="' + sz + '" height="' + sz + '" fill="url(#bg)"/>';
  s += '<circle cx="50%" cy="38%" r="18%" fill="' + acs[i % 3] + '" opacity="0.15"/>';
  s += '<ellipse cx="50%" cy="75%" rx="25%" ry="20%" fill="' + acs[i % 3] + '" opacity="0.1"/>';
  s += '<circle cx="50%" cy="38%" r="14%" fill="' + acs[i % 3] + '" opacity="0.08"/>';
  s += '</svg>';
  return s;
}

var f = {};
f["hero-bg.svg"] = hero();
f["breed-pomeranian.svg"] = ri(800, 1000, "#8B6914", "#3a2a0a", "#d4bc7c");
f["breed-aussie.svg"] = ri(800, 1000, "#3a5a4a", "#1a2a1a", "#8fa88b");
f["about-hero.svg"] = ph(1920, 800, "#1a3a2a", "#0a1a0f", "#c5a55a");
f["about-story.svg"] = ri(800, 1000, "#2d4a3a", "#1a2a1a", "#c5a55a");
f["ethical-hero.svg"] = ph(1920, 800, "#0f2419", "#1a3a2a", "#8fa88b");
f["puppies-hero.svg"] = ph(1920, 800, "#1a3a2a", "#0f2419", "#d4bc7c");
f["pom-overview.svg"] = ri(800, 800, "#8B6914", "#4a3010", "#d4bc7c");
f["aussie-overview.svg"] = ri(800, 800, "#3a5a4a", "#1a3a2a", "#8fa88b");
f["guide-cover.svg"] = ri(800, 600, "#1a3a2a", "#0a1a0f", "#c5a55a");
f["puppy-pom-1.svg"] = ri(600, 750, "#8B6914", "#4a3010", "#d4bc7c");
f["puppy-pom-1b.svg"] = ri(600, 750, "#9a7824", "#5a4020", "#d4bc7c");
f["puppy-pom-1c.svg"] = ri(600, 750, "#7a5904", "#3a2000", "#d4bc7c");
f["puppy-pom-2.svg"] = ri(600, 750, "#a08030", "#5a4515", "#e8c4b8");
f["puppy-aussie-1.svg"] = ri(600, 750, "#3a5a4a", "#1a3a2a", "#8fa88b");
f["puppy-aussie-1b.svg"] = ri(600, 750, "#4a6a5a", "#2a4a3a", "#8fa88b");
f["puppy-aussie-1c.svg"] = ri(600, 750, "#2a4a3a", "#0a2a1a", "#8fa88b");
f["puppy-aussie-2.svg"] = ri(600, 750, "#4a6050", "#2a4030", "#c5a55a");
f["parent-pom-m.svg"] = ri(400, 400, "#8B6914", "#4a3010", "#d4bc7c");
f["parent-pom-f.svg"] = ri(400, 400, "#9a7824", "#5a4020", "#e8c4b8");
f["parent-pom-f2.svg"] = ri(400, 400, "#a08030", "#5a4515", "#d4bc7c");
f["parent-aussie-m.svg"] = ri(400, 400, "#3a5a4a", "#1a3a2a", "#8fa88b");
f["parent-aussie-f.svg"] = ri(400, 400, "#4a6a5a", "#2a4a3a", "#c5a55a");
f["parent-aussie-m2.svg"] = ri(400, 400, "#2a4a3a", "#0a2a1a", "#8fa88b");
f["testimonial-1.svg"] = av(200, 0);
f["testimonial-2.svg"] = av(200, 1);
f["testimonial-3.svg"] = av(200, 2);
f["blog-1.svg"] = ri(800, 500, "#2d5a42", "#1a3a2a", "#c5a55a");
f["blog-2.svg"] = ri(800, 500, "#c27c5e", "#8a5540", "#e8c4b8");
f["blog-3.svg"] = ri(800, 500, "#5c4033", "#3a2820", "#d4bc7c");

var th = [
  { gs: "#2d5a42", ge: "#1a3a2a", ac: "#c5a55a" },
  { gs: "#8B6914", ge: "#5a4510", ac: "#d4bc7c" },
  { gs: "#4a6741", ge: "#2d3d28", ac: "#8fa88b" },
  { gs: "#c27c5e", ge: "#8a5540", ac: "#e8c4b8" },
  { gs: "#1a3a2a", ge: "#0f2419", ac: "#c5a55a" },
  { gs: "#5c4033", ge: "#3a2820", ac: "#d4bc7c" },
  { gs: "#3a5a4a", ge: "#1f3a2a", ac: "#8fa88b" },
  { gs: "#4a3a2a", ge: "#2a1a0a", ac: "#c5a55a" },
];
for (var i = 1; i <= 8; i++) {
  var t = th[(i - 1) % 8];
  f["gallery-" + i + ".svg"] = ri(600, 600, t.gs, t.ge, t.ac);
}

var count = 0;
for (var fn in f) {
  fs.writeFileSync(path.join(d, fn), f[fn]);
  count++;
}
console.log("Generated " + count + " rich SVG images");
