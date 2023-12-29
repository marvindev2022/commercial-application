import { HoursRepository } from '@app/repositories/Hours/hours';
import { Hours } from '@domain/Hours/hours';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface RegisterHoursDTO {
  time: Date;
  scheduleId: string;
}

export interface UpdateHoursDTO extends RegisterHoursDTO {
  id?: string;
}

@Injectable()
export class HoursService {
  constructor(private hoursRepository: HoursRepository) {}

  async create(request: RegisterHoursDTO): Promise<Error | string> {
    const newHours = new Hours(request);

    try {
      const hours = await this.hoursRepository.create(newHours);

      if (!hours) {
        throw new BadRequestException('Erro ao criar o cronograma');
      }

      return hours;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getHoursById(id: string): Promise<Hours> {
    const hours = await this.hoursRepository.findById(id);

    if (!hours) {
      throw new BadRequestException('Error getting schedule');
    }

    return hours;
  }

    

    async getAllHours(): Promise<Hours[]> {
        const hours = await this.hoursRepository.findAll();
    
        if (!hours) {
        throw new BadRequestException('Error getting schedules');
        }
    
        return hours;
    }

    async updateHours(
        request: UpdateHoursDTO,
        id: string,
    ): Promise<Hours> {
        const newHours = new Hours(request);
        const hours = await this.hoursRepository.updateHours(
        id,
        newHours,
        );
    
        if (!hours) {
        throw new BadRequestException('Error updating schedule');
        }
    
        return hours;
    }

    async deleteHours(id: string): Promise<string> {
        const hours = await this.hoursRepository.deleteHours(id) as any;
    
        if ( hours === null || !hours ) {
        throw new BadRequestException('Error deleting schedule');
        }
    
        return 'Hora deletada com sucesso';
    }
}
