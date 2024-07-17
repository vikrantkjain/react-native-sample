import {Validator} from 'fluentvalidation-ts';
import {UserInfoValidationTypes} from '@customTypes';
import {AppConstants, Validation} from '@constants';

/**
 * @see https://www.npmjs.com/package/fluentvalidation-ts
 */
class FluentValidation extends Validator<UserInfoValidationTypes> {
  constructor() {
    super();
    this.ruleFor('nameError')
      .notEmpty()
      .withMessage('Please enter your name!')
      .maxLength(100)
      .withMessage("Your name can't be more then 100 chars!");
    this.ruleFor('lastNameError')
      .notEmpty()
      .withMessage('Please enter your Last name!')
      .maxLength(100)
      .withMessage("Your Last name can't be more then 100 chars!");

    this.ruleFor('numberError')
      .notEmpty()
      .withMessage(Validation.MobileNumberError)
      .minLength(10)
      .withMessage(Validation.validMobileNumber)
      .maxLength(10)
      .withMessage(Validation.validMobileNumber)
      .matches(new RegExp(AppConstants.MOBILE_REGEX))
      .withMessage(Validation.validMobileNumber);

    this.ruleFor('emailError')
      .notEmpty()
      .withMessage('Please Enter your email!')
      .emailAddress()
      .withMessage('Please enter valid email!');

    this.ruleFor('passwordError')
      .notEmpty()
      .withMessage(Validation.validPassword)
      .matches(new RegExp(AppConstants.PASSWORD_REGEX))
      .withMessage(Validation.validPasswordDetail);

    this.ruleFor('confirmPasswordError')
      .notEmpty()
      .withMessage(Validation.validConfirmPassword)
      .must((value: string | undefined, allValues: UserInfoValidationTypes) => {
        return value ? value === allValues.passwordError : true;
      })
      .withMessage(Validation.validConfirmPasswordLength);
  }
}

const validations = new FluentValidation();
export const {validate} = validations;
