const axios = require('axios');

const url = 'http://10.167.95.19:8001/api/extra/fc/getReportData';
// const url = 'http://beidou.58corp.com/api/extra/fc/getReportData';

axios
  .post(url, {
    projectId: 195,
    token: 'qnjsAYAu7oJAdbC17R26eSfZUk1xl0et',
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.error(error);
  });
