import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client;

if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
  }

  export async function sendSMS(to, body) {
    if (!client) {
        throw new Error("SMS service is not configured");
          }

            return client.messages.create({
                body,
                    from: process.env.TWILIO_PHONE_NUMBER,
                        to
                          });
                          }

                          export async function sendOTP(phone) {
                            if (!client) {
                                throw new Error("SMS service is not configured");
                                  }

                                    return client.verify.v2
                                        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
                                            .verifications.create({
                                                  to: phone,
                                                        channel: "sms"
                                                            });
                                                            }

                                                            export async function verifyOTP(phone, code) {
                                                              if (!client) {
                                                                  throw new Error("SMS service is not configured");
                                                                    }

                                                                      return client.verify.v2
                                                                          .services(process.env.TWILIO_VERIFY_SERVICE_SID)
                                                                              .verificationChecks.create({
                                                                                    to: phone,
                                                                                          code
                                                                                              });
                                                                                              }