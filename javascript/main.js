import { exercises } from "./exercises.js";
import { workoutLogs } from "./workoutLogs.js";

/* 
feat:	    새로운 기능 추가	
fix:	    버그 수정
refactor:	기능 변경 없는 코드 구조 개선	
docs:	    문서 수정
test:	    테스트 추가·수정	

git add .
git commit -m "feat: 세트별·일별 운동량 계산"
git push
*/


//#region /* ============================================================ 운동 종목 검색·부위별 필터링 ============================================================ */


/* ============================== 운동 종목 검색 ============================== */

/* 
function searchExercise(keyword) {

    const result = exercises.filter(exercise => exercise.name.includes(keyword));

    console.log(result);
}

searchExercise("프레스");
*/


/* ============================== 운동 종목 부위별 필터링 ============================== */

/* 
function filterExercisesByBodyPart(bodyPart) {
    
    const body = exercises.filter(exercise => exercise.bodyPart === bodyPart);

    return body;
}

console.log(filterExercisesByBodyPart("legs"));
console.log(filterExercisesByBodyPart("back"));
*/


//#endregion


//#region /* ============================================================ 운동 종목 추가·조회·수정·삭제(CRUD) ============================================================ */


/* ============================== 운동 종목 조회 ============================== */

/* 
console.log(exercises.filter(exercise => exercise.bodyPart === "legs"));

console.log(exercises.find(exercise => exercise.id === 3));

console.log(exercises.map(exercise => exercise.name));
*/


/* ============================== 운동 종목 추가 ============================== */

/* 
exercises.push({ id: 6, name: "데드리프트", bodyPart: "back", equipment: "barbell" });

console.log(exercises);
*/

/* 
function addExercise(id, name, bodyPart, equipment) {

    const exercise = {
        id, name, bodyPart, equipment
    };

    exercises.push(exercise);
}

addExercise(6, "데드리프트", "back", "barbell");

console.log(exercises);
*/

/* 
function addExercise(name, bodyPart, equipment) {

    const ids = exercises.map(exercise => exercise.id);

    const newId = Math.max(...ids) + 1;

    const exercise = {
        id: newId, name, bodyPart, equipment
    };

    exercises.push(exercise);
}

addExercise("데드리프트", "back", "barbell");

console.log(exercises);
*/


/* ============================== 운동 종목 삭제 ============================== */

/* 
function deleteExercise(id) {

    const result = exercises.filter(exercise => exercise.id !== id);

    console.log(result);
}

deleteExercise(3);
*/

/* 
function deleteExercise(id) {

    const index = exercises.findIndex(exercise => exercise.id === id);
    
    if (index !== -1) {
        exercises.splice(index, 1);
    }
}

deleteExercise(5);

console.log(exercises);
*/


/* ============================== 운동 종목 수정 ============================== */

/* 
function updateExercise(id) {

    const result = exercises.find(exercise => exercise.id === id);

    console.log(result)
}

updateExercise(3);
*/

/* 
function updateExercise(id, name, bodyPart, equipment) {

    const result = exercises.find(exercise => exercise.id === id);

    if (result) {
        result.name = name;
        result.bodyPart = bodyPart;
        result.equipment = equipment;
    }

    console.log(exercises);
}

updateExercise(3, "랫풀다운 머신", "back", "cable");
updateExercise(100, "테스트", "legs", "machine");
*/


//#endregion


//#region /* ============================================================ 중복 등록·잘못된 입력 검사 ============================================================ */


/* ============================== 운동 종목 중복 등록 검사 ============================== */

/* 
function addExercise(name, bodyPart, equipment) {

    const isDuplicate = exercises.some(exercise => exercise.name === name);

    const id = exercises.map(exercise => exercise.id);

    const newId = Math.max(...id) + 1;

    const exercise = {
        id: newId, name, bodyPart, equipment
    };

    if (isDuplicate) {
        console.log("이미 등록된 운동입니다.")
        return;
    }
    
    exercises.push(exercise)

}

addExercise("스쿼트", "legs", "barbell");

addExercise("풀업", "back", "bodyweight");
console.log(exercises);
*/


/* ============================== 운동 종목 입력값 유효성 검사 ============================== */

/* 
function addExercise(name, bodyPart, equipment) {
  
    const isInvalid = name.trim() === "" || bodyPart.trim() === "" || equipment.trim() === "";

    if (isInvalid) {
        console.log("등록 거부")
        return;
    }

    const allowedParts = ["legs", "back", "chest", "shoulders", "arms"];

    const isAllowed = allowedParts.includes(bodyPart);

    if (!isAllowed) {
        console.log("허용되지 않은 부위입니다.");
        return;
    }

    const trimmedName = name.trim();

    const isDuplicate = exercises.some(exercise => exercise.name.trim() === trimmedName);

    if (isDuplicate) {
        console.log("이미 등록된 운동입니다.")
        return;
    }

    const id = exercises.map(exercise => exercise.id);

    const newId = Math.max(...id) + 1;

    const exercise = {
        id: newId, name: trimmedName, bodyPart, equipment
    };

    exercises.push(exercise);
}

addExercise("", "legs", "barbell")
// 예상 결과: 등록 거부

addExercise("   ", "back", "machine")
// 예상 결과: 등록 거부

addExercise("풀업", "", "bodyweight")
// 예상 결과: 등록 거부

addExercise("데드리프트", "unknown", "barbell")
// 예상 결과: 등록 거부

addExercise("풀업", "back", "bodyweight")
// 예상 결과: 정상 등록
console.log(exercises);

addExercise(" 풀업 ", "back", "bodyweight");
addExercise("풀업", "back", "bodyweight");
*/


