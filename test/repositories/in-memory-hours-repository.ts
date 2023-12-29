import { HoursRepository } from "@app/repositories/Hours/hours";
import { Hours } from "@domain/Hours/hours";
import { NotFoundException } from "@nestjs/common";




export class InMemoryHoursRepository implements HoursRepository {
    public hours: Hours[] = [];

    async create(hours: Hours): Promise<string> {
        try {
            this.hours.push(hours);
            return hours.props.id as string;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: string): Promise<Hours> {
        const hours = this.hours.find(
            (hours) => hours.props && hours.props.id === id,
        );

        if (!hours) {
            throw new NotFoundException('Hours not found');
        }

        return hours;
    }

    async findHoursByTime(time: Date): Promise<Hours[]> {
        const hours = this.hours.filter(
            (hours) => hours.props.time === time,
        );

        if (!hours.length) {
            throw new NotFoundException('Hours not found');
        }

        return hours;
    }

    async findAll(): Promise<Hours[]> {
        return this.hours;
    }

    async updateHours(
        hoursId: string,
        hours: Hours,
    ): Promise<Hours> {
        const findHours = this.hours.find(
            (hours) => hours.props.id === hoursId,
        );

        if (!findHours) {
            throw new NotFoundException('Hours not found');
        }

        Object.assign(findHours, hours);

        return findHours;
    }

    async deleteHours(hoursId: string): Promise<string> {
        const findHours = this.hours.find(
            (hours) => hours.props.id === hoursId,
        );

        if (!findHours) {
            throw new NotFoundException('Hours not found');
        }

        this.hours.splice(this.hours.indexOf(findHours));

        return 'Hours deleted';
    }

}