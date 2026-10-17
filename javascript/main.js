import { exercises } from "./exercises.js";
import { workoutLogs } from "./workoutLogs.js";
import { routine } from "./routine.js";
import fs from "node:fs";
import fsPromises from "node:fs/promises";


/* 
feat:           새로운 기능 추가	
fix:            버그 수정
refactor:       기능 변경 없는 코드 구조 개선	
docs:           문서 수정
test:           테스트 추가·수정	

git add .
git commit -m "feat: JSON 저장·불러오기 및 비동기 처리"
git push 
*/


// ================================================================================

//#region /* ==================== 운동 종목 검색·부위별 필터링 ==================== */


/* // 운동 종목 검색 
// ================================================================================

function searchExercise(keyword) {

    const result = exercises.filter(exercise => exercise.name.includes(keyword));

    console.log(result);
}

searchExercise("프레스"); 

// ================================================================================
*/


/* // 운동 종목 부위별 필터링
// ================================================================================

function filterExercisesByBodyPart(bodyPart) {
    
    const body = exercises.filter(exercise => exercise.bodyPart === bodyPart);

    return body;
}

console.log(filterExercisesByBodyPart("legs"));
console.log(filterExercisesByBodyPart("back"));

// ================================================================================
*/


//#endregion



//#region /* ============================== 운동 종목 추가·조회·수정·삭제(CRUD) ============================== */


/* // 운동 종목 조회
// ================================================================================

console.log(exercises.filter(exercise => exercise.bodyPart === "legs"));

console.log(exercises.find(exercise => exercise.id === 3));

console.log(exercises.map(exercise => exercise.name));

// ================================================================================
*/


/* // 운동 종목 추가
// ================================================================================

exercises.push({ id: 6, name: "데드리프트", bodyPart: "back", equipment: "barbell" });

console.log(exercises);

// ================================================================================

function addExercise(id, name, bodyPart, equipment) {

    const exercise = {
        id, name, bodyPart, equipment
    };

    exercises.push(exercise);
}

addExercise(6, "데드리프트", "back", "barbell");

console.log(exercises);

// ================================================================================

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

// ================================================================================
*/


/* // 운동 종목 삭제
// ================================================================================

function deleteExercise(id) {

    const result = exercises.filter(exercise => exercise.id !== id);

    console.log(result);
}

deleteExercise(3);

// ================================================================================

function deleteExercise(id) {

    const index = exercises.findIndex(exercise => exercise.id === id);
    
    if (index !== -1) {
        exercises.splice(index, 1);
    }
}

deleteExercise(5);

console.log(exercises);

// ================================================================================
*/


/* // 운동 종목 수정 
// ================================================================================

function updateExercise(id) {

    const result = exercises.find(exercise => exercise.id === id);

    console.log(result)
}

updateExercise(3);

// ================================================================================

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

// ================================================================================
*/


//#endregion



//#region /* ============================== 중복 등록·잘못된 입력 검사 ============================== */


/* // 운동 종목 중복 등록 검사
// ================================================================================

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
    
    exercises.push(exercise);

}

addExercise("스쿼트", "legs", "barbell");

addExercise("풀업", "back", "bodyweight");
console.log(exercises);

// ================================================================================

function addWorkoutLog(exerciseId, date, weight, reps, set) {

    const isDuplicate = workoutLogs.some(workout => workout.exerciseId === exerciseId && workout.date === date && workout.set === set);

    const id = workoutLogs.map(exercise => exercise.id);

    const newId = Math.max(...id) + 1;

    const workout = {
        id: newId, exerciseId, date, weight, reps, set
    };

    if (isDuplicate) {
        console.log("이미 등록된 기록입니다.")
        return;
    }
    
    workoutLogs.push(workout);
}

// ================================================================================
*/


/* // 운동 종목 입력값 유효성 검사 
// ================================================================================

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

// ================================================================================
*/


//#endregion



//#region /* ============================== 무게·횟수·세트·날짜별 운동 기록 CRUD ============================== */


/* // 운동 기록 등록 (Create) 
// ================================================================================

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

addWorkoutLog(6, "2026-10-16", 20, 15, 1);
console.log(workoutLogs.at(-1));

// ================================================================================
*/


