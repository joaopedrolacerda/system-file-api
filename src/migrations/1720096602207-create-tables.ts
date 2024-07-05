import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1720096602207 implements MigrationInterface {
    name = 'CreateTables1720096602207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(255) NOT NULL, \`total\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(10,2) NOT NULL, \`orderId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_orders_order\` (\`userId\` int NOT NULL, \`orderId\` int NOT NULL, INDEX \`IDX_2a54ac0cc61dfd2f9b39a56bf7\` (\`userId\`), INDEX \`IDX_2b579c8f509cab1a3e3b35cece\` (\`orderId\`), PRIMARY KEY (\`userId\`, \`orderId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_3fb066240db56c9558a91139431\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_product\` ADD CONSTRAINT \`FK_073c85ed133e05241040bd70f02\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_orders_order\` ADD CONSTRAINT \`FK_2a54ac0cc61dfd2f9b39a56bf7d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_orders_order\` ADD CONSTRAINT \`FK_2b579c8f509cab1a3e3b35cece0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_orders_order\` DROP FOREIGN KEY \`FK_2b579c8f509cab1a3e3b35cece0\``);
        await queryRunner.query(`ALTER TABLE \`user_orders_order\` DROP FOREIGN KEY \`FK_2a54ac0cc61dfd2f9b39a56bf7d\``);
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_073c85ed133e05241040bd70f02\``);
        await queryRunner.query(`ALTER TABLE \`order_product\` DROP FOREIGN KEY \`FK_3fb066240db56c9558a91139431\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b579c8f509cab1a3e3b35cece\` ON \`user_orders_order\``);
        await queryRunner.query(`DROP INDEX \`IDX_2a54ac0cc61dfd2f9b39a56bf7\` ON \`user_orders_order\``);
        await queryRunner.query(`DROP TABLE \`user_orders_order\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`order_product\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
