#!/usr/bin/env python3
"""DNA相補鎖計算の基準実装"""

DNA_COMPLEMENT = str.maketrans({
    "A": "T",
    "T": "A",
    "G": "C",
    "C": "G",
})

def normalize_fasta(text: str) -> str:
    """FASTAまたは素の配列からDNA配列だけを取り出す。"""
    lines = text.replace("\r", "").split("\n")
    lines = [line for line in lines if not line.strip().startswith(">")]
    return "".join("".join(lines).split()).upper()

def validate_dna(seq: str) -> None:
    invalid = sorted(set(seq) - set("ATGC"))
    if not seq:
        raise ValueError("DNA配列が空です。")
    if invalid:
        raise ValueError(f"A/T/G/C以外の文字があります: {', '.join(invalid)}")

def complement(seq: str) -> str:
    seq = normalize_fasta(seq)
    validate_dna(seq)
    return seq.translate(DNA_COMPLEMENT)

def reverse_complement(seq: str) -> str:
    return complement(seq)[::-1]

def gc_percent(seq: str) -> float:
    seq = normalize_fasta(seq)
    validate_dna(seq)
    return (seq.count("G") + seq.count("C")) / len(seq) * 100

if __name__ == "__main__":
    sample = """>Sample_01
ATGCCGTAGCTA
"""
    seq = normalize_fasta(sample)
    print("入力:", seq)
    print("相補鎖:", complement(seq))
    print("逆相補鎖:", reverse_complement(seq))
    print("長さ:", len(seq), "bp")
    print("GC%:", round(gc_percent(seq), 2))
