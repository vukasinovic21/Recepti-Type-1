export interface User 
{
    name: string,
    lastname: string
    username: string,
    email: string,
    passwordHash: string,
    questionId: string,
    forgotPasswordAnswerHash: string, 
    dateOfBirth: Date,
    sex: string
}
