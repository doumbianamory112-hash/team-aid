CREATE DATABASE IF NOT EXISTS team_aid;
USE team_aid;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','user') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS formations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL UNIQUE,
  active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS inscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  sexe ENUM('M','F','Autre') NOT NULL,
  date_naissance DATE NOT NULL,
  telephone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  pays_id INT NOT NULL,
  formation_id INT NOT NULL,
  niveau_etude VARCHAR(120) NOT NULL,
  motivation TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (pays_id) REFERENCES pays(id),
  FOREIGN KEY (formation_id) REFERENCES formations(id)
);

CREATE TABLE IF NOT EXISTS corbeille (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inscription_id INT NOT NULL,
  deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason VARCHAR(255) DEFAULT 'deleted',
  FOREIGN KEY (inscription_id) REFERENCES inscriptions(id)
);

INSERT INTO formations (nom, active) VALUES
('Développement Web', 1),
('Design Graphique', 1),
('Marketing Digital', 1),
('Bureautique', 1),
('Comptabilité', 1)
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

INSERT INTO pays (nom) VALUES
('Burkina Faso'),
('Côte d\'Ivoire'),
('Mali'),
('Niger'),
('Sénégal'),
('Togo'),
('Bénin'),
('Guinée'),
('Cameroun'),
('Congo'),
('RD Congo'),
('Madagascar'),
('Mauritanie'),
('Tchad'),
('Gabon')
ON DUPLICATE KEY UPDATE nom = VALUES(nom);

INSERT INTO users (nom, prenom, email, password_hash, role)
VALUES ('TEAM', 'AID', 'admin@team-aid.local', '$2b$10$0w2ZkKfFzKQ4L6m5Yw4kL.4Y4x2qjJj9r3j7zjQmUQ6U1VdQH0Q2', 'admin')
ON DUPLICATE KEY UPDATE email = VALUES(email);