/* // 운동 기록 조회 (Read) 
// ================================================================================

function getWorkoutLogById(id) {
    
    const getLogs = workoutLogs.find(logs => logs.id === id);

    return getLogs;
}

console.log(getWorkoutLogById(3));
console.log(getWorkoutLogById(100));

// ================================================================================

function getWorkoutLogsByExerciseId(exerciseId) {
    
    const getLogs = workoutLogs.filter(logs => logs.exerciseId === exerciseId);

    return getLogs;
}

console.log(getWorkoutLogsByExerciseId(1));
console.log(getWorkoutLogsByExerciseId(100));

// ================================================================================

function getWorkoutLogsByDate(date) {
    
    const getLogs = workoutLogs.filter(logs => logs.date === date);

    return getLogs;
}

console.log(getWorkoutLogsByDate("2026-10-15"));
console.log(getWorkoutLogsByDate("2026-10-20"));

// ================================================================================
*/


/* // 운동 기록 수정 (Update) 
// ================================================================================

function updateWorkoutLog(id, weight, reps) {
    
    const getLogs = workoutLogs.find(logs => logs.id === id);

    if (getLogs) {
        getLogs.weight = weight;
        getLogs.reps = reps;
    }

    console.log(getLogs);
}

updateWorkoutLog(3, 70, 12);

// ================================================================================
*/


/* // 운동 기록 삭제 (Delete) 
// ================================================================================

function deleteWorkoutLog(id) {
    
    const getLogs = workoutLogs.findIndex(logs => logs.id === id);

    if (getLogs !== -1) {
        workoutLogs.splice(getLogs, 1)
    }
}

deleteWorkoutLog(3);
console.log(workoutLogs.find(logs => logs.id === 3));
console.log(workoutLogs.find(logs => logs.id === 4));

// ================================================================================
*/


//#endregion



//#region /* ============================== 세트별·일별 운동량 계산 ============================== */


/* // 세트별 운동량 계산 
// ================================================================================

function calculateSetVolume(weight, reps) {

    return weight * reps;
}

console.log(calculateSetVolume(60, 15));
console.log(calculateSetVolume(100, 10));

// ================================================================================
*/

/* 
// 일별 운동량 계산 
// ================================================================================
 
function calculateDailyVolume(date) {

    // 1. 해당 날짜의 운동 기록 찾기
    const dailyLogs = workoutLogs.filter(logs => logs.date === date);

    // 2. 각 기록의 운동량 계산 및 합산
    const sum = dailyLogs.reduce((total, log) => { return total + log.weight * log.reps }, 0);

    // 4. 합산 결과 반환
    return sum;
}

console.log(calculateDailyVolume("2026-10-15"));

// ================================================================================
*/


/* // 운동 종목별 운동량 계산 
// ================================================================================

function calculateExerciseVolume(exerciseId) {

    // 1. 해당 운동 종목의 기록만 필터링
    const exerciseLogs = workoutLogs.filter(logs => logs.exerciseId === exerciseId);

    // 2. 각 기록의 볼륨을 reduce()로 합산
    const sum = exerciseLogs.reduce((total, log) => { return total + log.weight * log.reps }, 0);

    // 3. 결과 반환
    return sum;
}

console.log(calculateExerciseVolume(1));

// ================================================================================
*/


/* // 운동 종목별 운동량 계산 
// ================================================================================

function calculateExerciseDailyVolume(date, exerciseId) {
    
    // 1. 해당 날짜이면서 해당 운동 종목인 기록 필터링
    const exercisedailyLogs = workoutLogs.filter(logs => (logs.date === date && logs.exerciseId === exerciseId));

    // 2. reduce()로 볼륨 합산
    const sum = exercisedailyLogs.reduce((total, log) => { return total + log.weight * log.reps },0);

    // 3. 결과 반환
    return sum;
}

console.log(calculateExerciseDailyVolume("2026-10-15", 1));

// ================================================================================
*/


//#endregion



//#region /* ============================== 요일별 루틴 등록·수정·삭제 CRUD ============================== */


/* // 요일별 운동 루틴 조회(Read) 
// ================================================================================

function getRoutineByDay(weekType, day) {

    // 두 조건이 일치하는 루틴 조회
    const dailyRoutine = routine.find(route => (route.weekType === weekType && route.day === day));

    // 조회 결과 반환
    return dailyRoutine;
}

console.log(getRoutineByDay("A", "monday"));
console.log(getRoutineByDay("B", "wednesday"));

// ================================================================================
*/


