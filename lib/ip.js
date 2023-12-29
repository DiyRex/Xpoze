import { networkInterfaces } from 'os';

function getLocalIPv4Address() {
  const interfaces = networkInterfaces();
  let ipv4Address = null;

  Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((iface) => {
      if (!iface.internal && iface.family === 'IPv4') {
        ipv4Address = iface.address;
      }
    });
  });

  return ipv4Address;
}

export default getLocalIPv4Address;
