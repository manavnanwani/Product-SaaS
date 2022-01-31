const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { userID } = ctx.params;

    const entity = await strapi.services.cart.find({ userID });
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },

  async findCart(ctx) {
    const { userEmail, OTP } = ctx.params;

    const entity = await strapi.services.cart.find({ userEmail, OTP });
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },
};