/* // 요일별 운동 루틴 등록(Create) 
// ================================================================================

function addRoutine(weekType, day, isRestDay, exerciseIds) {

    // 1. 중복 확인
    const isDuplicate = routine.some(route => route.weekType === weekType && route.day === day);

    if (isDuplicate) {
        console.log("중복 등록 거부")
        return;
    }

    // 2. 새로운 ID 생성
    const id = routine.map(route => route.id);

    const newId = Math.max(...id) + 1;

    // 3. 새로운 객체 생성
    const route = {
        id: newId, weekType, day, isRestDay, exerciseIds
    };

    // 4. 배열에 추가
    routine.push(route);
    
    console.log("등록 성공");
}

addRoutine("A", "monday", false, [1, 2, 3]);

addRoutine("C", "monday", false, [1, 2, 3]);
console.log(routine.at(-1));

// ================================================================================
*/


/* // 요일별 운동 루틴 수정(Update) 
// ================================================================================
 
function updateRoutine(id, isRestDay, exerciseIds) {

    // 1. id로 수정할 루틴 찾기
    const updateRoute = routine.find(route => route.id === id);

    // 2. 루틴이 존재하면 isRestDay 수정
    if (updateRoute) {
        updateRoute.isRestDay = isRestDay;
        updateRoute.exerciseIds = exerciseIds;
    }

    console.log(updateRoute);
}

updateRoutine(6, false, [1, 2, 3]);

// ================================================================================
*/


/* // 요일별 운동 루틴 삭제(Delete) 
// ================================================================================

function deleteRoutine(id) {

    // 1. id에 해당하는 루틴의 배열 인덱스 찾기
    const deleteRoute = routine.findIndex(route => route.id === id);

    // 2. 해당 루틴이 존재하는지 확인
    if (deleteRoute !== -1) {
        routine.splice(deleteRoute, 1);
    }   
}

deleteRoutine(6);

console.log(routine.find(route => route.id === 6));
console.log(routine.find(route => route.id === 7));

// ================================================================================
*/


//#endregion



//#region /* ============================== JSON 저장·불러오기 및 비동기 처리 ============================== */


/* // JSON.stringify()로 객체를 JSON 문자열로 변환 
// ================================================================================
 
function convertExercisesToJSON() {

    // 1. exercises 배열을 JSON 문자열로 변환
    const jsondata = JSON.stringify(exercises)


    // 2. 변환된 문자열 반환
    console.log(typeof exercises);
    console.log(typeof jsondata);

    return jsondata;
}

console.log(convertExercisesToJSON());

// ================================================================================
*/


/* // JSON.parse()로 JSON 문자열을 객체로 변환 
// ================================================================================

function convertJSONToExercises() {

    // 1. exercises 배열을 JSON 문자열로 변환
    const jsondata = JSON.stringify(exercises);

    // 2. JSON 문자열을 JavaScript 배열로 복원
    const restoredata = JSON.parse(jsondata);

    // 3. 복원한 배열 반환
    console.log(typeof restoredata);
    console.log(Array.isArray(restoredata));

    return restoredata;
}

// 함수 실행 및 결과 확인

console.log(convertJSONToExercises());

// ================================================================================
*/


/* // Node.js fs 모듈로 JSON 파일 저장
// ================================================================================

function saveExercisesToJSON() {

    // 1. exercises 배열을 JSON 문자열로 변환
    const jsondata = JSON.stringify(exercises, null, 2);

    // 2. JSON 문자열을 exercises.json 파일에 저장
    fs.writeFileSync("./exercises.json", jsondata);

    return jsondata;
}

saveExercisesToJSON();

// ================================================================================
*/


/* // JSON 파일에서 데이터 불러오기
// ================================================================================

function loadExercisesFromJSON() {

    // 1. exercises.json 파일 읽기
    const jsondata = fs.readFileSync("./exercises.json", "utf-8");

    // 2. JSON 문자열을 JavaScript 배열로 변환
    const restoredata = JSON.parse(jsondata);

    // 3. 복원한 배열 반환
    console.log(typeof restoredata);
    console.log(Array.isArray(restoredata));

    return restoredata;
}

// 함수 실행 및 결과 확인
console.log(loadExercisesFromJSON());

// ================================================================================
*/


