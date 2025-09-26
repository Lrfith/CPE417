import React from "react";
import { Link } from "react-router-dom";

const HomeUser = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex flex-col">

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="card bg-white shadow-xl rounded-2xl p-6 hover:scale-[1.02] transition">
          <div className="flex flex-col items-center">
            <img
              src="https://i.pravatar.cc/250"
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md"
            />
            <h2 className="mt-4 text-xl font-bold text-gray-800">John Doe</h2>
            <p className="text-gray-500 text-sm">johndoe@email.com</p>
            <p className="mt-2 text-sm text-gray-600 text-center">
              🌟 สมาชิกมาตั้งแต่ปี 2024  
              แชร์ความคิด และอัปเดตข้อมูลได้ที่นี่
            </p>
          </div>
        </div>

        {/* Post Box */}
        <div className="lg:col-span-2 card bg-white shadow-xl rounded-2xl p-6 hover:scale-[1.01] transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">✍️ โพสต์อะไรบางอย่าง</h3>
          <textarea
            placeholder="คุณกำลังคิดอะไรอยู่..."
            className="textarea textarea-bordered w-full rounded-xl mb-4"
            rows="4"
          ></textarea>
          <div className="flex justify-end">
            <button className="btn btn-primary rounded-full px-6">โพสต์</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🚀 เมนูลัด</h3>
          <div className="flex flex-col gap-3">
            <Link to="/posts" className="btn btn-outline rounded-full">
              ดูโพสต์ทั้งหมด
            </Link>
            <Link to="/friends" className="btn btn-outline rounded-full">
              รายชื่อเพื่อน
            </Link>
            <Link to="/notifications" className="btn btn-outline rounded-full">
              การแจ้งเตือน
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
};

export default HomeUser;
