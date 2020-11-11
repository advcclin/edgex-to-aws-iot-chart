# edgex-to-aws-iot-chart
Set your aws configuration in app.js.
<pre><code>
const aws_config = {
      keyPath: "certs/xxx-private.pem.key",
      certPath: "certs/xxx-certificate.pem.crt",
      caPath: "certs/root-CA.crt",
      clientId: "sdk-nodejs-xxxxxx",
      region: "",
      baseReconnectTimeMs: 4000,
      keepalive: 300,
      protocol: "mqtts",
      port: 8883,
      host: "xxx.iot.your_region.amazonaws.com",
      debug: false
};
</code></pre>
