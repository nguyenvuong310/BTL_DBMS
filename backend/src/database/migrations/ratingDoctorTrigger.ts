import { MigrationInterface, QueryRunner } from 'typeorm';

export class TriggerForCourseInDeleteOnEnrollment1629173837000 implements MigrationInterface {
  name = 'TriggerForCourseInDeleteOnEnrollment1629173837000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                    DELIMITER //
                    CREATE TRIGGER update_doctor_rating_after_feedback_insert
                    AFTER INSERT ON feedbacks
                    FOR EACH ROW
                    BEGIN
                        DECLARE avgRating FLOAT;
                        SELECT AVG(rating) INTO avgRating
                        FROM feedbacks
                        WHERE doctorId = NEW.doctorId;

                        UPDATE doctors
                        SET rating = avgRating
                        WHERE id = NEW.doctorId;
                    END;
                    //
                    DELIMITER ;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TRIGGER IF EXISTS update_doctor_rating_after_feedback_insert`);
  }
}
