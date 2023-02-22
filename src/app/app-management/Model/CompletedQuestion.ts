import { CompletedAnswer } from './CompletedAnswer';
export interface CompletedQuestion {
    id?:number;
    content?:string;
    images?:string;
    type?:string;
    answerDTOs?:CompletedAnswer[];
    question_id?:number;
    is_correct?: boolean;
}