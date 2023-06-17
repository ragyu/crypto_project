const rsa = forge.pki.rsa;
let caPublicKey;
let caPrivatekey;
let userPublicKey;
let userCert;

function ca_Key() {
  const select = document.getElementById('keyLength_ca');
  const caValue = select.options[select.selectedIndex].value;
  let caKeySize;
  if (caValue == 1) {
    caKeySize = 1024;
  } else if (caValue == 2) {
    caKeySize = 2048;
  } else if (caValue == 3) {
    caKeySize = 3072;
  } else if (caValue == 4) {
    caKeySize = 4096;
  }
  const caKeypair = rsa.generateKeyPair(caKeySize);
  caPublicKey = caKeypair.publicKey;
  caPrivateKey = caKeypair.privateKey;
  document.getElementById('publicKey_ca').value =
    forge.pki.publicKeyToPem(caPublicKey);
  document.getElementById('privateKey_ca').value =
    forge.pki.privateKeyToPem(caPrivateKey);
}

function ca_Cert() {
  const cert = forge.pki.createCertificate();
  cert.publicKey = caPublicKey;
  cert.serialNumber = document.getElementById('serialNumber_ca').value;
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
  const caAttrs = [
    {
      name: 'commonName',
      shortName: 'CN',
      value: document.getElementById('commonName_ca').value,
    },
    {
      name: 'countryName',
      shortName: 'C',
      value: document.getElementById('countryName_ca').value,
    },
    {
      name: 'stateOrProvinceName',
      shortName: 'ST',
      value: document.getElementById('stateOrProvinceName_ca').value,
    },
    {
      name: 'localityName',
      shortName: 'L',
      value: document.getElementById('localityName_ca').value,
    },
    {
      name: 'organizationName',
      shortName: 'O',
      value: document.getElementById('organizationName_ca').value,
    },
    {
      name: 'organizationalUnitName',
      shortName: 'OU',
      value: document.getElementById('organizationalUnitName_ca').value,
    },
  ];
  cert.setSubject(caAttrs);
  cert.setIssuer(caAttrs);
  cert.setExtensions([
    {
      name: 'basicConstraints',
      cA: true,
    },
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true,
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 6,
          value: 'http://example.org/webid#me',
        },
        {
          type: 7,
          ip: '127.0.0.1',
        },
      ],
    },
    {
      name: 'subjectKeyIdentifier',
    },
  ]);

  cert.sign(caPrivateKey);

  caCert = cert;
  document.getElementById('cert_ca').value = forge.pki.certificateToPem(cert);
  document.getElementById('verified_ca').value = cert.verify(cert);
}

function user_Key() {
  const select = document.getElementById('keyLength_user');
  const userValue = select.options[select.selectedIndex].value;
  let userKeySize;
  if (userValue == 1) {
    userKeySize = 1024;
  } else if (userValue == 2) {
    userKeySize = 2048;
  } else if (userValue == 3) {
    userKeySize = 3072;
  } else if (userValue == 4) {
    userKeySize = 4096;
  }
  const userKeypair = rsa.generateKeyPair(userKeySize);
  userPublicKey = userKeypair.publicKey;
  userPrivateKey = userKeypair.privateKey;
  document.getElementById('publicKey_user').value =
    forge.pki.publicKeyToPem(userPublicKey);
  document.getElementById('privateKey_user').value =
    forge.pki.privateKeyToPem(userPrivateKey);
}

function user_Cert() {
  const cert = forge.pki.createCertificate();
  cert.publicKey = userPublicKey;
  cert.serialNumber = document.getElementById('serialNumber_user').value;
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
  const userAttrs = [
    {
      name: 'commonName',
      shortName: 'CN',
      value: document.getElementById('commonName_user').value,
    },
    {
      name: 'countryName',
      shortName: 'C',
      value: document.getElementById('countryName_user').value,
    },
    {
      name: 'stateOrProvinceName',
      shortName: 'ST',
      value: document.getElementById('stateOrProvinceName_user').value,
    },
    {
      name: 'localityName',
      shortName: 'L',
      value: document.getElementById('localityName_user').value,
    },
    {
      name: 'organizationName',
      shortName: 'O',
      value: document.getElementById('organizationName_user').value,
    },
    {
      name: 'organizationalUnitName',
      shortName: 'OU',
      value: document.getElementById('organizationalUnitName_user').value,
    },
  ];

  const caAttrs = [
    {
      name: 'commonName',
      shortName: 'CN',
      value: caCert.subject.getField('CN').value,
    },
    {
      name: 'countryName',
      shortName: 'C',
      value: caCert.subject.getField('C').value,
    },
    {
      name: 'stateOrProvinceName',
      shortName: 'ST',
      value: caCert.subject.getField('ST').value,
    },
    {
      name: 'localityName',
      shortName: 'L',
      value: caCert.subject.getField('L').value,
    },
    {
      name: 'organizationName',
      shortName: 'O',
      value: caCert.subject.getField('O').value,
    },
    {
      name: 'organizationalUnitName',
      shortName: 'OU',
      value: caCert.subject.getField('OU').value,
    },
  ];
  cert.setSubject(userAttrs);
  cert.setIssuer(caAttrs);
  cert.setExtensions([
    {
      name: 'basicConstraints',
      cA: false,
    },
    {
      name: 'keyUsage',
      keyCertSign: true,
      digitalSignature: true,
      nonRepudiation: true,
      keyEncipherment: true,
      dataEncipherment: true,
    },
    {
      name: 'extKeyUsage',
      serverAuth: true,
      clientAuth: true,
      codeSigning: true,
      emailProtection: true,
      timeStamping: true,
    },
    {
      name: 'nsCertType',
      client: true,
      server: true,
      email: true,
      objsign: true,
      sslCA: true,
      emailCA: true,
      objCA: true,
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 6,
          value: 'http://example.org/webid#me',
        },
        {
          type: 7,
          ip: '127.0.0.1',
        },
      ],
    },
    {
      name: 'subjectKeyIdentifier',
    },
  ]);

  cert.sign(caPrivateKey);

  userCert = cert;
  document.getElementById('cert_user').value = forge.pki.certificateToPem(cert);
  document.getElementById('verified_user').value = caCert.verify(cert);
}
