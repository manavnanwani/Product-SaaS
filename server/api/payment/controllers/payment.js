var crypto = require("crypto");
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    const { data } = ctx.request.body;
    var { amount, name, emailId, productname, description } = data;
    var login = "9132";
    var pass = "Test@123";
    var prodid = "NSE";
    var ttype = "NBFundTransfer";
    var transid = "1000";
    var txncur = "INR";
    var custacc = "100000036600";
    var datepick = new Date(); // replace with current date

    var cc = "NAVIN";
    var final = new Buffer(cc).toString("base64"); // clientcode
    var url = `http://localhost:5000/Response/${data.OTP}`;
    var udf1 = name;
    var udf2 = emailId;
    var udf3 = productname;
    var udf4 = description;

    var key = "KEY123657234";
    var req_enc_key = "A4476C2062FFA58980DC8F79EB6A799E";
    var req_salt = "A4476C2062FFA58980DC8F79EB6A799E";
    var sign = login + pass + ttype + prodid + transid + amount + txncur;

    function sig(sign, key) {
      return crypto
        .createHmac("sha512", key)
        .update(new Buffer(sign, "utf-8"))
        .digest("hex");
    }
    var signature = sig(sign, key);
    var text =
      "login=" +
      login +
      "&pass=" +
      pass +
      "&ttype=" +
      ttype +
      "&prodid=" +
      prodid +
      "&amt=" +
      amount +
      "&txncurr=" +
      txncur +
      "&txnscamt=" +
      amount +
      "&clientcode=" +
      encodeURIComponent(final) +
      "&txnid=" +
      transid +
      "&date=" +
      datepick +
      "&custacc=" +
      custacc +
      "&udf1=" +
      udf1 +
      "&udf2=" +
      udf2 +
      "&udf3=" +
      udf3 +
      "&udf4=" +
      udf4 +
      "&ru=" +
      url +
      "&signature=" +
      signature +
      "";

    const algorithm = "aes-256-cbc";
    const password = Buffer.from(req_enc_key, "utf8");
    const salt = Buffer.from(req_salt, "utf8");
    const iv = Buffer.from(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "utf8"
    );

    const encrypt = (text) => {
      var derivedKey = crypto.pbkdf2Sync(password, salt, 65536, 32, "sha1");
      const cipher = crypto.createCipheriv(algorithm, derivedKey, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return `${encrypted.toString("hex")}`;
    };

    var encdata = encrypt(text);

    var options = {
      host: "https://paynetzuat.atomtech.in",
      path: "/paynetz/epi/fts?login=" + login + "&encdata=" + encdata,
    };
    url = options["host"] + options["path"];

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.payment.create(data, { files });
    } else {
      entity = await strapi.services.payment.create({
        ...ctx.request.body,
        paymentURL: url,
      });
    }
    return sanitizeEntity(entity, { model: strapi.models.payment });
  },
};
