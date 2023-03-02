"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.resource('koli', 'KolisController').except(['edit', 'update', 'create']);
Route_1.default.resource('artists', 'ArtistsController').except(['edit', 'update', 'create']);
Route_1.default.post('koli/search', 'KolisController.search');
Route_1.default.post('koli/pays/search', 'PaysController.search');
Route_1.default.get('koli/titre/:titre', 'KolisController.searchbyartistkoli');
Route_1.default.get('koli/pagination/page/:page', 'KolisController.getwithpagin');
Route_1.default.resource('admin', 'UsersController');
Route_1.default.post('login', 'UsersController.login');
Route_1.default.get('auth', 'UsersController.auth');
//# sourceMappingURL=routes.js.map