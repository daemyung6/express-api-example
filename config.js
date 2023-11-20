const devMode = false;
const serverPort = 80;
const PUBLIC_HOST = 'localhost';
const LOCAL_HOST = 'localhost';


module.exports = {
    devMode: devMode,
    serverPort : serverPort,
    host: devMode 
        ? `${LOCAL_HOST}:${serverPort}`
        : `${PUBLIC_HOST}:${serverPort}`,
    schemes: 'http',
    jwtSecret:  //openssl genrsa 1024
`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMVuuUwY5rLclAr3
J/MXMcl5tv8SaF4987lmJF5Xg++riEn44vJP/M9TfdWwWwHUYMMbNeDe7f+E61Uf
rxrXRZPYxzzEts8a40U8mvf91BQXM1M2zlmquG8A/XmLxwtRoby9mC6KSa+NgAoU
0+9R+XB/gbys344pQ1CyIpk+cmflAgMBAAECgYEAtE/xb2x2lfgaRQGBPOR8FfPR
i5d2NkwCYdrFcFwhJSzV5ikmrAMdcwRfsl/EXiFm1gnt5Rf06R6uBypOtAbThR1e
bLVN4TK3F57hPbzYX7N2QsXc8XrUmND7Dtp9PL6ER1TsRgMDkLRQr/LN3WAUcgY2
Z5Nn9XHq7c45CrKiBukCQQD2cSiHyBzaIR2X7KEJFgA/U1STEaOS8xUQhbnImUme
lWbmAeWNs9jToSIaqM+DFJ7a8EtVmXSALuDdlCrcEVQXAkEAzRb3WhC4+Vat2XTY
N6cOU5gCsZiZNwtnGyC6elb7e9XYlk/hZiMCU7puHfOFgjlIOeeVe6XnLtbmRB/f
mY8VYwJALWUauig6aFPBR8Lmxu2ujfujkJOnNeJg9vIrDrBtxzBuC+A9kKSYRCNi
TNbboqGhwWKR/eqOcy4vbaFlY7QtcQJBAMp1OYk3qOK7prNcnXWS/JmZHk+jjNzB
7O7iyDOtWmVNHZqFEMV7Gfj9uWbn14xOb/Z5nx+JD0c17eqibGFy1nECQFEEBUZH
kkQYVH3SRlpns9xVlm0APnhXSIgwddgOHH9FknZRpKY1lHJFKFOn2MPzlKwILw0K
vEV4h3TBHRExdk4=
-----END PRIVATE KEY-----`,
    jwt_alg: 'RS256',
    jwt_alive_time: 60 * 60 * 24, //하루 
}