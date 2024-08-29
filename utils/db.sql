ALTER TABLE `tours`
ADD COLUMN `tourism_service_id` int(11) DEFAULT NULL;

-- Add foreign key constraint
ALTER TABLE `tours`
ADD CONSTRAINT `fk_tours_tourism_services`
FOREIGN KEY (`tourism_service_id`) REFERENCES `tourism_services`(`id`)
ON DELETE SET NULL
ON UPDATE CASCADE;

-- CREATE TABLE tourism_services (
--     id INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL
-- );
-- INSERT INTO tourism_services (id, name) VALUES
-- (1, 'Tashrif markazlari (Visitor center)'),
-- (2, 'Tabiat muzeyi'),
-- (3, 'Modulli mehmonxonalar'),
-- (4, 'Glempinglar majmuasi'),
-- (5, 'Chodirli (kemping) lagerlar'),
-- (6, 'O‘tovli lagerlar'),
-- (7, 'Avtokempinglar majmuasi'),
-- (8, 'Ekouylar majmuasi'),
-- (9, 'Konteyner shaharchalar'),
-- (10, 'Hunarmandchilik va suvenir mahsulotlari savdosi'),
-- (11, 'Piknik zona'),
-- (12, 'Baliq ovlash va suv bo‘yi turizmi maskanlari'),
-- (13, 'Ekstremal turizm yo‘nalishida zarur bo‘ladigan anjomlar ijarasi markazi'),
-- (14, 'Boshqariladigan (dirijabl, havo shari) va boshqarilmaydigan (erkin uchish) aerostatlar'),
-- (15, 'Banji-jamping attraksionlari'),
-- (16, 'Ziplayn attraksionlari'),
-- (17, 'Zorbing markazi'),
-- (18, 'Velosiped ijarasi'),
-- (19, 'Kvadrotsikl va baggikarlar ijarasi (tog‘li, cho‘l va qumli hududlarda)'),
-- (20, 'Jip turlar (cho‘l va qumli hududlarda)'),
-- (21, 'Kanatli (arqonli) park (Taypark)'),
-- (22, 'Sun’iy qoyalarga chiqish (skalodrom)'),
-- (23, 'Ot va tuyada sayr qilish xizmati'),
-- (24, 'Rafting xizmati'),
-- (25, 'Kayaking xizmati'),
-- (26, 'Kaytsyorfing xizmati'),
-- (27, 'Deltaplan xizmati'),
-- (28, 'Motoparaplan xizmati'),
-- (29, 'Trekking va xayking uchun ekskursovod xizmati'),
-- (30, 'Elektromotorli qayiqlar ijarasi'),
-- (31, 'Qorda harakatlanishga mo‘ljallangan maxsus transport vositalari (tog‘li hududlarda)'),
-- (32, 'Zorbing xizmati'),
-- (33, 'Qumli serfing va sendbording xizmati'),
-- (34, 'Qushlarni kuzatish (byordvotching) uchun maxsus joy'),
-- (35, 'Selfi zona'),
-- (36, 'Ekstremal turizm uchun tematik park'),
-- (37, 'Tungi vaqtda yulduzlarni kuzatish xizmati'),
-- (38, 'O‘simlik, daraxt va butalardan labirint faoliyati (cho‘l va qumli hududlarda)');
