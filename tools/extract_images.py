"""
extract_images.py — 기계학습 강의 PDF에서 페이지별 이미지 추출

사용법:
    pip install pymupdf
    python extract_images.py

결과: mock-exam/assets/images/_raw/ 폴더에 weekN_pXX.png 형태로 저장됨.
이후 사람(또는 AI)이 필요한 페이지를 골라 assets/images/로 이동하고
의미 있는 파일명으로 리네이밍하면 된다.

- 입력: C:\\Users\\User\\AppData\\Roaming\\alt\\data\\storage\\slides\\BRI507_IntroML_{2~7}_*.pdf
- 출력: mock-exam/assets/images/_raw/{week}_pNN.png
- DPI: 150 (적당한 해상도와 파일 크기 균형)
"""

import os
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("[!] PyMuPDF가 설치되지 않았습니다.")
    print("    실행: pip install pymupdf")
    sys.exit(1)

# ── 경로 설정 ─────────────────────────────────────────────
SLIDES_DIR = Path(r"C:\Users\User\AppData\Roaming\alt\data\storage\slides")
SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR.parent / "assets" / "images" / "_raw"

# ── PDF → 주차 매핑 ───────────────────────────────────────
PDFS = {
    "BRI507_IntroML_2_Intro.pdf":          "week2",
    "BRI507_IntroML_3_Discriminative-1.pdf": "week3",
    "BRI507_IntroML_4_Generative-2.pdf":   "week4",
    "BRI507_IntroML_5_Nonparametric.pdf":  "week5",
    "BRI507_IntroML_6_SVM.pdf":            "week6",
    "BRI507_IntroML_7_Evaluation.pdf":     "week7",
}

DPI = 150


def extract_pdf_pages(pdf_path: Path, tag: str, output_dir: Path) -> int:
    """PDF의 각 페이지를 PNG로 렌더링해 저장. 생성된 페이지 수 반환."""
    try:
        doc = fitz.open(str(pdf_path))
    except Exception as e:
        print(f"  [!] 열기 실패: {pdf_path.name} ({e})")
        return 0

    count = 0
    for page_no, page in enumerate(doc, start=1):
        try:
            pix = page.get_pixmap(dpi=DPI)
            out_file = output_dir / f"{tag}_p{page_no:02d}.png"
            pix.save(str(out_file))
            count += 1
        except Exception as e:
            print(f"  [!] 페이지 {page_no} 저장 실패: {e}")

    doc.close()
    return count


def main() -> None:
    # Windows cp949 콘솔 호환: stdout을 utf-8로 재래핑
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"[>] Output folder: {OUTPUT_DIR}")

    total_pages = 0
    missing = []

    for pdf_name, tag in PDFS.items():
        pdf_path = SLIDES_DIR / pdf_name
        if not pdf_path.exists():
            print(f"[!] File not found: {pdf_name}")
            missing.append(pdf_name)
            continue

        print(f"[+] {pdf_name} -> {tag}")
        pages = extract_pdf_pages(pdf_path, tag, OUTPUT_DIR)
        total_pages += pages
        print(f"    [OK] {pages} pages saved")

    print()
    print(f"완료: 총 {total_pages} 페이지 저장")
    if missing:
        print(f"누락된 PDF: {missing}")
        print("누락된 파일은 원본 경로를 확인해주세요.")

    print()
    print("다음 단계:")
    print(f"  1. {OUTPUT_DIR} 폴더를 열어 필요한 슬라이드(예: ROC Curve, Confusion Matrix,")
    print("     LDA 결정경계, L1/L2 기하학 등) 파일을 고른다.")
    print("  2. 의미 있는 이름으로 리네이밍하고 assets/images/ 로 이동한다.")
    print("  3. questions.js의 해당 문제 image 필드에 경로를 연결한다.")


if __name__ == "__main__":
    main()
