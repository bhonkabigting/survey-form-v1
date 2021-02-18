process.env.NODE_ENV = 'test';

const chai                  = require('chai');
const expect                = chai.expect;
const SurveyModel           = require('../models/survey.model');


describe("Survey Model", function(){

    it('Should successfully insert survey form values', async function(){
        let surveyModel = new SurveyModel();
        await surveyModel.createSurvey("Oliver", "Philippines", "Node", "I love Node!");

        let record = await surveyModel.getSurvey();

        expect(record.status).to.equal(true);
        expect(record.result).to.not.be.empty;
    });

    it('Should return success message when input captcha matches.', function(){
        let surveyModel = new SurveyModel();
        let captcha = surveyModel.captcha;
        let result = surveyModel.verifyCaptchaInput(captcha);

        expect(result).to.equal("Success! Captcha input matched.");
    });

    it('Should return error message when input captcha does not matched.', function(){
        let surveyModel = new SurveyModel();
        let result = surveyModel.verifyCaptchaInput("random");

        expect(result).to.equal("Error! Captcha input doesn't matched.");
    });
});