'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Calculator.module.scss"


type Option = { label: string; value: string };
type PrintColor = 
  "Черно-белая печать (1 сторона)" | 
  "Черно-белая печать (2 стороны)" | 
  "Цветная печать (1 сторона)" | 
  "Цветная печать (2 стороны)";
type Lumination = "С ламинацией" | "Без ламинации";
type Format = string;
type Material = string;
type Quantity = number | "";

const productOptions: Option[] = [
  { label: "Визитки", value: "cards" },
  { label: "Листовки", value: "flyers" },
  { label: "Буклеты", value: "booklets" },
  { label: "Каталоги", value: "catalogs" },
];

function MiniDropdown({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: Option[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = options.find(o => o.value === value)?.label ?? "";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") setOpen(v => !v);
  };

  return (
    <div className={styles.dd} ref={rootRef}>
      <button
        type="button"
        className={styles.ddButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        onKeyDown={onKeyDown}
      >
        <span className={selected ? styles.ddValue : styles.ddPlaceholder}>
          {selected || placeholder}
        </span>
        <span className={open ? styles.ddArrowOpen : styles.ddArrow} />
      </button>

      {open && (
        <ul className={styles.ddMenu} role="listbox">
          {options.map(opt => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className={styles.ddItem}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Calculator(){

    const router = useRouter();

    const [product, setProduct] = useState<string | null>(null);
    const [format, setFormat] = useState<Format>("");
    const [quantity, setQuantity] = useState<Quantity>("");
    const [material, setMaterial] = useState<Material>("");
    const [printColor, setPrintColor] = useState<PrintColor>("Черно-белая печать (1 сторона)");
    const [lumination, setLamination] = useState<Lumination>("С ламинацией");
    

    const options: { label: string; value: PrintColor }[] = [
        { label: "1+0 (ч/б)", value: "Черно-белая печать (1 сторона)" },
        { label: "1+1 (ч/б с двух сторон)", value: "Черно-белая печать (2 стороны)" },
        { label: "4+0 (цвет с одной)", value: "Цветная печать (1 сторона)" },
        { label: "4+4 (цвет с двух)", value: "Цветная печать (2 стороны)" },
    ];


    let consProduct = ""
    if (product == "cards"){consProduct = "визиток"}
    if (product == "flyers"){consProduct = "флаеров"}
    if (product == "booklets"){consProduct = "буклетов"}
    if (product == "catalogs"){consProduct = "каталогов"}

    return(
        <section className={styles.CalculatorSection}>
            <div className="container" style={{margin: "0 auto"}}>
                <h2>Расчитайте стоимость работы</h2>
                <p className={styles.ctaTitle}>Выберите основные параметры</p>

                <div className={styles.optionsGrid}>
                    <div className={styles.optionsRow}>
                        <MiniDropdown
                            placeholder="Изделие"
                            options={productOptions}
                            value={product}
                            onChange={setProduct}
                        />

                        <div className={styles.optionInput}>
                            <p>Формат</p>
                            <input type="text" 
                            placeholder="Визитка 90*50"
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            />
                        </div>

                        <div className={styles.optionInput}>
                            <p>Цветность печати</p>
                            {options.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                className={`${styles.segmentBtn} ${
                                printColor === opt.value ? styles.active : ""
                                }`}
                                onClick={() => setPrintColor(opt.value)}
                                aria-pressed={printColor === opt.value}
                            >
                                {opt.label}
                            </button>
                            ))}
                        </div>
                        
                    </div>

                    <div className={styles.optionsRow}>
                        <div className={styles.optionInput}>
                            <input type="text" 
                              placeholder="Тираж (шт)"
                              value={quantity}
                              inputMode="numeric"
                              onKeyDown={(e) => {
                                if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                  e.preventDefault();
                                }
                              }}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setQuantity(val === "" ? "" : Number(val));
                              }}
                            />
                        </div>
                        <div className={styles.optionInput}>
                            <p>Материал</p>
                            <input type="text" 
                              placeholder="Картон 300 гр."
                              value={material}
                              onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                        <div className={styles.optionInput}>
                            <p>Ламинация</p>
                            <div className={styles.Lamination}>
                              <button
                                  type="button"
                                  className={`${styles.segmentBtn} ${
                                  lumination === "С ламинацией" ? styles.active : ""
                                  }`}
                                  onClick={() => setLamination("С ламинацией")}
                                  aria-pressed={lumination === "С ламинацией"}
                              >
                                  С ламинацией
                              </button>
                              <button
                                  type="button"
                                  className={`${styles.segmentBtn} ${
                                  lumination === "Без ламинации" ? styles.active : ""
                                  }`}
                                  onClick={() => setLamination("Без ламинации")}
                                  aria-pressed={lumination === "Без ламинации"}
                              >
                                  Без ламинации
                              </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.optionsRow}>
                      <div className={styles.conclusion}>
                          <div>
                            <p className={styles.ctaTitle}>Итог:</p>
                          <div className={styles.line}/>
                          </div>
                          <div className={styles.conclusionText}>
                            <p>Печать и изготовление <b>{consProduct ? consProduct : "___"}</b></p>
                            <p><b>{quantity ? quantity : "___"}</b> шт.</p>
                            <p>Формат: <b>{format ? format : "___"}</b></p>
                            <p>Материал: <b>{material ? material : "___"}</b></p>
                            <p>Цветность печати: <br/> <b>{ printColor ? printColor : "___"}</b></p>
                            <p><b>{lumination}</b></p>
                          </div>
                      </div>
                      
                      <div className={styles.optionInput}>
                          <button
                              type="button"
                              className={`${styles.segmentBtn} ${styles.active} ${styles.submitBtn}`}
                              onClick={() => {
                                router.push("#");
                              }}
                          >
                              Заказать
                          </button>
                      </div>
                      
                        
                    </div>
                </div>

            </div>
        </section>
    );
}