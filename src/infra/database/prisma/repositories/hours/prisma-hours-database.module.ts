import { HoursRepository } from "@app/repositories/Hours/hours";
import { PrismaService } from "../../prisma.service";
import { PrismaHoursRepository } from "./prisma-hours-repository";
import { Module } from "@nestjs/common";



@Module({
    providers: [
        PrismaService,
        {
        provide: HoursRepository,
        useClass: PrismaHoursRepository,
        },
    ],
    exports: [
        {
        provide: HoursRepository,
        useClass: PrismaHoursRepository,
        },
    ],
    })
export class HoursDatabaseModule {}