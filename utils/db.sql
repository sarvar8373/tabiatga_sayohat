SELECT notification_id
FROM tours
WHERE notification_id IS NOT NULL
AND notification_id NOT IN (SELECT id FROM notifications);

DELETE FROM tours
WHERE notification_id IS NOT NULL
AND notification_id NOT IN (SELECT id FROM notifications);

ALTER TABLE `tours`
ADD CONSTRAINT `tours_ibfk_4`
FOREIGN KEY (`notification_id`)
REFERENCES `notifications`(`id`)
ON DELETE RESTRICT
ON UPDATE RESTRICT;
