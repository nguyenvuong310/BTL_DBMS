-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS update_doctor_rating_after_feedback_insert;

-- Create the trigger
DELIMITER $$

CREATE TRIGGER update_doctor_rating_after_feedback_insert
AFTER INSERT ON feedbacks
FOR EACH ROW
BEGIN
    DECLARE avgRating FLOAT;

    -- Calculate the new average rating for the doctor
    SELECT AVG(rating) INTO avgRating
    FROM feedbacks
    WHERE doctorId = NEW.doctorId;

    -- Update the doctor's average rating
    UPDATE doctors
    SET rating = avgRating
    WHERE id = NEW.doctorId;
END $$

DELIMITER ;
