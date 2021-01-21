export default {
  port: process.env.PORT || 9015,
  dialerAPI: process.env.IS_PROD === 'true' ? 'http://localhost:9011/call-center-dialer/api/v1' : 'http://192.168.8.30:9011/call-center-dialer/api/v1'
}
