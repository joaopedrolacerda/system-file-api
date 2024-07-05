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
exports.CreateTables1720096602207 = void 0;
class CreateTables1720096602207 {
    constructor() {
        this.name = 'CreateTables1720096602207';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(255) NOT NULL, \`total\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`order_product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(10,2) NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`CREATE TABLE \`user_orders_order\` (\`userId\` int NOT NULL, \`orderId\` int NOT NULL, INDEX \`IDX_2a54ac0cc61dfd2f9b39a56bf7\` (\`userId\`), INDEX \`IDX_2b579c8f509cab1a3e3b35cece\` (\`orderId\`), PRIMARY KEY (\`userId\`, \`orderId\`)) ENGINE=InnoDB`);
            yield queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_3fb066240db56c9558a91139431\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_073c85ed133e05241040bd70f02\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE \`user_orders_order\` ADD CONSTRAINT \`FK_2a54ac0cc61dfd2f9b39a56bf7d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE \`user_orders_order\` ADD CONSTRAINT \`FK_2b579c8f509cab1a3e3b35cece0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`user_orders_order\` DROP FOREIGN KEY \`FK_2b579c8f509cab1a3e3b35cece0\``);
            yield queryRunner.query(`ALTER TABLE \`user_orders_order\` DROP FOREIGN KEY \`FK_2a54ac0cc61dfd2f9b39a56bf7d\``);
            yield queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_073c85ed133e05241040bd70f02\``);
            yield queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_3fb066240db56c9558a91139431\``);
            yield queryRunner.query(`DROP INDEX \`IDX_2b579c8f509cab1a3e3b35cece\` ON \`user_orders_order\``);
            yield queryRunner.query(`DROP INDEX \`IDX_2a54ac0cc61dfd2f9b39a56bf7\` ON \`user_orders_order\``);
            yield queryRunner.query(`DROP TABLE \`user_orders_order\``);
            yield queryRunner.query(`DROP TABLE \`user\``);
            yield queryRunner.query(`DROP TABLE \`product\``);
            yield queryRunner.query(`DROP TABLE \`order_product\``);
            yield queryRunner.query(`DROP TABLE \`order\``);
        });
    }
}
exports.CreateTables1720096602207 = CreateTables1720096602207;
//# sourceMappingURL=1720096602207-create-tables.js.map