/* Quick check: sample a few pixels from each logo copy. */
const sharp = require("sharp");

(async () => {
  for (const f of ["logo.png", "public/logo.png"]) {
    const { data, info } = await sharp(f)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const pts = [
      [5, 5],
      [Math.floor(info.width / 2), Math.floor(info.height / 2)],
      [Math.floor(info.width / 2), 12],
    ];
    const s = pts.map(([x, y]) => {
      const o = (y * info.width + x) * 4;
      return `(${x},${y})=rgba(${data[o]},${data[o + 1]},${data[o + 2]},${data[o + 3]})`;
    });
    console.log(`${f} ${info.width}x${info.height} | ${s.join(" | ")}`);
  }
})();
