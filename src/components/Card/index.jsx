import React, { useState } from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";
import { addToCart } from "../../api/clothes";
import { useAuth } from "../../hooks/useAuth";

function Card({ id, title, imageurl, price, options, onPlus, loading = false }) {
  const user = useAuth();

  const [clotheActiveOptions, setClotheActiveOptions] = useState({ size: null })
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <img width="100%" height={135} src={imageurl} alt="Sneakers" />
          <h5>{title}</h5>
          <div>
            <span>Размеры:</span>
            <ul className={styles.colors} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {options.map(({ size, count }, index) => (
                <li
                  key={index}
                >
                  <button
                    disabled={count === 0}
                    onClick={() => setClotheActiveOptions({ ...clotheActiveOptions, size })}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: clotheActiveOptions.size === size ? "#9dd558" : "",
                      color: clotheActiveOptions.size === size ? "white" : ""
                    }}
                  >
                    {size}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} тенге.</b>
            </div>
            {onPlus && (
              <img
                className={styles.plus}
                onClick={() => addToCart({id, options}, user?.uid, clotheActiveOptions.size  )}
                src={false ? "img/btn-checked.svg" : "img/btn-plus.svg"}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
