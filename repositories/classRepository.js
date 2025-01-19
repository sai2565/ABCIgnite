const { readDataFromFile, writeDataToFile } = require('../utils/fileUtils');
const filePath = './data/classes.json';

const getAllClasses = async () => await readDataFromFile(filePath);
const getClasses = async (classIds) => {
    const classes = await getAllClasses();
    return classes.filter((c) => classIds.includes(c.id));
}

const saveClass = async (newClass) => {
  const classes = await getAllClasses();
  classes.push(newClass);
  await writeDataToFile(filePath, classes);
  return newClass;
};

const filterClasses = async (filter) => {
    const classes = await getAllClasses();
    return classes.filter((c) => {
        return Object.keys(filter).every((key) => {
            return c[key] === filter[key];
        });
    });
}

module.exports = { getAllClasses, getClasses, saveClass, filterClasses };
