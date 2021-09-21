import {MigrationInterface, QueryRunner} from "typeorm";

export class generate1632252712602 implements MigrationInterface {
    name = 'generate1632252712602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`hashtag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tag\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(60) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`caption\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`likeCnt\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(30) NOT NULL, \`birthday\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_a24972ebd73b106250713dcddd\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`postLike\` (\`userId\` int NOT NULL, \`postId\` int NOT NULL, INDEX \`IDX_edf6d43b6ec708ac4e3b276cc8\` (\`userId\`), INDEX \`IDX_afd66f473ffaaec725ed735ea2\` (\`postId\`), PRIMARY KEY (\`userId\`, \`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`postHashtag\` (\`postId\` int NOT NULL, \`hashtagId\` int NOT NULL, INDEX \`IDX_cdad1a525a3053c002baf4bbfb\` (\`postId\`), INDEX \`IDX_225c281e7b526aff87713fb592\` (\`hashtagId\`), PRIMARY KEY (\`postId\`, \`hashtagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` ADD CONSTRAINT \`FK_a24972ebd73b106250713dcddd9\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` ADD CONSTRAINT \`FK_edf6d43b6ec708ac4e3b276cc81\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` ADD CONSTRAINT \`FK_afd66f473ffaaec725ed735ea25\` FOREIGN KEY (\`postId\`) REFERENCES \`hell_ta_bus\`.\`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postHashtag\` ADD CONSTRAINT \`FK_cdad1a525a3053c002baf4bbfb5\` FOREIGN KEY (\`postId\`) REFERENCES \`hell_ta_bus\`.\`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postHashtag\` ADD CONSTRAINT \`FK_225c281e7b526aff87713fb592c\` FOREIGN KEY (\`hashtagId\`) REFERENCES \`hell_ta_bus\`.\`hashtag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postHashtag\` DROP FOREIGN KEY \`FK_225c281e7b526aff87713fb592c\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postHashtag\` DROP FOREIGN KEY \`FK_cdad1a525a3053c002baf4bbfb5\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` DROP FOREIGN KEY \`FK_afd66f473ffaaec725ed735ea25\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`postLike\` DROP FOREIGN KEY \`FK_edf6d43b6ec708ac4e3b276cc81\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`profile\` DROP FOREIGN KEY \`FK_a24972ebd73b106250713dcddd9\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`DROP INDEX \`IDX_225c281e7b526aff87713fb592\` ON \`hell_ta_bus\`.\`postHashtag\``);
        await queryRunner.query(`DROP INDEX \`IDX_cdad1a525a3053c002baf4bbfb\` ON \`hell_ta_bus\`.\`postHashtag\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`postHashtag\``);
        await queryRunner.query(`DROP INDEX \`IDX_afd66f473ffaaec725ed735ea2\` ON \`hell_ta_bus\`.\`postLike\``);
        await queryRunner.query(`DROP INDEX \`IDX_edf6d43b6ec708ac4e3b276cc8\` ON \`hell_ta_bus\`.\`postLike\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`postLike\``);
        await queryRunner.query(`DROP INDEX \`REL_a24972ebd73b106250713dcddd\` ON \`hell_ta_bus\`.\`profile\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`profile\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`hell_ta_bus\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`hashtag\``);
    }

}
