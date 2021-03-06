const basicUrl = (prefix) => `https://${prefix}.dev.taskware.io`;

export default {
  admin: {
    loginOk: "admin@test.com",
    loginWrong: "admin12@test.com",
    passwordOk: "Qwerty1!",
    passwordWrong: "Qwerrty1!",
    url: basicUrl("admin"),
  },
  client: {
    loginOk: "literij726@vreagles.com",
    loginWrong: "literiiij726@vreagles.com",
    passwordOk: "Anna_9212",
    passwordWrong: "Anna_921222",
    url: basicUrl("client"),
  },
  helper: {
    loginOk: "ximofaj797@whipjoy.com",
    loginWrong: "ximofaj79997@whipjoy.com",
    passwordOk: "Test_123",
    passwordWrong: "Test_123333",
    url: basicUrl("helper"),
  },
};
