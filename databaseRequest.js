const client = require('./index.js')
const { Local_User, syncDatabase } = require('./database');
const { Collection } = require("discord.js");

var UserCache = new Collection();

Reflect.defineProperty(UserCache, "getConfig", {
    /**
     * @param {number} user_id User ID
     * @returns {Model} new User
     */
    value: async function(user_id) {
        var guild_user = UserCache.get({ user_id: user_id });
        if (!guild_user) guild_user = await Local_User.findOne({ where: { user_id: user_id } });
        if (!guild_user) {
            guild_user = await Local_User.create({ user_id: user_id });
            UserCache.set({ user_id: user_id }, guild_user);
        }
        return guild_user;
    }
});


client.database = { UserCache };

module.exports = () => console.log("Database ready");