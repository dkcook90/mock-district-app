//bring in all of the models to declair relations
const School = require('./School')
const Teacher = require('./Teacher')
const Student = require('./Student')
const User = require('./User')

//one to many relation between the school and teacher model
School.hasMany(Teacher, {
    foreignKey: 'school_id',
    onDelete: 'CASCADE',
});

Teacher.belongsTo(School, {
    foreignKey: 'school_id',
});

//one to many relation between the teacher and student model
Teacher.hasMany(Student, {
    foreignKey: 'teacher_id',
    onDelete: 'CASCADE',
});

Student.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
});

module.exports = { School, Teacher, Student, User }