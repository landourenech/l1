export type StudentData = {
    id: number;
    name: string;
    exercises: string[];
}

export const data: StudentData[] = [
    { id: 1, name: "OUSMANE Mouhammed Sanny", exercises: ["/sanny/s1.png", "/sanny/s2.png", "/sanny/s3.png", "/sanny/s4.png", "/sanny/s5.png"] },
    { id: 2, name: "KLIKO César", exercises: ["/kliko/kliko1.png", "/kliko/kliko2.png", "/kliko/kliko3.png", "/kliko/kliko4.png", "/kliko/kliko5.png"] },
    { id: 3, name: "AGWU Salomon", exercises: ["/agwu/a1.png", "/agwu/a2.png", "/agwu/a3.png", "/agwu/a4.png", "/agwu/a5.png"] },
    { id: 4, name: "BOUASSA Gloire", exercises: ["/bouassa/b1.png", "/bouassa/b2.png", "/bouassa/b4.png", "#", "/bouassa/b5.png"] },
    { id: 5, name: "LANDOU-NZUZI Mechack", exercises: ["/renech/l1.png", "/renech/l2.png", "/renech/l3.png", "#", "#"] },


];

const FALLBACK_IMAGE = "/manque.png";

export const getStudentExercises = (studentExercises: string[]): string[] => {
    const fullList = [...studentExercises];
    while (fullList.length < 5) {
        fullList.push(FALLBACK_IMAGE);
    }
    return fullList;
};
