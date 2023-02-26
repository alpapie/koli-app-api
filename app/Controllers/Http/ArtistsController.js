"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Artist"));
class ArtistsController {
    async index() {
        let artists = await Artist_1.default.query().select('artist_nom', 'image').limit(18).orderBy('id', 'desc').groupBy('artist_nom');
        return artists;
    }
    async search({ request }) {
        let artists = await Artist_1.default.query().where('artist_nom', 'LIKE', '%' + request.input('artist') + '%').limit(24).orderBy('id', 'desc');
        return artists;
    }
}
exports.default = ArtistsController;
//# sourceMappingURL=ArtistsController.js.map