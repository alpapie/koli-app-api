"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Koli_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Koli"));
const Pay_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Pay"));
const Artist_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Artist"));
class KolisController {
    async index() {
        let kolis = await Koli_1.default.query()
            .preload('artist')
            .preload('pays').orderBy('id', 'desc').limit(12);
        return kolis;
    }
    async store({ request, response }) {
        let { titre, artist_nom, pays_name } = request.body();
        if (request.input("koli_secret_key") != "sanba_gueladiegui") {
            return response.json({ error: "vous avez acces a cette page", succes: false });
        }
        let file = request.file("koli", {
            size: '1000mb',
            extnames: ["mp3", "wav", "aac", "wma", "ogg", "flac", "alac", "aiff", "m4a", "opus"],
        });
        if (!file) {
            return response.json({ error: "aucun fichier audio trouver", succes: false, daata: request });
        }
        if (!file.isValid) {
            return response.json({ error: file.errors, succes: false });
        }
        file.clientName = new Date().getTime() + file.clientName;
        await file.move(Application_1.default.publicPath('uploads/kolis'));
        let audio = "/uploads/kolis/" + file.clientName;
        let image = "/uploads/default.jpg";
        if (request.file("image")) {
            let img = request.file("image", {
                size: '1000mb',
                extnames: ["png", "jpeg", "jpg"],
            });
            if (!img) {
                return response.json({ error: "vous avez acces a cette page", succes: false });
            }
            if (!img.isValid) {
                return response.json({ error: img.errors, succes: false });
            }
            img.clientName = new Date().getTime() + img.clientName;
            await img.move(Application_1.default.publicPath('uploads/images'));
            image = "/uploads/images/" + img.clientName;
        }
        let pays = await Pay_1.default.create({ pays_name });
        let artist = await Artist_1.default.create({ artist_nom, image });
        let pays_id = pays.id;
        let artists_id = artist.id;
        let koli = await Koli_1.default.create({ audio, titre, artists_id, pays_id });
        return response.json({ koli, success: true });
    }
    async show({ request }) {
        let koli = await Koli_1.default.query().preload('artist').where('id', request.param('id')).first();
        return koli;
    }
    async search({ request }) {
        let input = request.input("artist") || 'a';
        let Kolis = await Koli_1.default.query().preload('artist', (query) => query.where('artist_nom', 'LIKE', '%' + input + '%')).limit(24).orderBy('id', 'desc');
        let newKolis = [];
        for (let koli of Kolis) {
            if (koli.artist != null) {
                newKolis.push(koli);
            }
        }
        return newKolis;
    }
    async searchbyartistkoli({ request }) {
        let input = request.param('titre') || 'a';
        let koli = Koli_1.default.query().preload('artist').where('titre', 'LIKE', '%' + input + '%').limit(24).orderBy('id', 'desc');
        return koli;
    }
    async getwithpagin({ request }) {
        const limit = 12;
        let page = request.param('page');
        let kolis = await Koli_1.default.query()
            .preload('artist')
            .preload('pays')
            .orderBy('id', 'desc').paginate(page, limit);
        return kolis;
    }
}
exports.default = KolisController;
//# sourceMappingURL=KolisController.js.map