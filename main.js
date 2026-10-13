import { exercises } from "./exercises.js";


// ==================== 1 ====================

/* console.log(exercises.filter(excercise => excercise.bodyPart === "legs"));

console.log(exercises.find(excercise => excercise.id === 3));

console.log(exercises.map(excercise => excercise.name)); */


// ==================== 2 ====================

/* exercises.push({ id: 6, name: "데드리프트", bodyPart: "back", equipment: "barbell" });
console.log(exercises); */


// ==================== 3 ====================

/* function addExercise(id, name, bodyPart, equipment) {

    const excercise = {
        id, name, bodyPart, equipment
    };

    exercises.push(excercise);
}

addExercise(6, "데드리프트", "back", "barbell");

console.log(exercises); */

// ==================== 4 ====================

/* function addExercise(name, bodyPart, equipment) {
    const ids = exercises.map(exercise => exercise.id);

    const newId = Math.max(...ids) + 1;

    const exercise = {
        id: newId, name, bodyPart, equipment
    };

    exercises.push(exercise);
}

addExercise("데드리프트", "back", "barbell");

console.log(exercises); */