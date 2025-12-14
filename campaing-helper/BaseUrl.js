// ⚠️ IMPORTANT: Update this IP when you switch WiFi networks!
// 
// Network Configuration Guide:
// 1. Android Emulator: Use 10.0.2.2 (special IP for host machine)
// 2. Physical Android Device: Use your computer's IP (see below)
// 3. iOS Simulator: Use localhost or 127.0.0.1
// 4. Physical iOS Device: Use your computer's IP (see below)
//
// 🔍 How to find your current IP:
//   Windows: Run 'ipconfig' in terminal, look for "IPv4 Address"
//   Mac/Linux: Run 'ifconfig' or 'ip addr', look for inet address
//   Or run: node get-ip.js (in this directory)
//
// 📱 When scanning QR code doesn't connect:
//   1. Make sure phone and computer are on the SAME WiFi network
//   2. Find your current IP (see above)
//   3. Update the IP below
//   4. Restart Expo (press 'r' in terminal or restart expo start)
//
// Current IP: UPDATE THIS WHEN YOU SWITCH NETWORKS
// ⬇️ Replace 192.168.100.3 with your current IP ⬇️

const BaseUrl = "http://192.168.100.3:5000/api/v1"; // ⚠️ UPDATE THIS IP!

// Alternative configurations (uncomment the one you need):
// const BaseUrl = "http://10.0.2.2:5000/api/v1"; // Android Emulator only
// const BaseUrl = "http://localhost:5000/api/v1"; // iOS Simulator only
// const BaseUrl = "https://my-campaign-app.vercel.app/api/v1"; // Production/Vercel

export default BaseUrl;