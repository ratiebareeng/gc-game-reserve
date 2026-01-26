import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737850000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create users table
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying(255) NOT NULL,
                "phone_number" character varying(20),
                "password_hash" character varying(255) NOT NULL,
                "first_name" character varying(100) NOT NULL,
                "last_name" character varying(100) NOT NULL,
                "role" character varying NOT NULL DEFAULT 'visitor',
                "is_verified" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_96aac72cea6e2e0e838190bb864" PRIMARY KEY ("id")
            )
        `);

    // Create unique constraints
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_17d1817f241f10a3dbafb169fd" ON "users" ("phone_number")`,
    );

    // Create activity_types table
    await queryRunner.query(`
            CREATE TABLE "activity_types" (
                "id" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "description" text,
                "price_per_person" numeric(10,2) NOT NULL,
                "price_per_vehicle" numeric(10,2) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7d6c27a8a8197e08e2b8a5b5c8d" PRIMARY KEY ("id")
            )
        `);

    // Create animals table
    await queryRunner.query(`
            CREATE TABLE "animals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "common_name" character varying(255) NOT NULL,
                "scientific_name" character varying(255),
                "category" character varying NOT NULL,
                "description" text,
                "conservation_status" character varying,
                "diet_type" character varying,
                "habitat" text,
                "population_estimate" integer,
                "is_endangered" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_56d48e3d7c8e0a2b8e0b8c8e0" PRIMARY KEY ("id")
            )
        `);

    // Create points_of_interest table
    await queryRunner.query(`
            CREATE TABLE "points_of_interest" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "description" text,
                "type" character varying NOT NULL,
                "latitude" numeric(10,8) NOT NULL,
                "longitude" numeric(11,8) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4c88e956195bba85977da21b8f" PRIMARY KEY ("id")
            )
        `);

    // Create bookings table
    await queryRunner.query(`
            CREATE TABLE "bookings" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid,
                "booking_reference" character varying(20) NOT NULL,
                "visit_date" date NOT NULL,
                "visit_time" time,
                "activity_type_id" integer NOT NULL,
                "number_of_visitors" integer NOT NULL,
                "number_of_vehicles" integer NOT NULL,
                "visitor_fee" numeric(10,2) NOT NULL,
                "vehicle_fee" numeric(10,2) NOT NULL,
                "total_amount" numeric(10,2) NOT NULL,
                "status" character varying NOT NULL DEFAULT 'pending',
                "contact_name" character varying(200),
                "contact_email" character varying(255),
                "contact_phone" character varying(20),
                "special_requests" text,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4c88e956195bba85977da21b8f9" PRIMARY KEY ("id")
            )
        `);

    // Create unique index for booking_reference
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4c88e956195bba85977da21b8f9_ref" ON "bookings" ("booking_reference")`,
    );

    // Create payments table
    await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "booking_id" uuid NOT NULL,
                "amount" numeric(10,2) NOT NULL,
                "currency" character varying(3) NOT NULL DEFAULT 'BWP',
                "payment_method" character varying NOT NULL,
                "transaction_id" character varying(255),
                "status" character varying NOT NULL DEFAULT 'pending',
                "paid_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4c88e956195bba85977da21b8fa" PRIMARY KEY ("id")
            )
        `);

    // Create animal_media table
    await queryRunner.query(`
            CREATE TABLE "animal_media" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "animal_id" uuid NOT NULL,
                "media_type" character varying NOT NULL,
                "url" character varying(500) NOT NULL,
                "caption" text,
                "is_primary" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4c88e956195bba85977da21b8fb" PRIMARY KEY ("id")
            )
        `);

    // Create poi_media table
    await queryRunner.query(`
            CREATE TABLE "poi_media" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "poi_id" uuid NOT NULL,
                "media_type" character varying NOT NULL,
                "url" character varying(500) NOT NULL,
                "caption" text,
                "is_primary" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_4c88e956195bba85977da21b8fc" PRIMARY KEY ("id")
            )
        `);

    // Create foreign key constraints
    await queryRunner.query(`
            ALTER TABLE "bookings" ADD CONSTRAINT "FK_4c88e956195bba85977da21b8f9_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "bookings" ADD CONSTRAINT "FK_4c88e956195bba85977da21b8f9_activity" FOREIGN KEY ("activity_type_id") REFERENCES "activity_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "payments" ADD CONSTRAINT "FK_4c88e956195bba85977da21b8fa_booking" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "animal_media" ADD CONSTRAINT "FK_4c88e956195bba85977da21b8fb_animal" FOREIGN KEY ("animal_id") REFERENCES "animals"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "poi_media" ADD CONSTRAINT "FK_4c88e956195bba85977da21b8fc_poi" FOREIGN KEY ("poi_id") REFERENCES "points_of_interest"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(
      `ALTER TABLE "poi_media" DROP CONSTRAINT "FK_4c88e956195bba85977da21b8fc_poi"`,
    );
    await queryRunner.query(
      `ALTER TABLE "animal_media" DROP CONSTRAINT "FK_4c88e956195bba85977da21b8fb_animal"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payments" DROP CONSTRAINT "FK_4c88e956195bba85977da21b8fa_booking"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_4c88e956195bba85977da21b8f9_activity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_4c88e956195bba85977da21b8f9_user"`,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE "poi_media"`);
    await queryRunner.query(`DROP TABLE "animal_media"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "bookings"`);
    await queryRunner.query(`DROP TABLE "points_of_interest"`);
    await queryRunner.query(`DROP TABLE "animals"`);
    await queryRunner.query(`DROP TABLE "activity_types"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
