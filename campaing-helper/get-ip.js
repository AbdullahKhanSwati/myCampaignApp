// Utility script to get your current local IP address
// Run with: node get-ip.js

const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          interface: name,
          address: iface.address,
          netmask: iface.netmask
        });
      }
    }
  }

  return addresses;
}

const ips = getLocalIP();

if (ips.length === 0) {
  console.log('❌ No network interfaces found. Make sure you are connected to WiFi.');
  process.exit(1);
}

console.log('\n📡 Your current IP addresses:\n');
ips.forEach((ip, index) => {
  console.log(`   ${index + 1}. ${ip.address} (${ip.interface})`);
});

// Usually the first one is the WiFi IP
const wifiIP = ips[0].address;
console.log(`\n✅ Recommended IP: ${wifiIP}`);
console.log(`\n📝 Update BaseUrl.js with:`);
console.log(`   const BaseUrl = "http://${wifiIP}:5000/api/v1";\n`);

