import Database from "better-sqlite3";
import PATH from "./constant/file";

const db = new Database(PATH.DB);
db.pragma("foreign_keys = ON");

const tableQuery = `
    CREATE TABLE IF NOT EXISTS status (
        status_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS office_type (
        office_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS employer (
        employer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_type (
        contact_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS people (
        people_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        phone TEXT,
        url TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        employer_id INTEGER,
        contact_type_id INTEGER,
        FOREIGN KEY (employer_id) REFERENCES employer(employer_id),
        FOREIGN KEY (contact_type_id) REFERENCES contact_type(contact_type_id)
    );

    CREATE TABLE IF NOT EXISTS job (
        job_id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT,
        job_description TEXT,
        link TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        referrer_id INTEGER,
        office_type_id INTEGER,
        employer_id INTEGER,
        FOREIGN KEY (referrer_id) REFERENCES people(people_id),
        FOREIGN KEY (office_type_id) REFERENCES office_type(office_type_id),
        FOREIGN KEY (employer_id) REFERENCES employer(employer_id)
    );

    CREATE TABLE IF NOT EXISTS job_status_history (
        history_id INTEGER PRIMARY KEY AUTOINCREMENT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        job_id INTEGER,
        status_id INTEGER,
        FOREIGN KEY (job_id) REFERENCES job(job_id),
        FOREIGN KEY (status_id) REFERENCES status(status_id)
    );

    CREATE TABLE IF NOT EXISTS task (
        task_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        due_date DATETIME,
        completed BOOLEAN,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        job_id INTEGER,
        FOREIGN KEY (job_id) REFERENCES job(job_id)
    );
`;

export function createTables() {
  tableQuery
    .trim()
    .split(";")
    .filter(Boolean)
    .forEach((query) => {
      db.prepare(query.trim()).run();
    });
}

export default db;
