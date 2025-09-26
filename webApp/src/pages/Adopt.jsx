import React from 'react'

const Adopt = () => {
  return (
    <div>

      {/* Adoption Highlight */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">แมวเป้าที่รอคุณอยู่</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 ">
            {[...Array(20).keys()].map((i) => (
              <div key={i} className="card bg-white shadow-xl hover:scale-110 hover:shadow-xl transition-transform">
                <figure>
                  <img
                    src={`src/assets/img/88bb64fc-4e99-4d4a-9be3-9a640f5d0571.jpeg`}
                    alt="pet"
                    className="h-60 w-full object-cover"
                  />
                </figure>
                <div className="card-body  text-left">
                  <h3 className="card-title ">นัทธมัม {i}</h3>
                  <p>เพศผู้ - อายุ {i + 1} ปี</p>
                  <p>location</p>
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nobis iusto, quod explicabo</p>
                  <p style={{ color: "gray" }}>DD/MM/YYYY</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Adopt