//#endregion


//#region /* ============================================================ 무게·횟수·세트·날짜별 운동 기록 CRUD ============================================================ */


/* ============================== 운동 기록 등록 (Create) ============================== */

/* 
function addWorkoutLog(exerciseId, date, weight, reps, set) {

    // 1. 기존 운동 기록의 ID 추출
    const ids = workoutLogs.map(logs => logs.id);

    // 2. 새로운 ID 생성
    const newId = Math.max(...ids) + 1;

    // 3. 새로운 운동 기록 객체 생성
    const newLog = {
        id: newId, exerciseId, date, weight, reps, set
    };

    // 4. workoutLogs 배열에 추가
    workoutLogs.push(newLog);
}

addWorkoutLog(1, "2026-10-16", 60, 15, 1);
console.log(workoutLogs.at(-1));
 */


/* ============================== 운동 기록 조회 (Read) ============================== */

/* 
function getWorkoutLogById(id) {
    
    const getLogs = workoutLogs.find(logs => logs.id === id);

    return getLogs;
}

console.log(getWorkoutLogById(3));
console.log(getWorkoutLogById(100));
 */

/* 
function getWorkoutLogsByExerciseId(exerciseId) {
    
    const getLogs = workoutLogs.filter(logs => logs.exerciseId === exerciseId);

    return getLogs;
}

console.log(getWorkoutLogsByExerciseId(1));
console.log(getWorkoutLogsByExerciseId(100));
 */

/* 
function getWorkoutLogsByDate(date) {
    
    const getLogs = workoutLogs.filter(logs => logs.date === date);

    return getLogs;
}

console.log(getWorkoutLogsByDate("2026-10-15"));
console.log(getWorkoutLogsByDate("2026-10-20"));
 */


/* ============================== 운동 기록 수정 (Update) ============================== */

/* 
function updateWorkoutLog(id, weight, reps) {
    
    const getLogs = workoutLogs.find(logs => logs.id === id);

    if (getLogs) {
        getLogs.weight = weight;
        getLogs.reps = reps;
    }

    console.log(getLogs);
}

updateWorkoutLog(3, 70, 12);
 */


/* ============================== 운동 기록 삭제 (Delete) ============================== */

/* 
function deleteWorkoutLog(id) {
    
    const getLogs = workoutLogs.findIndex(logs => logs.id === id);

    if (getLogs !== -1) {
        workoutLogs.splice(getLogs, 1)
    }
}

deleteWorkoutLog(3);
console.log(workoutLogs.find(logs => logs.id === 3));
console.log(workoutLogs.find(logs => logs.id === 4));
 */


//#endregion


//#region /* ============================================================ 세트별·일별 운동량 계산 ============================================================ */


/* ============================== 세트별 운동량 계산 ============================== */

/* 
function calculateSetVolume(weight, reps) {

    return weight * reps;
}

console.log(calculateSetVolume(60, 15));
console.log(calculateSetVolume(100, 10));
 */


/* ============================== 일별 운동량 계산 ============================== */

/* 
function calculateDailyVolume(date) {

    // 1. 해당 날짜의 운동 기록 찾기
    const dailyLogs = workoutLogs.filter(logs => logs.date === date);

    // 2. 각 기록의 운동량 계산 및 합산
    const sum = dailyLogs.reduce((total, log) => { return total + log.weight * log.reps }, 0);

    // 4. 합산 결과 반환
    return sum;
}

console.log(calculateDailyVolume("2026-10-15"));
 */


/* ============================== 운동 종목별 운동량 계산 ============================== */

/* 
function calculateExerciseVolume(exerciseId) {

    // 1. 해당 운동 종목의 기록만 필터링
    const exerciseLogs = workoutLogs.filter(logs => logs.exerciseId === exerciseId);

    // 2. 각 기록의 볼륨을 reduce()로 합산
    const sum = exerciseLogs.reduce((total, log) => { return total + log.weight * log.reps }, 0);

    // 3. 결과 반환
    return sum;
}

console.log(calculateExerciseVolume(1));
 */

/* ============================== 운동 종목별 운동량 계산 ============================== */

/* 
function calculateExerciseDailyVolume(date, exerciseId) {
    
    // 1. 해당 날짜이면서 해당 운동 종목인 기록 필터링
    const exercisedailyLogs = workoutLogs.filter(logs => (logs.date === date && logs.exerciseId === exerciseId));

    // 2. reduce()로 볼륨 합산
    const sum = exercisedailyLogs.reduce((total, log) => { return total + log.weight * log.reps },0);

    // 3. 결과 반환
    return sum;
}

console.log(calculateExerciseDailyVolume("2026-10-15", 1));
 */


//#endregion
