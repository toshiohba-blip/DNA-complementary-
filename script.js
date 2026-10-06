const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "dna-complement-sequence-v1";
const DNA_RE = /^[ATGC]+$/;

function normalizeInput(raw) {
  const lines = raw.replace(/\r/g, "").split("\n");
  const seqLines = lines.filter(line => !line.trim().startsWith(">"));
  return seqLines.join("").replace(/\s+/g, "").toUpperCase();
}

function complement(seq) {
  const table = { A:"T", T:"A", G:"C", C:"G" };
  return [...seq].map(base => table[base]).join("");
}

function reverseComplement(seq) {
  return complement(seq).split("").reverse().join("");
}

function gcPercent(seq) {
  if (!seq.length) return 0;
  const gc = [...seq].filter(b => b === "G" || b === "C").length;
  return gc / seq.length * 100;
}

function showError(message) {
  $("error").textContent = message;
  $("error").classList.remove("hidden");
  $("result").classList.add("hidden");
}

function calculate() {
  const seq = normalizeInput($("sequence").value);
  localStorage.setItem(STORAGE_KEY, $("sequence").value);

  if (!seq) {
    showError("DNA配列を入力してください。");
    return;
  }

  if (!DNA_RE.test(seq)) {
    const invalid = [...new Set([...seq].filter(b => !DNA_RE.test(b)))].join(", ");
    showError(`A/T/G/C以外の文字が含まれています。確認してください。${invalid ? `（例: ${invalid}）` : ""}`);
    return;
  }

  const comp = complement(seq);
  const revComp = reverseComplement(seq);
  $("cleaned").value = seq;
  $("complement").value = comp;
  $("reverseComplement").value = revComp;
  $("length").textContent = `${seq.length.toLocaleString()} bp`;
  $("gc").textContent = `${gcPercent(seq).toFixed(2)} %`;
  $("at").textContent = `${(100 - gcPercent(seq)).toFixed(2)} %`;

  $("error").classList.add("hidden");
  $("result").classList.remove("hidden");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    return true;
  }
}

document.addEventListener("click", async (e) => {
  const button = e.target.closest("[data-copy]");
  if (!button) return;
  const target = $(button.dataset.copy);
  await copyText(target.value);
  const original = button.textContent;
  button.textContent = "コピーしました";
  setTimeout(() => button.textContent = original, 1200);
});

$("calculate").addEventListener("click", calculate);

$("clear").addEventListener("click", () => {
  $("sequence").value = "";
  $("error").classList.add("hidden");
  $("result").classList.add("hidden");
  localStorage.removeItem(STORAGE_KEY);
});

$("sequence").addEventListener("input", () => {
  localStorage.setItem(STORAGE_KEY, $("sequence").value);
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) $("sequence").value = saved;
});
