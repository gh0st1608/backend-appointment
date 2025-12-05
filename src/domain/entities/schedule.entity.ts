export interface ScheduleRequired {
  readonly centerId?: number;
  readonly specialtyId?: number;
  readonly medicId?: number;
  readonly date?: string;
}

export interface ScheduleOptional {
  readonly scheduleId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly deletedAt: Date | null;
}

export type ScheduleProperties = ScheduleRequired & Partial<ScheduleOptional>;

export class Schedule {
  private scheduleId: number;
  private centerId?: number;
  private specialtyId?: number;
  private medicId?: number;
  private date?: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(properties: ScheduleProperties) {
    Object.assign(this, properties);
  }

  properties(): ScheduleProperties {
    return {
      scheduleId: this.scheduleId,
      centerId: this.centerId,
      specialtyId: this.specialtyId,
      medicId: this.medicId,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  static create(data: {
    scheduleId: number;
    centerId?: number;
    specialtyId?: number;
    medicId?: number;
    date?: string;
  }): Schedule {
    const now = new Date();

    return new Schedule({
      scheduleId: data.scheduleId,
      centerId: data.centerId,
      specialtyId: data.specialtyId,
      medicId: data.medicId,
      date: data.date,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
    });
  }

  /* update(properties: SchedulePropertiesUpdate): Schedule {
    this.updatedAt = new Date();
    return Object.assign(this, properties);
  } */

  deactivate() {
    this.deletedAt = new Date();
  }
}
