import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsTimeRangeValidConstraint implements ValidatorConstraintInterface {
  validate(dto: any, args: ValidationArguments): boolean {
    const data = args.object as any;

    const { start_time, end_time } = data;

    if (!start_time || !end_time) {
      return false;
    }

    const parseTime = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return NaN;
      }
      return hours * 60 + minutes;
    };

    const startMinutes = parseTime(start_time);
    const endMinutes = parseTime(end_time);

    return !isNaN(startMinutes) && !isNaN(endMinutes) && startMinutes < endMinutes;
  }
}

export function IsTimeRangeValid(validationOptions?: ValidationOptions) {
  return function (target: new (...args: any[]) => any): void {
    registerDecorator({
      target: target, // Constructor of the class
      propertyName: undefined, // Apply at the class level
      options: validationOptions,
      validator: IsTimeRangeValidConstraint,
    });
  };
}
