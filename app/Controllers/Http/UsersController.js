"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
const Artist_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Artist"));
const Koli_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Koli"));
const Pay_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Pay"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async login({ auth, request, response }) {
        const { email, password } = request.only(['email', 'password']);
        if (email && password) {
            try {
                const token = await auth.use('api').attempt(email, password, {
                    expiresIn: '5 days'
                });
                return response.json({
                    user: auth.user,
                    token,
                    status: true,
                });
            }
            catch (error) {
                return { status: false, message: "Email ou mot de passe incorrect", };
            }
        }
        return { status: false, message: "Email ou mot de passe incorrect", };
    }
    async store({ request }) {
        let userdefaul = {
            email: "alpapie0908@gmail.com",
            password: "alpapie",
            name: "Mamoudou ndiaye",
        };
        let userData = request.only(['name', 'email', 'password']) || userdefaul;
        const user = await User_1.default.create(userData);
        await user.save();
        return user;
    }
    async auth({ response, auth }) {
        try {
            await auth.use('api').authenticate();
            return response.json({ status: true });
        }
        catch (error) {
            return response.json({ status: false });
        }
    }
    async logout({ auth }) {
        await auth.use('api').revoke();
        auth.logout();
        return {
            revoked: true
        };
    }
    async destroy({ request }) {
        let koli = await Koli_1.default.find(request.param('id'));
        if (koli) {
            let artist = await Artist_1.default.find(koli?.artists_id);
            let pays = await Pay_1.default.find(koli?.pays_id);
            let imgpath = artist?.image || "";
            let audiopath = koli?.audio || "";
            imgpath = imgpath.split('/').splice(2).join('/');
            audiopath = audiopath.split('/').splice(2).join('/');
            if (await Drive_1.default.exists(imgpath) && await Drive_1.default.exists(audiopath)) {
                await koli?.delete();
                await pays?.delete();
                await artist?.delete();
                await Drive_1.default.delete(audiopath);
                await Drive_1.default.delete(imgpath);
                return { success: true };
            }
            return { success: false };
        }
        return { success: false };
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map