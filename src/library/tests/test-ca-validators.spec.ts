import { CAValidators } from "../validators/ca-validators";
import { CAFormConfigValidator } from "../class/config/ca-form-config-validator.class";
describe( 'CAValidators', () => {
    let config: CAFormConfigValidator = new CAFormConfigValidator( '' );

    it( 'has required validator', () => {
        expect( CAValidators.required ).toBeTruthy();
    } );

    it( 'has min validator', () => {
        expect( CAValidators.min ).toBeTruthy();
    } );

    it( 'has max validator', () => {
        expect( CAValidators.max ).toBeTruthy();
    } );

    it( 'has requiredTrue validator', () => {
        expect( CAValidators.requiredTrue ).toBeTruthy();
    } );

    it( 'has email validator', () => {
        expect( CAValidators.email ).toBeTruthy();
    } );

    it( 'has minLength validator', () => {
        expect( CAValidators.minLength ).toBeTruthy();
    } );

    it( 'has maxLength validator', () => {
        expect( CAValidators.maxLength ).toBeTruthy();
    } );

    it( 'has pattern validator', () => {
        expect( CAValidators.pattern ).toBeTruthy();
    } );

    it( 'has nullValidator validator', () => {
        expect( CAValidators.nullValidator ).toBeTruthy();
    } );

    it( 'has compose validator', () => {
        expect( CAValidators.compose ).toBeTruthy();
    } );

    it( 'has composeAsync validator', () => {
        expect( CAValidators.composeAsync ).toBeTruthy();
    } );

    it( 'getValidatorByConfig return min validator', () => {
        spyOn( CAValidators, 'min' );
        config.name = CAValidators.VALIDATOR_MIN;
        config.params = [ 1 ];

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.min ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return max validator', () => {
        spyOn( CAValidators, 'max' );
        config.name = CAValidators.VALIDATOR_MAX;
        config.params = [ 7 ];

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.max ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return required validator', () => {
        spyOn( CAValidators, 'required' );
        config.name = CAValidators.VALIDATOR_REQUIRED;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.required ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return requiredTrue validator', () => {
        spyOn( CAValidators, 'requiredTrue' );
        config.name = CAValidators.VALIDATOR_REQUIRED_TRUE;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.requiredTrue ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return email validator', () => {
        spyOn( CAValidators, 'email' );
        config.name = CAValidators.VALIDATOR_EMAIL;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.email ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return minLength validator', () => {
        spyOn( CAValidators, 'minLength' );
        config.name = CAValidators.VALIDATOR_MIN_LENGTH;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.minLength ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return maxLength validator', () => {
        spyOn( CAValidators, 'maxLength' );
        config.name = CAValidators.VALIDATOR_MAX_LENGTH;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.maxLength ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return maxLength validator', () => {
        spyOn( CAValidators, 'pattern' );
        config.name = CAValidators.VALIDATOR_PATTERN;
        config.params = [ 'A-Z' ];

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.pattern ).toHaveBeenCalled();
    } );

    it( 'getValidatorByConfig return nullValidator validator', () => {
        spyOn( CAValidators, 'nullValidator' );
        config.name = CAValidators.VALIDATOR_NULL;

        CAValidators.getValidatorByConfig( config );

        expect( CAValidators.nullValidator ).toHaveBeenCalled();
    } );

} );
