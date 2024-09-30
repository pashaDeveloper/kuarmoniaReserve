// pages/api/collect.js
import connectDB from '@/libs/db';
import UserLog from '@/models/userLog.model';
import geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, pageUrl, interaction } = req.body;
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      'unknown';
    const userAgentString = req.headers['user-agent'] || 'unknown';
    const referrer = req.headers['referer'] || 'direct';

    // پردازش User-Agent
    const parser = new UAParser(userAgentString);
    const uaResult = parser.getResult();
    const deviceType = uaResult.device.type || 'desktop';

    // پردازش GeoIP
    const geo = geoip.lookup(ipAddress) || {};

    // بررسی کشور کاربر
    const specialCountries = ['IR', 'TR', 'CA']; // کدهای ISO کشورهای ایران، ترکیه و کانادا
    const isFromSpecialCountry = specialCountries.includes(geo.country);

    // ساختار داده برای ذخیره‌سازی
    const logData = {
      userId: userId || null,
      ipAddress,
      deviceIp: req.headers['x-forwarded-for'] || ipAddress, // فرض می‌کنیم deviceIp همان ipAddress است
      userAgent: userAgentString,
      referrer,
      pageUrl,
      deviceType,
      geoLocation: {
        country: geo.country || 'unknown',
        region: geo.region || 'unknown',
        city: geo.city || 'unknown',
        lat: geo.ll ? geo.ll[0] : 0,
        lon: geo.ll ? geo.ll[1] : 0,
      },
      isFromSpecialCountry,
      interaction: interaction || {},
    };

    try {
      await connectDB();
      const log = new UserLog(logData);
      await log.save();
      res.status(200).json({ success: true, message: 'Data collected successfully' });
    } catch (error) {
      console.error('Error collecting data:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
