"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_seeding_1 = require("typeorm-seeding");
var user_entity_1 = require("../../entities/user.entity");
// tslint:disable-next-line:no-var-requires
var bcrypt = require('bcryptjs');
(0, typeorm_seeding_1.define)(user_entity_1.UserEntity, function () {
    var user = new user_entity_1.UserEntity();
    user.name = "SuperAdmin";
    user.email = 'admin@admin.com';
    user.password = "$2a$10$/sX.1ZEJ9elY0QCJN/pQa.G0kNXn2waqCdLlyVMtm6Ju1a0aMQJl2";
    return user;
});
//# sourceMappingURL=user.factory.js.map