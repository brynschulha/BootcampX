SELECT SUM(duration) AS total_duration
FROM students 
JOIN assignment_submissions 
ON students.id = student_id
WHERE name = 'Ibrahim Schimmel';