"""
Pull real photos + profile stats for @thepetsclubmaroc from the public imginn
mirror (Instagram itself requires login). One-shot: signed CDN URLs expire fast.
Downloads originals to a temp dir for curation; does NOT touch the repo.
    python scripts/fetch-instagram.py <out_dir>
"""
import urllib.request, html, re, os, sys

OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.environ.get("TEMP", "/tmp"), "ig_photos")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read().decode("utf-8", "ignore")

pages = [
    "https://imginn.com/thepetsclubmaroc/",
    "https://imginn.com/thepetsclubmaroc/?cursor=2",
    "https://imginn.com/thepetsclubmaroc/?cursor=3",
]

# profile stats from page 1
p1 = get(pages[0])
def stat(label):
    m = re.search(r'([\d.,]+[KkMm]?)\s*</?[^>]*>?\s*' + label, p1, re.I)
    return m.group(1) if m else "?"
print("STATS raw scan:")
for kw in ["posts", "followers", "following", "Posts", "Followers"]:
    for m in re.finditer(r'([\d.,]+\s*[KkMm]?)\s*' + kw, p1):
        print(f"  {kw}: {m.group(1).strip()}")

seen = {}
for pg in pages:
    try:
        htmltxt = p1 if pg == pages[0] else get(pg)
    except Exception as e:
        print("page fail", pg, e); continue
    for raw in re.findall(r'https://[^"\'\s]*?cdninstagram[^"\'\s]*?\.jpg[^"\'\s]*', htmltxt):
        u = html.unescape(raw)
        m = re.search(r'/([0-9]+_[0-9]+_[0-9]+_n\.jpg)', u)
        if not m:
            m = re.search(r'/([0-9]{6,}_[^/?]+\.jpg)', u)
        key = m.group(1) if m else u.split("?")[0].split("/")[-1]
        score = (1 if "p1080x1080" in u else 0, len(u))
        if key not in seen or score > seen[key][0]:
            seen[key] = (score, u)

print(f"\n{len(seen)} unique photos found; downloading...")
n = 0
for i, (key, (_, u)) in enumerate(sorted(seen.items())):
    dest = os.path.join(OUT, f"ig_{i:02d}.jpg")
    try:
        data = urllib.request.urlopen(urllib.request.Request(u, headers={**UA, "Referer": "https://imginn.com/"}), timeout=40).read()
        if len(data) > 8000:
            with open(dest, "wb") as f:
                f.write(data)
            n += 1
            print(f"  saved ig_{i:02d}.jpg  {len(data)//1024}KB")
    except Exception as e:
        print(f"  fail {i}: {e}")
print(f"\nDONE: {n} images in {OUT}")
