import React, { useEffect } from "react";
import useWebStore from "../store/web-store"; // ปรับ path ตามที่คุณเก็บ store

const Home = () => {
  const cats = useWebStore((state) => state.fetchCats); // array แมว
  const fetchCats = useWebStore((state) => state.getCats); // function ดึงแมว

  useEffect(() => {
    fetchCats(); // โหลดข้อมูลเมื่อ component mount
  }, [fetchCats]);

  return (
    <div>
      {/* Hero */}
      <div
        className="hero min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('./coverpage.png')" }}
      >
        <div className="hero-overlay bg-gradient-to-b from-black/5 via-black/5 to-black/40"></div>

        <div className="hero-content text-center text-white px-4">
          <div className="max-w-3xl animate-fadeInUp">
            <h1 className="mb-5 text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
              Maow Pao by ExtendX
            </h1>
            <p className="mb-8 text-lg md:text-xl lg:text-2xl drop-shadow-md">
              รวมทุกน้องแมวจรที่รอครอบครัวใหม่ พร้อมให้คุณแบ่งปันความรัก
            </p>
            <a
              href="#Features"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold rounded-full bg-white text-blue-600 hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 hover:text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              🚀 เริ่มต้นเลย
            </a>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="Features" className="py-20 bg-gradient-to-br from-gray-200 via-white to-gray-200">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4 text-blue-600">
            สิ่งที่เรามีให้คุณ
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            เว็บของเราถูกสร้างขึ้นเพื่อเป็นพื้นที่กลางในการช่วยเหลือสัตว์จรจัด 🐾
            ไม่ว่าคุณจะอยากรับเลี้ยง ช่วยเหลือ หรือร่วมสนับสนุน เรามีทุกสิ่งที่คุณต้องการในที่เดียว
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Adopt */}
            <div className="card bg-white shadow-lg rounded-2xl p-5 border-t-4 border-t-blue-600">
              <div className="text-5xl mb-4">🐶</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Adopt</h3>
              <p className="text-gray-600 mb-3">
                ค้นหาสัตว์เลี้ยงที่รอคอยบ้านใหม่ พร้อมข้อมูลการดูแลที่เหมาะสม
              </p>
              <a href="/adopt" className="text-blue-500 font-medium hover:underline">
                เริ่มต้นการอุปการะ →
              </a>
            </div>

            {/* Rescue */}
            <div className="card bg-white shadow-lg rounded-2xl p-5 border-t-4 border-t-blue-600 ">
              <div className="text-5xl mb-4">🚑</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Rescue</h3>
              <p className="text-gray-600 mb-3">
                แจ้งเหตุและเข้าร่วมช่วยเหลือสัตว์ที่ต้องการความช่วยเหลืออย่างเร่งด่วน
              </p>
              <a href="/adopt" className="text-blue-500 font-medium hover:underline">
                ดูวิธีการช่วยเหลือ →
              </a>
            </div>

            {/* Donate */}
            <div className="card bg-white shadow-lg rounded-2xl p-5 border-t-4 border-t-blue-600">
              <div className="text-5xl mb-4">💖</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Donate</h3>
              <p className="text-gray-600 mb-3">
                สนับสนุนค่าอาหาร ยารักษา และค่าใช้จ่ายในการดูแลสัตว์
              </p>
              <a href="/adopt" className="text-blue-500 font-medium hover:underline">
                ร่วมสมทบทุน →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Adoption Highlight */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-pink-600">😺 แมวเป้าที่รอคุณอยู่ 😺</h2>
          <div className="flex item-right text-xl mb-5 justify-end">
            <a href="/adopt" className="link link-hover text-purple-500">ดูทั้งหมด | View All</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {cats.length === 0 ? (
              <p>⏳ กำลังโหลดข้อมูล...</p>
            ) : (
              cats.slice(0, 5).map((cat) => (
                <div
                  key={cat.cat_id}
                  className="card rounded-2xl bg-white shadow-xl hover:scale-110 hover:shadow-xl transition-transform"
                >
                  <figure>
                    <img
                      src={
                        Array.isArray(cat.images) && cat.images.length > 0
                          ? cat.images[0].url
                          : "https://placehold.co/300x200?text=No+Image"
                      }
                      alt={cat.name}
                      className="h-60 w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow">
                      NEW
                    </div>
                  </figure>
                  <div className="card-body text-left">
                    <h3 className="card-title">{cat.name}</h3>
                    <p>{cat.gender} - อายุ {cat.age} ปี</p>
                    <p>{cat.description}</p>
                    <p style={{ color: "gray" }}>
                      {cat.created_at
                        ? new Date(cat.created_at).toLocaleDateString("th-TH")
                        : ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-indigo-500 via-blue-700 to-indigo-500 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 drop-shadow-lg">
          พร้อมจะเป็นบ้านใหม่ให้พวกเขาไหม? 🐾
        </h2>
        <a
          href="/adopt"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xl font-bold rounded-full bg-white text-primary hover:bg-gradient-to-r hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 hover:text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          🏠 เริ่มอุปการะเลย
        </a>
      </section>
    </div>
  );
};

export default Home;
