"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koli_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Koli"));
class PaysController {
    async search({ request }) {
        let kolis = await Koli_1.default.query().preload('pays', (query) => query.where('pays_name', 'LIKE', '%' + request.input('pays') + '%')).preload('artist').limit(24);
        let newKolis = [];
        for (let koli of kolis) {
            if (koli.pays != null) {
                newKolis.push(koli);
            }
        }
        return newKolis;
    }
}
exports.default = PaysController;
//# sourceMappingURL=PaysController.js.map