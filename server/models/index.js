const School = require('./School')
const Teacher = require('./Teacher')
const Student = require('./Student')

School.hasMany(Teacher, {
    foreignKey: 'school_id',
    onDelete: 'CASCADE',
});

Teacher.belongsTo(School, {
    foreignKey: 'school_id',
});

Teacher.hasMany(Student, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
});

Student.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
});

module.exports = { School, Teacher, Student }