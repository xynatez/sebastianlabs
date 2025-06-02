from fpdf import FPDF
from fpdf.enums import XPos, YPos
from pathlib import Path
import os
import requests

FONT_FILE = "DejaVuSans.ttf"
FONT_URL = "https://github.com/dejavu-fonts/dejavu-fonts/raw/master/ttf/DejaVuSans.ttf"

def download_font_if_needed():
    if not Path(FONT_FILE).exists():
        print("Mengunduh font Unicode...")
        try:
            r = requests.get(FONT_URL, timeout=30)
            r.raise_for_status()
            with open(FONT_FILE, "wb") as f:
                f.write(r.content)
            print("Font berhasil diunduh.")
        except Exception as e:
            print(f"Gagal mengunduh font: {e}")
            if Path(FONT_FILE).exists():
                os.remove(FONT_FILE)
            exit(1)

class PDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_page()
        self.set_auto_page_break(auto=True, margin=15)

        self.add_font("DejaVu", "", FONT_FILE)
        self.set_font("DejaVu", size=10)

    def add_title(self, title):
        self.set_font("DejaVu", style="B", size=11)
        self.multi_cell(0, 8, title, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        self.set_font("DejaVu", size=10)

    def add_code(self, code):
        max_chars_per_line = 120
        for line in code.splitlines():
            while len(line) > max_chars_per_line:
                self.multi_cell(0, 5, line[:max_chars_per_line], new_x=XPos.LMARGIN, new_y=YPos.NEXT)
                line = line[max_chars_per_line:]
            self.multi_cell(0, 5, line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

def list_files(base_path):
    return [f for f in base_path.rglob("*") if f.is_file()]

def main():
    download_font_if_needed()
    base_path = Path(".").resolve()
    pdf = PDF()

    for filepath in list_files(base_path):
        try:
            if filepath.suffix.lower() in [".py", ".txt", ".md", ".html", ".js", ".css", ".json"]:
                relative_path = filepath.relative_to(base_path)
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                pdf.add_title(f"\n== {relative_path} ==")
                pdf.add_code(content)
        except Exception as e:
            print(f"Gagal membaca {filepath}: {e}")

    output_file = "isi_direktori.pdf"
    pdf.output(output_file)
    print(f"PDF berhasil disimpan sebagai: {output_file}")

if __name__ == "__main__":
    main()
