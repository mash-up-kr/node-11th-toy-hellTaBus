import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1630601200182 implements MigrationInterface {
    name = 'generate1630601200182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` ADD \`password\` varchar(60) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` ADD \`password\` varchar(20) NOT NULL`);
    }

}
