import { exercises } from "./exercises.js";

/* 
feat:	    새로운 기능 추가	
fix:	    버그 수정
refactor:	기능 변경 없는 코드 구조 개선	
docs:	    문서 수정
test:	    테스트 추가·수정	

git add .
git commit -m "feat: implement exercise deletion"
git push
*/

/* ============================================================ 운동 종목 검색·부위별 필터링 ============================================================ */


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


/* ============================================================ 운동 종목 추가·조회·수정·삭제(CRUD) ============================================================ */


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


/* ============================================================ 중복 등록·잘못된 입력 검사 ============================================================ */


/* ============================== 운동 종목 중복 등록 검사 ============================== */

/* 
function addExercise(name, bodyPart, equipment) {

    const isDuplicate = exercises.some(exercise => exercise.name === name);

    const id = exercises.map(exercise => exercise.id);

    const newId = Math.max(...id) + 1;

    const exercise = {
        id: newId, name, bodyPart, equipment
    };

    if (isDuplicate)
    {
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