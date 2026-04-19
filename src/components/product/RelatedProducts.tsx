import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string | null;
}

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section style={{ padding: "80px 40px", background: "var(--bg-2)" }}>
      <div style={{ marginBottom: 40 }}>
        <div className="mono eyebrow" style={{ marginBottom: 10 }}>
          També de la mateixa família
        </div>
        <div className="serif" style={{ fontSize: 44 }}>
          Continua passejant
        </div>
      </div>

      <div className="grid-4">
        {products.map((p) => (
          <div key={p.id} className="sc-product-card">
            <Link href={`/products/${p.id}`} style={{ textDecoration: "none" }}>
              <div style={{ aspectRatio: "4/5", position: "relative", overflow: "hidden" }}>
                {p.images[0] ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div className="ph" style={{ width: "100%", height: "100%" }} />
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginTop: 12,
                }}
              >
                <span className="serif" style={{ fontSize: 20 }}>
                  {p.name}
                </span>
                <span className="mono" style={{ color: "var(--mute)", fontStyle: "italic", fontSize: 13 }}>
                  {p.category ? `${p.category} · ` : ""}
                  {p.price.toFixed(2)} €
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
