# MyLocale 📍

MyLocale is a React Native mobile application that makes it simple to **create, discover, and RSVP to local events**.  
It provides a clean event management workflow — from adding event details and cover images to picking precise dates, times, and locations.  

---

## ✨ Features

- **User Authentication** (via AuthProvider context)  
- **Create Events**
  - Add event name, description, capacity, and cover image
  - Pick event location with autocomplete search
  - Select event date, start time, and end time
- **Event Discovery**
  - Scrollable event list
  - Detailed event modal with cover image, description, organiser info
- **RSVP System**
  - Reserve a spot for an event with capacity checks
  - View RSVP status instantly
- **State Management**
  - Built with Zustand for user/event stores

---

## 📸 Screenshots
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 46 49" src="https://github.com/user-attachments/assets/1c0bd598-d8c0-4390-92e3-754e9793f35f" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 47 05" src="https://github.com/user-attachments/assets/9e0f2a63-f229-4597-a276-30805472ae77" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 47 09" src="https://github.com/user-attachments/assets/841b56c8-0477-4e28-acc9-43104ec9ec49" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 47 19" src="https://github.com/user-attachments/assets/ea84b618-dbb4-4430-a3a1-10656b4ce0d0" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 47 13" src="https://github.com/user-attachments/assets/a642c7e5-57bd-4fb8-b088-9da26a465371" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 48 10" src="https://github.com/user-attachments/assets/14509c17-f429-4dfc-915e-01bdcba70c35" />
<img width="129" height="279" alt="Simulator Screenshot - iPhone 16 Plus - 2025-09-06 at 19 48 04" src="https://github.com/user-attachments/assets/dc563231-c29d-49b8-8d30-6c9565dcb721" />


---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **TypeScript**
- **Zustand** – state management  
- **Supabase – authentication & storage
- **Custom APIs** – event creation & reservations
- **react-native-modal-datetime-picker** – date & time selection
- **expo-image-picker** – image uploads  

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- Expo CLI  
- Yarn or npm  

### Installation
```bash
# Clone the repo
git clone https://github.com/jayantbhoj/mylocale.git

# Install dependencies
cd mylocale
npm install
