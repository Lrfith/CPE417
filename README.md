
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# CPE417 - Virualization in Cloud Computing

รายละเอียด: โครงงานนี้ให้นักศึกษาสร้งาระบบสำหรับ...

สิ่งที่ได้เรียนรู้: ...
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## API Reference
# 🐾 Cat Adoption Project API Endpoints

## Authentication

| Endpoint              | Method | Description                   | Body                                                                 |
|----------------------|--------|-------------------------------|----------------------------------------------------------------------|
| `/api/register`       | POST   | Register new user             | `{ "username": "tam", "password": "1234", "phone": "0123456789" }` |
| `/api/login`          | POST   | Login user                    | `{ "username": "tam", "password": "1234" }`                        |
| `/api/current-user`   | POST   | Get current user (need token) | None                                                                 |
| `/api/current-admin`  | POST   | Get current admin (need token + admin role) | None                                           |

---

## Cats

| Endpoint              | Method | Description                   | Body                                                                 |
|----------------------|--------|-------------------------------|----------------------------------------------------------------------|
| `/api/cats`           | GET    | Get all cats (with images, status) | None                                                              |
| `/api/cats/:id`       | GET    | Get single cat by ID          | None                                                                 |
| `/api/cats`           | POST   | Create new cat (admin only)   | `{ "name": "Milo", "age": 2, "gender": "Male", "breed": "Persian", "description": "Playful" }` |
| `/api/cats/:id`       | PUT    | Update cat info (admin only)  | `{ "status": "Adopted" }`                                           |
| `/api/cats/:id`       | DELETE | Delete cat (admin only)       | None                                                                 |

---

## Images

| Endpoint                         | Method | Description              | Body                                                                 |
|---------------------------------|--------|--------------------------|----------------------------------------------------------------------|
| `/api/cats/:catId/images`        | POST   | Add image to cat (admin only) | `{ "asset_id": "...", "public_id": "...", "url": "https://..." }` |
| `/api/cats/:catId/images`        | GET    | Get all images for a cat | None                                                                 |
| `/api/images/:imageId`           | DELETE | Delete image by ID (admin only) | None                                                              |

---

## Adoptions

| Endpoint              | Method | Description             | Body                 |
|----------------------|--------|-------------------------|--------------------|
| `/api/adoptions`      | POST   | Request adoption (user) | `{ "cat_id": 5 }`  |
| `/api/adoptions`      | GET    | Get all adoptions (admin only) | None           |
| `/api/adoptions/:id`  | GET    | Get adoption details    | None                |
| `/api/adoptions/:id`  | PUT    | Update adoption status (admin only) | `{ "status": "Approved" }` |

---

## User Management

| Endpoint                     | Method | Description                  | Body                                                                 |
|-------------------------------|--------|------------------------------|----------------------------------------------------------------------|
| `/api/users`                  | GET    | Get all users (admin only)  | None                                                                 |
| `/api/change-role`            | POST   | Change user role (admin only) | `{ "id": 1, "role": "admin" }`                                     |
| `/api/user/addresses`         | POST   | Add address for user        | `{ "street": "123 Main St", "city": "Bangkok", "state": "TH", "postal_code": "10110", "country": "Thailand" }` |
| `/api/user/addresses`         | GET    | Get user addresses          | None                                                                 |



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Lessons Learned

What did you learn while building this project? What challenges did you face and how did you overcome them?


## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)


