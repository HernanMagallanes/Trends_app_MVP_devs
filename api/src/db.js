require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/trends`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/src/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/src/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Message,
  Profile,
  Academic,
  // Area,
  Info,
  // Career,
  // Skill,
  // Interest,
  ProfessionalInfo,
  Student,
  Professional,
} = sequelize.models;

Message.belongsTo(User, { foreignKey: "user_id", allowNull: false });

// ESTUDIANTES
Profile.hasOne(Student, { as: "studentProfile" });
Student.belongsTo(Profile, { as: "profile" });

Academic.hasOne(Student, { as: "studentAcademic" });
Student.belongsTo(Academic, { as: "academic" });

Info.hasOne(Student, { as: "studentInfo" });
Student.belongsTo(Info, { as: "info" });

// PROFESIONALES
Profile.hasOne(Professional, { as: "professionalProfile" });
Professional.belongsTo(Profile, { as: "profile" });

Academic.hasOne(Professional, { as: "professionalAcademic" });
Professional.belongsTo(Academic, { as: "academic" });

Professional.belongsTo(Info, { foreignKey: "infoId", as: "info" });
Professional.belongsTo(ProfessionalInfo, {
  foreignKey: "infoId",
  as: "professionalInfo",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