/* // async/await를 사용한 비동기 저장 및 불러오기 
// ================================================================================
 
// 문제 A: 비동기 저장
async function saveExercisesAsync() {

    // 1. exercises 배열을 JSON 문자열로 변환
    const jsondata = JSON.stringify(exercises);

    // 2. await를 사용해서 JSON 파일 저장
    await fsPromises.writeFile("./exercises.json", jsondata);

    // 3. 저장 완료 메시지 출력
    console.log("운동 종목 저장 완료");
}

// 문제 B: 비동기 불러오기
async function loadExercisesAsync() {
    
    // 1. await를 사용해서 JSON 파일 읽기
    const jsondata = await fsPromises.readFile("./workoutLogs.json", "utf-8");

    // 2. JSON 문자열을 배열로 복원
    const restoredata = JSON.parse(jsondata);

    // 3. 복원한 배열 반환
    console.log(Array.isArray(restoredata));

    return restoredata;
}

await saveExercisesAsync();

const loaded = await loadExercisesAsync();

console.log(loaded);

// ================================================================================

async function saveworkoutLogsAsync() {
    
    const jsondata = JSON.stringify(workoutLogs);

    await fsPromises.writeFile("./workoutLogs.json", jsondata);

    console.log("운동 종목 저장 완료");
}

async function loadworkoutLogsAsync() {
    
    const jsondata = await fsPromises.readFile("./workoutLogs.json", "utf-8");

    const restoredata = JSON.parse(jsondata);

    return restoredata;
}

// ================================================================================
*/


/* // 저장된 데이터가 없거나 파일을 읽지 못할 때 예외 처리 
// ================================================================================

async function loadExercisesWithErrorHandling() {

    try {
        // 1. JSON 파일 읽기
        const jsondata = await fsPromises.readFile("./exercises.json", "utf-8");

        // 2. JSON 문자열을 배열로 변환
        const restoredata = JSON.parse(jsondata);

        // 3. 복원한 배열 반환
        console.log(Array.isArray(restoredata));

        return restoredata;
    }
    catch (error) {
        // 4. 오류 메시지 출력
        console.log("운동 종목 불러오기 실패")

        // 5. 빈 배열 반환
        return [];
    }
}

// 함수 실행 및 결과 확인
const loaded = await loadExercisesWithErrorHandling();

console.log(loaded);

// ================================================================================
*/


//#endregion



//#region /* ============================== 통합 테스트 및 기본 기능 완성 ============================== */


/* // 운동 종목 등록 → JSON 파일 저장 → 불러오기
// ================================================================================
 
async function testExerciseIntegration() {

    // 1. 새로운 운동 종목 등록
    function addExercise(name, bodyPart, equipment) {

         // 2. 새 운동 종목이 존재하는지 확인
        const isDuplicate = exercises.some(exercise => exercise.name === name);

        if (isDuplicate) {
        console.log("이미 등록된 운동입니다.")
        return;
        }

        const ids = exercises.map(exercise => exercise.id);

        const newId = Math.max(...ids) + 1;

        const exercise = {
            id: newId, name, bodyPart, equipment
        }

        exercises.push(exercise);
    }

    addExercise("케이블 크로스오버", "chest", "cable");
        
    // 3. JSON 파일 저장
    async function saveExercisesAsync() { 

        const jsondata = JSON.stringify(exercises)
    
        await fsPromises.writeFile("./exercises.json", jsondata);

        console.log("운동 종목 저장 완료");
        }
    
    // 4. JSON 파일 불러오기
    async function loadExercisesAsync() { 
        
        const jsondata = await fsPromises.readFile("./exercises.json", "utf-8");

        const restoredata = JSON.parse(jsondata);
        
        console.log(Array.isArray(restoredata));

        return restoredata;
    }

    // 5. 검사 결과 출력

    await saveExercisesAsync();

    const loaded = await loadExercisesAsync();

    const exists = loaded.some(exercise => exercise.name === "케이블 크로스오버");

    console.log(exists);

}

await testExerciseIntegration();

// ================================================================================
*/


