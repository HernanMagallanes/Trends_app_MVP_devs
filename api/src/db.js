require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const {
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
} = require("../config");

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
	}
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
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
//const { User } = sequelize.models;

const {
	//User,
	//Message,
	Profile,
	Academic,
	Info,
	InfoProfessional,
	Student,
	Professional,
} = sequelize.models;

//Message.belongsTo(User, { foreignKey: "user_id", allowNull: false });

// ESTUDIANTES
Student.belongsTo(Profile, {
	foreignKey: {
		name: "studentProfile",
		allowNull: false,
	},
});
Profile.hasOne(Student, {
	foreignKey: {
		name: "studentProfile",
		allowNull: false,
	},
});

Student.belongsTo(Academic, {
	foreignKey: {
		name: "studentAcademic",
		allowNull: false,
	},
});
Academic.hasOne(Student, {
	foreignKey: {
		name: "studentAcademic",
		allowNull: false,
	},
});

Student.belongsTo(Info, {
	foreignKey: {
		name: "studentInfo",
		allowNull: false,
	},
});
Info.hasOne(Student, {
	foreignKey: {
		name: "studentInfo",
		allowNull: false,
	},
});

// PROFESIONALES
Professional.belongsTo(Profile, {
	foreignKey: {
		name: "professionalProfile",
		allowNull: false,
	},
});
Profile.hasOne(Professional, {
	foreignKey: {
		name: "professionalProfile",
		allowNull: false,
	},
});

Professional.belongsTo(Academic, {
	foreignKey: {
		name: "professionalAcademic",
		allowNull: false,
	},
});
Academic.hasOne(Professional, {
	foreignKey: {
		name: "professionalAcademic",
		allowNull: false,
	},
});

// Professional.belongsTo(Info, {
//   foreignKey: {
//     name: "professionalInfo",
//     allowNull: false,
//   },
// });
Info.hasOne(Professional, {
	foreignKey: {
		name: "professionalInfo",
		allowNull: false,
	},
});

Professional.belongsTo(Info, { foreignKey: "infoId", as: "info" });
Professional.belongsTo(InfoProfessional, {
	foreignKey: "infoId",
	as: "infoProfessional",
});

module.exports = {

	...sequelize.models,
	conn: sequelize,
};
