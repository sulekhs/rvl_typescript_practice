import { ValidatorConstraintInterface, ValidatorConstraint, ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';
import Regions from './Regions';


@ValidatorConstraint()
class IsRegionExistConstraint implements ValidatorConstraintInterface {
    private readonly val: (input: string, format: string) => boolean //(input:string, format:string) => boolean

    constructor() {
        //this.val = (input: string, format: string) => moment(input, format).isValid()  //(input, format).isValid()
        //this.val = (input: string, format: string) => Regions(input, format).isValid()
    }

    validate(textThatShouldBeInEnum:string, args: ValidationArguments) : boolean {
        // const x = () => {
        //     for(let item in Regions) {
        //         if (isNaN(Number(item))) {
        //             console.log(item);
        //         }
        //         return item as unknown as boolean; 
        //     }
        // }
        //return x!;
            
        
        return (
            this.val(textThatShouldBeInEnum, `${Regions.us}`) || //`${Regions.us}`
            this.val(textThatShouldBeInEnum, `${Regions.ca}`) //`${Regions.ca}`) 
        )
    }

    defaultMessage(args:  ValidationArguments): string {
        const property = args;
        return `${property} does not exist select available regions`
    }
}

export function IsRegionExist(validationOptions?: ValidationOptions) {
    return (object:Object, propertyName: string) => {
        registerDecorator({
            target:object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsRegionExistConstraint,
            async: false
        })
    }
}