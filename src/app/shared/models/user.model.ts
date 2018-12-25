import {User} from '../../core/models/user.model';

export class UserDetails extends User {

    constructor(id: number,
                username: string,
                password: string,
                firstname: string,
                lastname: string,
                email: string) {
        super(id,
            username,
            password,
            firstname,
            lastname,
            email
        );
    }
}

export enum UnitTypeEnum {
    CENTRAL = 'CENTRAL',
    STATE = 'STATE',
    STORE = 'STORE'
}

export enum UserProfile {
    ADMINISTRATION = 'admin',
    MODERATION = 'moderator',
    CONTRIBUTION = 'contributor',
    READING = 'reader'
}

export enum UserAccountType {
    MODERATION = 'MODERATION',
    CONTRIBUTION = 'CONTRIBUTION',
    READING = 'READING',
    ADMINISTRATION = 'ADMINISTRATION'
}

export enum Statut {
    CANCELED = 'CANCELED',
    DELETED = 'DELETED',
    IN_MODERATION = 'IN_MODERATION',
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    TO_BE_PUBLISHED = 'TO_BE_PUBLISHED',
    TO_BE_MODERATED = 'TO_BE_MODERATED',
    RECYCLED = 'RECYCLED',
    RESCHEDULED = 'RESCHEDULED',
    READ = 'READ',
    UN_READ = 'UN_READ',
    TREATED = 'TREATED',
    UN_TREATED = 'UN_TREATED',
    REJECTED = 'REJECTED',
    SUPPRIME = 'SUPPRIME'
}
