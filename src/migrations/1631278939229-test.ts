import {MigrationInterface, QueryRunner} from "typeorm";

export class test1631278939229 implements MigrationInterface {
    name = 'test1631278939229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`postLike\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`postId\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`caption\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`userId\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`hashtag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tag\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`hashtag_post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`hashtagId\` int NOT NULL, \`postId\` int NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` ADD CONSTRAINT \`FK_edf6d43b6ec708ac4e3b276cc81\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` ADD CONSTRAINT \`FK_afd66f473ffaaec725ed735ea25\` FOREIGN KEY (\`postId\`) REFERENCES \`hell_ta_bus\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`hashtag_post\` ADD CONSTRAINT \`FK_8976e5a8329829a9cb1d00e9e49\` FOREIGN KEY (\`postId\`) REFERENCES \`hell_ta_bus\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`hashtag_post\` ADD CONSTRAINT \`FK_d415efa4df33d2165231fe93f03\` FOREIGN KEY (\`hashtagId\`) REFERENCES \`hell_ta_bus\`.\`hashtag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`hashtag_post\` DROP FOREIGN KEY \`FK_d415efa4df33d2165231fe93f03\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`hashtag_post\` DROP FOREIGN KEY \`FK_8976e5a8329829a9cb1d00e9e49\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` DROP FOREIGN KEY \`FK_afd66f473ffaaec725ed735ea25\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` DROP FOREIGN KEY \`FK_edf6d43b6ec708ac4e3b276cc81\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` ADD \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`user\` ADD \`deleted_at\` timestamp NULL`);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`hashtag_post\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`hashtag\``);
        await queryRunner.query(`DROP INDEX \`userId\` ON \`hell_ta_bus\`.\`post\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`post\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`postLike\``);
    }

}
