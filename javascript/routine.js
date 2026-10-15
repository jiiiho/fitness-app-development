/* ============================== 요일별 운동 루틴 데이터 구조 설계 ============================== */

export const routine = [

    { id: 1, weekType: "A", day: "monday", isRestDay: false, exerciseIds: [1, 2, 3, 4, 5] },
    { id: 2, weekType: "B", day: "monday", isRestDay: true, exerciseIds: [] },

    { id: 3, weekType: "A", day: "tuesday", isRestDay: false, exerciseIds: [6, 7, 8, 9, 10, 11] },
    { id: 4, weekType: "B", day: "tuesday", isRestDay: true, exerciseIds: [] },

    { id: 5, weekType: "A", day: "wednesday", isRestDay: false, exerciseIds: [12, 13, 14, 15, 16, 17] },
    { id: 6, weekType: "B", day: "wednesday", isRestDay: true, exerciseIds: [] },

    { id: 7, weekType: "A", day: "thursday", isRestDay: false, exerciseIds: [1, 2, 3, 4, 5] },
    { id: 8, weekType: "B", day: "thursday", isRestDay: true, exerciseIds: [] },

    { id: 9, weekType: "A", day: "friday", isRestDay: false, exerciseIds: [6, 7, 8, 9, 10, 11] },
    { id: 10, weekType: "B", day: "friday", isRestDay: true, exerciseIds: [] },

    { id: 11, weekType: "A", day: "saturday", isRestDay: false, exerciseIds: [12, 13, 14, 15, 16, 17] },
    { id: 12, weekType: "B", day: "saturday", isRestDay: true, exerciseIds: [] },

    { id: 13, weekType: "A", day: "sunday", isRestDay: true, exerciseIds: [] },
    { id: 14, weekType: "B", day: "sunday", isRestDay: true, exerciseIds: [] },

]