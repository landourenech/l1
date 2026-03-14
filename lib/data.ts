export type StudentData = {
    id: number;
    name: string;
    exercises: string[];
}

export const data: StudentData[] = [
    { id: 1, name: "OUSMANE Mouhammed Sanny", exercises: ["/sanny/s1.png", "/sanny/s2.png", "/sanny/s3.png", "/sanny/s4.png", "/sanny/s5.png"] },
    { id: 2, name: "KLIKO César", exercises: ["/kliko/kliko1.png", "/kliko/kliko2.png", "/kliko/kliko3.png", "/kliko/kliko4.png", "/kliko/kliko5.png"] },
    { id: 3, name: "AGWU Salomon", exercises: ["/agwu/a1.png", "/agwu/a2.png", "/agwu/a3.png", "/agwu/a4.png", "/agwu/a5.png"] },
    { id: 4, name: "BOUASSA Gloire", exercises: ["/bouassa/b1.png", "/bouassa/b2.png", "/bouassa/b4.png", "/bouassa/b4.png", "/bouassa/b5.png"] },
    { id: 5, name: "LANDOU-NZUZI Mechack", exercises: ["/renech/l1.png", "/renech/l2.png", "/renech/l3.png", "/renech/l4.png", "/renech/l5.png"] },
    { id: 6, name: "BOUSSOUGOU NDZINDZI Mesmin", exercises: ["/mesmin/m1.png", "/mesmin/m2.png", "/mesmin/m3.png", "/mesmin/m4.png", "/mesmin/m5.png"] },
    { id: 7, name: "KADIATA ANTCHOUET Bill Trésor", exercises: ["/tresor/t1.png", "/tresor/t2.png", "/tresor/t3.png", "/tresor/t4.png", "/tresor/t5.png"] },
    { id: 8, name: "NGATÉ SOULYEMANE", exercises: ["/ngate/n1.png", "/ngate/n2.png", "/ngate/n3.png", "/ngate/n4.png", "/ngate/n5.png"] },
    { id: 9, name: "ONKARA Manassé Josué", exercises: ["/onkara/o1.jpeg", "/onkara/o2.jpeg", "/onkara/o3.jpeg", "/onkara/o4.jpeg", "/onkara/o5.jpeg"] },
    { id: 10, name: "BADAROU YASSIR Marc ", exercises: ["/yassir/y1.png", "/yassir/y2.png", "/yassir/y3.png", "/yassir/y4.png", "/yassir/y5.png"] },
    { id: 11, name: "BOUASSA BOUILINGUI LEWIS", exercises: ["/lewis/l1.png", "/lewis/l2.png", "/lewis/l3.png", "/lewis/l4.png", "/lewis/l5.png"] },
    { id: 12, name: "HOUNNOU Kassi Wilfried", exercises: ["/hounnou/h1.png", "/hounnou/h2.png", "/hounnou/h3.png", "/hounnou/h4.png", "/hounnou/h5.png"] },
    { id: 13, name: "KADAI Espoir ", exercises: ["/espoir/e1.png", "#", "/espoir/e3.png", "/espoir/e4.png", "/espoir/e5.png"] },
    { id: 14, name: "BAYI Harrissia Tiffany Rosine", exercises: ["/rossine/r1.png", "/rossine/r2.png", "/rossine/r3.png", "/rossine/r4.png", "/rossine/r5.png"] },
    { id: 15, name: "OKOMO ONDO vivaldy-mhirna-clode", exercises: ["/vivaldy/v1.png", "/vivaldy/v2.png", "/vivaldy/v3.png", "/vivaldy/v4.png", "/vivaldy/v5.png"] },
    { id: 16, name: "ASSOUMOU EKANG Nick Franchy", exercises: ["/assoumou/a1.png", "/assoumou/a2.png", "#", "/assoumou/a4.png", "/assoumou/a5.png"] },
    { id:17,  name: "KADIATA NKOUMBA Ariel Sacre", exercises: ["/ariel/a1.png", "/ariel/a2.png", "/ariel/a3.png", "/ariel/a4.png", "/ariel/a5.png"] },

];

const FALLBACK_IMAGE = "/manque.png";

export const getStudentExercises = (studentExercises: string[]): string[] => {
    const fullList = [...studentExercises];
    while (fullList.length < 5) {
        fullList.push(FALLBACK_IMAGE);
    }
    return fullList;
};
