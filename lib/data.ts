export type StudentData = {
    id: number;
    name: string;
    exercises: string[];
}

export const data: StudentData[] = [
    { id: 1, name: "Lucas Bernard", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 2, name: "Emma Petit", exercises: ["/1.png", "/2.png", "/3.png"] },
    { id: 3, name: "Hugo Dubois", exercises: [] },
    { id: 4, name: "Chloé Moreau", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 5, name: "Nathan Laurent", exercises: ["/1.png"] },
    { id: 6, name: "Manon Garcia", exercises: ["/1.png", "/2.png", "/3.png", "/4.png"] },
    { id: 7, name: "Enzo Michel", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 8, name: "Jade Lefebvre", exercises: ["/1.png", "/2.png"] },
    { id: 9, name: "Léo Roux", exercises: [] },
    { id: 10, name: "Sarah David", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 11, name: "Louis Bertrand", exercises: ["/1.png", "/2.png", "/3.png"] },
    { id: 12, name: "Lina Fournier", exercises: ["/1.png", "/2.png", "/3.png", "/4.png"] },
    { id: 13, name: "Arthur Girard", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 14, name: "Mila Bonnet", exercises: ["/1.png"] },
    { id: 15, name: "Adam Vincent", exercises: [] },
    { id: 16, name: "Léa Lambert", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 17, name: "Jules Morel", exercises: ["/1.png", "/2.png"] },
    { id: 18, name: "Inès Roux", exercises: ["/1.png", "/2.png", "/3.png", "/4.png"] },
    { id: 19, name: "Gabriel Andre", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 20, name: "Zoé Lefevre", exercises: ["/1.png"] },
    { id: 21, name: "Maël Mercier", exercises: [] },
    { id: 22, name: "Alice Dupont", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
    { id: 23, name: "Tom Leroy", exercises: ["/1.png", "/2.png", "/3.png"] },
    { id: 24, name: "Eva Lemaire", exercises: ["/1.png", "/2.png", "/3.png", "/4.png"] },
    { id: 25, name: "Noah Fontaine", exercises: ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png"] },
];

const FALLBACK_IMAGE = "/manque.png";

export const getStudentExercises = (studentExercises: string[]): string[] => {
    const fullList = [...studentExercises];
    while (fullList.length < 5) {
        fullList.push(FALLBACK_IMAGE);
    }
    return fullList;
};
