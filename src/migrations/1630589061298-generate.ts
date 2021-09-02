import {MigrationInterface, QueryRunner} from 'typeorm';

export class generate1630589061298 implements MigrationInterface {
    name = 'generate1630589061298'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(20) NOT NULL, \`email\` varchar(255) NOT NULL, \`deleted_at\` timestamp NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
      await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(30) NOT NULL, \`birthday\` date NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`userId\` int NULL, UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
      await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
      await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`hell_ta_bus\`.\`profile\``);
      await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`profile\``);
      await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`hell_ta_bus\`.\`user\``);
      await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`user\``);
    }
}
