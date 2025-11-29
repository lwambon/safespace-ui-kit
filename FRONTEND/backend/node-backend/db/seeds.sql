-- Countries
INSERT INTO countries (name, iso_code) VALUES
('Kenya', 'KE'),
('South Africa', 'ZA'),
('Nigeria', 'NG'),
('Rwanda', 'RW'),
('Tanzania', 'TZ'),
('Uganda', 'UG'),
('Somalia', 'SO'),
('Ghana', 'GH'),
('Ethiopia', 'ET');

-- Emergency Contacts
INSERT INTO emergency_contacts (country_id, hotline_number, type) VALUES
(1, '1195', 'GBV Hotline'),
(2, '0800 428 428', 'GBV Hotline'),
(3, '0800 033 3333', 'GBV Hotline'),
(4, '3512', 'GBV Hotline'),
(5, '116', 'GBV Hotline'),
(6, '0800 100 066', 'GBV Hotline'),
(7, '828', 'GBV Hotline'),
(8, '0800 800 800', 'GBV Hotline'),
(9, '992', 'GBV Hotline');

-- Harassment Categories
INSERT INTO harassment_categories (name, description) VALUES
('Sexual Harassment', 'Unwanted sexual advances or comments'),
('Workplace Harassment', 'Bullying or hostile work environment'),
('Cyber Harassment', 'Online abuse, stalking, or threats'),
('Physical Harassment', 'Assault, intimidation, unwanted touching'),
('Verbal Harassment', 'Insults, slurs, threats'),
('Discriminatory Harassment', 'Harassment based on race, gender, religion, disability, etc.');