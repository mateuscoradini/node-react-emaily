const _ = require('lodash');
const { Path } = require('path-parser');

const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    console.log("Pass");
    const values = _.chain(req.body)
      .map(({ email, url }) => {
        console.log(email, url);
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        console.log(surveyId);
        console.log(email);
        console.log(choice);

        const survey =
          Survey.findOne(
            {
              _id: surveyId,
              recipients: {
                $elemMatch: { email: email, responded: false }
              }
            }
          ).exec();
        console.log(survey);

        console.log('Updating');

        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec(function (err, result) {
          if (err) {
            console.log(err);
          }
          console.log(result);
        })
      })
      .value();
    console.log(values);

    res.send({});
  });

  // app.post('/api/surveys/webhooks', (req, res) => {
  //   const p = new Path('/api/surveys/:surveyId/:choice');

  //   _.chain(req.body)
  //     .map(({ email, url }) => {
  //       const match = p.test(new URL(url).pathname);
  //       if (match) {
  //         return { email, surveyId: match.surveyId, choice: match.choice };
  //       }
  //     })
  //     .compact()
  //     .uniqBy('email', 'surveyId')
  //     .each(({ surveyId, email, choice }) => {
  //       Survey.updateOne(
  //         {
  //           _id: surveyId,
  //           recipients: {
  //             $elemMatch: { email: email, responded: false },
  //           },
  //         },
  //         {
  //           $inc: { [choice]: 1 },
  //           $set: { 'recipients.$.responded': true },
  //         }
  //       ).exec();
  //     }, function(err){
  //       if(err){
  //         console.log(err);
  //       }
  //     })
  //     .value();

  //   res.send({});
  // });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