/* // 운동 기록 등록 및 저장 통합 테스트
// ================================================================================

async function testWorkoutLogIntegration() {
    
    // 1. 운동 기록 등록
    addWorkoutLog(6, "2026-10-16", 20, 15, 1);

    // 2. JSON 파일 저장
    await saveworkoutLogsAsync();

    // 3. JSON 파일 불러오기
    const loaded = await loadworkoutLogsAsync();
    
    // 4. Array.isArray() 확인
    console.log(Array.isArray(loaded));

    // 5. some()으로 등록 여부 확인
    const exists = loaded.some(workout => workout.exerciseId === 6 && workout.date === "2026-10-16" && workout.set === 1);

    console.log(exists);
}

await testWorkoutLogIntegration();

// ================================================================================
*/


/* // JSON 운동 기록 불러오기 → 총 운동 볼륨 계산
// ================================================================================

async function loadworkoutLogsAsync() {
    
    const jsondata = await fsPromises.readFile("./workoutLogs.json", "utf-8");

    const restoredata = JSON.parse(jsondata);

    return restoredata;
}
    
function calculateDailyVolume(logs, date) {

    const dailyLogs = logs.filter(logs => logs.date === date);

    const sum = dailyLogs.reduce((total, log) => { return total + log.weight * log.reps }, 0);

    return sum;
}
    

async function testWorkoutVolumeIntegration() {

    // 1. JSON 운동 기록 불러오기
    const loaded = await loadworkoutLogsAsync();

    // 2. 2026-10-16 날짜의 기록만 필터링

    // 3. reduce()로 총 운동 볼륨 계산
    const totalVolume = calculateDailyVolume(loaded, "2026-10-16");

    // 4. 결과 출력
    console.log(totalVolume);
}

await testWorkoutVolumeIntegration();

// ================================================================================
*/


/* // 운동 기록 수정·삭제 → JSON 저장 → 재확인
// ================================================================================

async function loadworkoutLogsAsync() {
    
    const jsondata = await fsPromises.readFile("./workoutLogs.json", "utf-8");

    const restoredata = JSON.parse(jsondata);

    return restoredata;
}

async function saveworkoutLogsAsync(logs) {
    
    const jsondata = JSON.stringify(logs);

    await fsPromises.writeFile("./workoutLogs.json", jsondata);

    console.log("운동 종목 저장 완료");
}

function updateWorkoutLog(log, id, weight, reps) {
    
    const getLogs = log.find(logs => logs.id === id);

    if (getLogs) {
        getLogs.weight = weight;
        getLogs.reps = reps;
    }
}


function deleteWorkoutLog(log, id) {
    
    const getLogs = log.findIndex(logs => logs.id === id);

    if (getLogs !== -1) {
        log.splice(getLogs, 1)
    }
}



async function testWorkoutLogUpdateDeleteIntegration() {

    // 1. JSON 파일에서 운동 기록 불러오기
    const loaded = await loadworkoutLogsAsync();

    // 2. 특정 운동 기록 수정
    updateWorkoutLog(loaded, 28, 40, 15);

    // 3. 수정된 기록 JSON 저장
    await saveworkoutLogsAsync(loaded);

    // 4. 다시 불러와 수정 여부 확인
    const updatedLoaded = await loadworkoutLogsAsync();
    console.log(updatedLoaded.find(log => log.id === 28));

    // 5. 특정 운동 기록 삭제
    deleteWorkoutLog(loaded, 28);

    // 6. 삭제된 결과 JSON 저장
    await saveworkoutLogsAsync(loaded);

    // 7. 다시 불러와 삭제 여부 확인
    const deletedLoaded = await loadworkoutLogsAsync();
    console.log(deletedLoaded.some(log => log.id === 28));
}

await testWorkoutLogUpdateDeleteIntegration();


// ================================================================================
*/


/* // 운동 루틴과 운동 종목 데이터 연결
// ================================================================================

function testRoutineExerciseIntegration() {

    // 1. 기존 운동 루틴 선택

    // 2. 루틴의 운동 ID 목록 가져오기
    const selectedRoutine = routine.find(route => route.id === 1);

    const exerciseIds = selectedRoutine.exerciseIds;
    
    // 3. 운동 ID에 해당하는 운동 정보 찾기
    const result = exerciseIds.map(id => {
        const exercise = exercises.find(ex => ex.id === id);

        return { name: exercise.name, bodyPart: exercise.bodyPart };
    })

    // 4. 결과 출력
    console.log(result);
}

testRoutineExerciseIntegration();

// ================================================================================
 */

// 전체 기능 통합 테스트 및 코드 정리
// ================================================================================



// ================================================================================


//#endregion