import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Hours } from '@domain/Hours/hours';


@Injectable()
export class PrismaHoursRepository {
    constructor(private prismaService: PrismaService) {}
    
    async create(hours: Hours): Promise<Hours> {
        try {
        if (hours instanceof Error) {
            throw new BadRequestException(hours.message, {
            cause: hours,
            description: hours.stack,
            });
        }
    
        const newHours = new Hours(hours.props);
        const response = await this.prismaService.hour.create({
            data: {
            scheduleId: newHours.props.scheduleId,
            time: newHours.props.time,
            },
            select: {
            id: true,
            scheduleId: true,
            time: true,
           
            },
        });
        if (!response) {
            throw new BadRequestException('Erro ao criar horário');
        }
        return new Hours(response);
        } catch (error: any) {
        throw new BadRequestException(error.message);
        }
    }
    
    async update(hours: Hours): Promise<Hours> {
        try {
        if (hours instanceof Error) {
            throw new BadRequestException(hours.message, {
            cause: hours,
            description: hours.stack,
            });
        }
    
        const newHours = new Hours(hours.props);
        const response = await this.prismaService.hour.update({
            where: {
            id: newHours.props.id,
            },
            data: {
            
            scheduleId: newHours.props.scheduleId,
            time: newHours.props.time,
            },
            select: {
            id: true,
            scheduleId: true,
            time: true,
            },
        });
        if (!response) {
            throw new BadRequestException('Erro ao atualizar horário');
        }
        return new Hours(response);
        } catch (error: any) {
        throw new BadRequestException(error.message);
        }
    }
    
    async delete(id: string): Promise<void> {
        try {
        const response = await this.prismaService.hour.delete({
            where: {
            id,
            },
        });
        if (!response) {
            throw new BadRequestException('Erro ao deletar horário');
        }
        } catch (error: any) {
        throw new BadRequestException(error.message);
        }
    }
    
    async findById(id: string): Promise<Hours> {
        try {
        const response = await this.prismaService.hour.findUnique({
            where: {
            id,
            },
            select: {
            id: true,
            scheduleId: true,
            time: true,
            },
        });
        if (!response) {
            throw new BadRequestException('Horário não encontrado');
        }
        return new Hours(response);
        } catch (error: any) {
        throw new BadRequestException(error.message);
        }
    }
}