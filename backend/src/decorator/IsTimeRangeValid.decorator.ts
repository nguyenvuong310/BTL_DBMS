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
      return hours * 60 + minutes;
    };

    return parseTime(start_time) < parseTime(end_time);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'timeStart must be earlier than timeEnd';
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
