import React, { useEffect } from "react";
import useWebStore from "../store/web-store";

const Adopt = () => {
  const cats = useWebStore((state) => state.fetchCats);   // array แมว
  const getCats = useWebStore((state) => state.getCats);  // function ดึงแมว

  useEffect(() => {
    getCats();
  }, [getCats]);

  return (
    <div>
      {/* Adoption Highlight */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">แมวเป้าที่รอคุณอยู่</h2>

          {cats.length === 0 ? (
            <p className="text-gray-500">ยังไม่มีแมวในระบบ</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {cats.map((cat) => (
                <div
                  key={cat.cat_id}
                  className="card bg-white shadow-xl hover:scale-105 hover:shadow-xl transition-transform"
                >
                  <figure>
                    <img
                      src={
                        Array.isArray(cat.images) && cat.images.length > 0
                          ? cat.images[0].url || cat.images[0].secure_url
                          : "https://placekitten.com/400/300"
                      }
                      alt={cat.name}
                      className="h-60 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body text-left">
                    <h3 className="card-title">{cat.name}</h3>
                    <p>
                      {cat.gender} - อายุ {cat.age} ปี
                    </p>
                    <p>{cat.description}</p>
                    <p className="text-gray-500">{cat.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Adopt;
