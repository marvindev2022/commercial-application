import { Hours } from "@domain/Hours/hours";


export abstract class HoursRepository {    
    abstract create(hours: Hours): Promise<string>;
    abstract updateHours(hoursId:string,hours: Hours): Promise<Hours>;
    abstract deleteHours(id: string): Promise<string>;
    abstract findById(id: string): Promise<Hours>;
    abstract findAll(): Promise<Hours[]>;
}