export interface SubjectDropdown {
    key?: number;
    value?: string;
}

export interface Answer {
    id: number;
    content?: string;
    images?: any[];
    isCorrect?: boolean;
    status?: boolean;
    note?: string;
    questionId?: number;
}

enum QuestionType {
    SINGLE_SELECT = 'SINGLE_SELECT',
    MULTIPLE_SELECT = 'MULTIPLE_SELECT',
    FILL_IN_BLANK = 'FILL_IN_BLANK'
}

enum QuestionLevel {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    DIFFICULT = 'DIFFICULT'
}

export interface Question {
    id?: number;
    content?: string;
    images?: any[];
    type?: string;
    numberOfAnswer?: number;
    numberOfCorrectAnswer?: number;
    level?: QuestionLevel;
    status?: boolean;
    note?: string;
    subjectId?: number;
    answers?: Answer[];
}