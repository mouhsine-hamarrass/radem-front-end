/**
 * Created by yduartep on 3/2/2017.
 */
module.exports = function () {
  var faker = require("faker");

  return {
    token: [{
      "id": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "accessToken": "a61afd98-8e9e-4f16-9366-31abcc0bb522",
      "tokenType": "Bearer",
      "refreshToken": faker.random.uuid(),
      "expiresIn": 43199,
      "scope": "openid"
    }]
  }
};
