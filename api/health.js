export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    service: 'Zippix Web Cloner Cloud',
    version: '2.0.0',
    platform: 'Vercel Serverless',
  });
}
