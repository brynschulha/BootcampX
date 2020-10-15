const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// pool.query(`
// SELECT DISTINCT(teachers.name) AS teacher, cohorts.name AS cohort
// FROM teachers
// JOIN assistance_requests
// ON teachers.id = assistance_requests.teacher_id
// JOIN students
// ON students.id = assistance_requests.student_id
// JOIN cohorts 
// ON cohorts.id = students.cohort_id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// ORDER BY teacher;
// `)
// .then(res => {
//   res.rows.forEach(row => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   })
// });

const queryString = `
SELECT DISTINCT(teachers.name) AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests
ON teachers.id = assistance_requests.teacher_id
JOIN students
ON students.id = assistance_requests.student_id
JOIN cohorts 
ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];
pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
});