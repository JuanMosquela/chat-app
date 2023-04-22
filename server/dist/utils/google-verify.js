"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogle = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_ID);
function verifyGoogle(token = "") {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ticket = yield client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const { name, picture, email } = ticket.getPayload();
            return {
                username: name,
                picture,
                email,
            };
        }
        catch (error) {
            if (error.message == "The verifyIdToken method requires an ID Token") {
                console.log("Esperando el id_token");
            }
            else {
                console.log(error.message);
            }
        }
    });
}
exports.verifyGoogle = verifyGoogle;
verifyGoogle();
